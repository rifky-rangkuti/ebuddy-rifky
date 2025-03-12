"use client";
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { SitemarkIcon } from "./CustomIcons";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectStatus,
  selectUserEdit,
  updateUser,
} from "../store/features/user/userSlice";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function UpdateUserCard() {
  const dispatch = useAppDispatch();
  const userEdit = useAppSelector(selectUserEdit);
  const status = useAppSelector(selectStatus);
  const [form, setForm] = React.useReducer((x, y) => ({ ...x, ...y }), {
    fullname: "",
    totalAverageWeightRatings: null,
    numberOfRents: null,
    recentlyActive: null,
  });

  React.useEffect(() => {
    if (userEdit) setForm(userEdit);
  }, [userEdit]);

  const submitDisabled = !userEdit || status === "loading";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (userEdit) {
      dispatch(
        updateUser({
          id: userEdit.id,
          fullname: form.fullname,
          totalAverageWeightRatings: Number(form.totalAverageWeightRatings),
          numberOfRents: Number(form.numberOfRents),
          recentlyActive: Number(form.recentlyActive),
        })
      );
    }
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <SitemarkIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Update User
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Fullname</FormLabel>
          <TextField
            id="email"
            type="email"
            placeholder="Your fullname..."
            fullWidth
            variant="outlined"
            color="primary"
            required
            disabled={!userEdit}
            value={form.fullname}
            onChange={(e) => {
              setForm({ fullname: e.target.value });
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Total Average Weight Ratings</FormLabel>
          <TextField
            id="totalAverageWeightRatings"
            type="number"
            placeholder="e.g: 3"
            autoFocus
            fullWidth
            variant="outlined"
            color="primary"
            required
            disabled={!userEdit}
            value={form.totalAverageWeightRatings}
            onChange={(e) => {
              setForm({ totalAverageWeightRatings: e.target.value });
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Number of Rents</FormLabel>
          <TextField
            id="totalAverageWeightRatings"
            type="number"
            placeholder="e.g: 3"
            autoFocus
            fullWidth
            variant="outlined"
            color="primary"
            required
            disabled={!userEdit}
            value={form.numberOfRents}
            onChange={(e) => {
              setForm({ numberOfRents: e.target.value });
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Recently Active</FormLabel>
          <TextField
            id="totalAverageWeightRatings"
            type="number"
            placeholder="e.g: 3"
            autoFocus
            fullWidth
            variant="outlined"
            color="primary"
            required
            disabled={!userEdit}
            value={form.recentlyActive}
            onChange={(e) => {
              setForm({ recentlyActive: e.target.value });
            }}
          />
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={submitDisabled}
        >
          <Typography>{status === "loading" ? "Loading" : "Update"}</Typography>
        </Button>
      </Box>
    </Card>
  );
}

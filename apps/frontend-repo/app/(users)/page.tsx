"use client";
import React from "react";
import UserTable from "../../components/UserTable";
import { Box, Grid } from "@mui/material";
import UpdateUserCard from "../../components/UpdateUserCard";
import storage from "../../utils/storage";
import { useRouter } from "next/navigation";

export default function UserPage() {
  const router = useRouter();
  React.useEffect(() => {
    //* Protect main page
    //! this is not best practice
    storage.getItem("identity", (err, value) => {
      if (err) console.log(err);
      if (value !== "secret") {
        storage.clear();
        router.replace("/signin");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box
      sx={[
        {
          justifyContent: "center",
          height: "calc((1 - var(--template-frame-height, 0)) * 100%)",
          marginTop: "max(40px - var(--template-frame-height, 0px), 0px)",
          minHeight: "100%",
        },
        (theme) => ({
          "&::before": {
            content: '""',
            display: "block",
            position: "absolute",
            zIndex: -1,
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
            backgroundRepeat: "no-repeat",
            ...theme.applyStyles("dark", {
              backgroundImage:
                "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
            }),
          },
        }),
      ]}
    >
      <Grid container spacing={10} sx={{ p: 10 }}>
        <Grid item sm={12} md={8}>
          <UserTable />
        </Grid>
        <Grid
          item
          sm={12}
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <UpdateUserCard />
        </Grid>
      </Grid>
    </Box>
  );
}

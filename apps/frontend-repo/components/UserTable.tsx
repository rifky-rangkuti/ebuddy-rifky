"use client";
import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { UserType } from "@repo/shared-types";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  editUser,
  loadUsers,
  selectUserEdit,
  selectUsers,
} from "../store/features/user/userSlice";

export default function UserTable() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const userEdit = useAppSelector(selectUserEdit);

  const columns: GridColDef<UserType>[] = React.useMemo(
    () => [
      { field: "id", headerName: "ID", width: 150 },
      {
        field: "fullname",
        headerName: "Full name",
        width: 150,
      },
      {
        field: "totalAverageWeightRatings",
        headerName: "Total Average Weight Ratings",
        width: 150,
      },
      {
        field: "numberOfRents",
        headerName: "Number of Rents",
        width: 200,
      },
      {
        field: "recentlyActive",
        headerName: "Recently Active",
        width: 150,
        valueFormatter: (value?: number) => {
          if (value == null) {
            return "";
          }
          return dayjs.unix(value).format("YYYY/MM/DD");
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 150,
        renderCell: (params) => (
          <Button
            variant="contained"
            color={params.row.id === userEdit?.id ? "secondary" : "primary"}
            onClick={() => {
              dispatch(editUser(params.row));
            }}
          >
            {params.row.id === userEdit?.id ? "Cancel" : "Edit"}
          </Button>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userEdit]
  );

  React.useEffect(() => {
    dispatch(loadUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}

import { createAppSlice } from "../../createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "@repo/shared-types";
import { updateUserData } from "../../../apis/update-user-data";
import { fetchUserData } from "../../../apis/fetch-user-data";

export interface CounterSliceState {
  status: "idle" | "loading" | "failed";
  userEdit: UserType | null;
  users: UserType[];
}

const initialState: CounterSliceState = {
  status: "idle",
  userEdit: null,
  users: [],
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: (create) => ({
    loadUsers: create.asyncThunk(
      async () => {
        const response = await fetchUserData();
        return response;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.users = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    editUser: create.reducer((state, action: PayloadAction<UserType>) => {
      if (state.userEdit?.id === action.payload.id) {
        state.userEdit = null;
      } else {
        state.userEdit = action.payload;
      }
    }),
    updateUser: create.asyncThunk(
      async (data: UserType) => {
        await updateUserData(data);
        const response = await fetchUserData();
        return response;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.users = action.payload;
          state.userEdit = null;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectStatus: (counter) => counter.status,
    selectUsers: (state) => state.users,
    selectUserEdit: (state) => state.userEdit,
  },
});

// Action creators are generated for each case reducer function.
export const { editUser, updateUser, loadUsers } = userSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectStatus, selectUsers, selectUserEdit } =
  userSlice.selectors;

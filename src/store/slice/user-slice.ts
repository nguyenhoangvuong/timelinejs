import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../../models/export";
import { NONE } from "../../utils/constants";

interface UserState {
  listUsers: UserModel[];
  selectedEditUser: UserModel;
}

const initialState: UserState = {
  listUsers: [],
  selectedEditUser: new UserModel()
};

export const userSlide = createSlice({
  name: "user",
  initialState,
  reducers: {
    setListUser: (state, action: PayloadAction<never[]>) => {
      state.listUsers = action.payload;
    },
    setSelectedEditUser: (state, action: PayloadAction<UserModel>) => {
      state.selectedEditUser = action.payload;
    }
  },
});

const { actions, reducer } = userSlide;
export const userActions = actions;
export type { UserState };

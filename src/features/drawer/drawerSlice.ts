import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface DrawerState {
  open: boolean;
}

const initialState: DrawerState = {
  open: false,
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    closeDrawer: (state: DrawerState) => {
      state.open = false;
    },
    openDrawer: (state: DrawerState) => {
      state.open = true;
    },
  },
});

export const { closeDrawer, openDrawer } = drawerSlice.actions;

export const selectOpen = (state: RootState) => state.drawer.open;

export default drawerSlice.reducer;

import { fetchLoginAsync } from "./account.action";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { KEYS } from "./key";

export interface AccountState {
  //   result: BaseModelPagination<Account>;
  status: boolean;
  statusLogin: "Pending" | "SUCCESS" | "FAILED";
  messageLogin: string | undefined;
  message: string | undefined;
}

const initialState: AccountState = {
  //   result: {
  //     count: 0,
  //     currentPage: 1,
  //     nextPage: 0,
  //     prevPage: 0,
  //     lastPage: 0,
  //     data: [],
  //   },
  status: false,
  messageLogin: "",
  statusLogin: "SUCCESS",
  message: "",
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //login
    builder.addCase(fetchLoginAsync.pending, (state) => {
      state.statusLogin = "Pending";
    });
    builder.addCase(fetchLoginAsync.fulfilled, (state, action) => {
      localStorage.setItem(KEYS.token, action.payload.jwttoken);
      //   localStorage.setItem(
      //     KEYS.refresh_token,
      //     action.payload.jwttoken
      //   );
      state.statusLogin = "SUCCESS";
      state.messageLogin = "Login Successfully";
    });
    builder.addCase(fetchLoginAsync.rejected, (state) => {
      state.statusLogin = "FAILED";
    });
  },
});

export const accountReducer = accountSlice.reducer;

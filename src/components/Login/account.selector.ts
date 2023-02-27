import { RootState } from "../redux/store";
import { AccountState } from "./account.slice";

export const selectAccountState = (state: RootState): AccountState => state.accounts;
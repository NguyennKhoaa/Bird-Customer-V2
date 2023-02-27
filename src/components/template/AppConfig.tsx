import { ThemeProvider } from "@mui/system";
import React, { Suspense } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import theme from "../config/theme";
import { store } from "../redux/store";
interface IAppConfig {
  children: JSX.Element;
}
const AppConfig = ({ children }: IAppConfig): JSX.Element => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Suspense fallback>{children}</Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default AppConfig;

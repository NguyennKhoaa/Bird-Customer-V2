import React from "react";
import Appbar from "../Appbar/Appbar";
import CardCarousel from "../Carousel/CardCarousel";
import WelcomeDashboard from "../Carousel/WelcomeDashboard";
import About from "../Detail/About";
import DateRangeCustom from "../Detail/DateRangeCustom";
import Detail from "../Detail/Detail";
import Footer from "../Footer/Footer";
import KetQua from "../KetQua/KetQua";
import AppConfig from "../template/AppConfig";
import Home from "./Home/Home";
import Router from "./_routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = (): JSX.Element => {
  return (
    <AppConfig>
      <>
        <Router />
        <ToastContainer />
      </>
    </AppConfig>
  );
};

export default App;

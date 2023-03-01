import React from "react";
import { Routes } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";
import Bug from "../Bugs/Bug";
import HomeCustome from "../Carousel/HomeCustome";
import ProductNewForm from "../CreateTK/ProductNewForm";
import Dashboard from "../Dashboard/Dashboard";
import About from "../Detail/About";
import HistoryBooking from "../History/BookingHistory";
import UserList from "../History/BookingHistory";
import KetQua from "../KetQua/KetQua";
import Login from "../Login";
import LoginPage from "../Login/LoginPage";
import BirdProfile from "../Profile/BirdProfile";
import Profile from "../Profile/Profile";
import TableUser from "../Table/TableUser";
import ToastContainerConfig from "../toast/ToastContainer";

const Router = (): JSX.Element => {
  return (
    // <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<Dashboard />}></Route>
      <Route path="/danhsachnguoidung" element={<TableUser />}></Route>
      <Route path="/taotaikhoan" element={<ProductNewForm />} /> */}
      {/* <Route path="/" element={<BirdProfile />}></Route> */}
      {/* <Route path="/" element={<UserList />}></Route> */}
      {/* <Route path="/" element={<LoginPage />}></Route>
      <Route path="/home" element={<HomeCustome />}></Route>
      <Route path="/home/result" element={<KetQua />}></Route>
      <Route path="/home/result/about" element={<About />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/profile/bird" element={<BirdProfile />}></Route>
      <Route path="/history" element={<HistoryBooking />}></Route> */}
      <Route path="/" element={<Bug />}></Route>
      {/* <Route path="/taotaikhoan" element={<ProductNewForm />} /> */}
    </Routes>
    // </BrowserRouter>
  );
};

export default Router;

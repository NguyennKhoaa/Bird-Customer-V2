import React, { useState } from "react";
import { Navigation } from "react-minimal-side-navigation";
import { useNavigate } from 'react-router-dom';
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

const NavSideBar = (): JSX.Element => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
        }`}
        style={{ width: "auto" }}
      >
        <div className="flex items-center justify-center mt-10 text-center py-6">
          <span className="mx-2 text-2xl font-semibold text-black">
            Khoa Nguyễn
          </span>
        </div>
        <Navigation
          // you can use your own router's api to get pathname
          activeItemId="/management/members"
          onSelect={({ itemId }) => {
            navigate(itemId);
          }}
          items={[
            {
              title: "Tổng quan",
              itemId: "/",
              // you can use your own custom Icon component as well
              // icon is optional
              elemBefore: () => <AccessAlarmIcon name="inbox" />,
            },
            {
              title: "Danh sách người dùng",
              itemId: "/danhsachnguoidung",
              // you can use your own custom Icon component as well
              // icon is optional
              elemBefore: () => <AccessAlarmIcon name="inbox" />,
            },
            {
              title: "Cập nhật tài khoản",
              itemId: "/taotaikhoan",
              // you can use your own custom Icon component as well
              // icon is optional
              elemBefore: () => <AccessAlarmIcon name="inbox" />,
            },
          ]}
        />
      </div>
    </>
  );
};

export default NavSideBar;

import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  HomeOutlined,
  FieldTimeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: (
      <NavLink to="/" className={({ isActive }) => (isActive ? "" : "")}>
        Home
      </NavLink>
    ),
    key: "Home",
    icon: <HomeOutlined />,
  },
  {
    key: "Waiting List",
    icon: <FieldTimeOutlined />,

    label: (
      <NavLink
        to="/WaitingFor"
        className={({ isActive }) => (isActive ? "" : "")}
      >
        Waiting List
      </NavLink>
    ),
  },
];

const MainNavigation = () => {
  const [current, setCurrent] = useState("Home");
  const search = useLocation();
  useEffect(() => {
    setCurrent(search.pathname.replace("/", ""));
  }, []);
  const onClick: MenuProps["onClick"] = (e) => {
    // console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default MainNavigation;

import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "Home",
    key: "Home",
    icon: <MailOutlined />,
  },
  {
    key: "About",
    label: (
      <NavLink
        to="/About"
        className={({ isActive }) => (isActive ? "" : "")}
        rel="noopener noreferrer"
      >
        About Me
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
    console.log("click ", e);
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

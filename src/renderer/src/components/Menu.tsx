import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/Authprovider";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const isAdminMenuItems: MenuItem[] = [
  getItem("登出", "login", undefined, undefined),
  getItem("代收付管理", "collectionmange", undefined, [
    getItem("代收付管理列表", "collections"),
    getItem("代收付管理新增", "Collection/Add"),
  ]),
  getItem("房屋管理", "tenementmange", undefined, [
    getItem("出租列表", "Tenements/Rent"),
    getItem("出售列表", "Tenements/Sell"),
    getItem("房屋管理列表", "Tenements"),
    getItem("房屋管理新增", "Tenement/Add"),
  ]),
  getItem("提醒月曆", "calendarmange", undefined, [
    getItem("提醒事項列表", "Calenderlist"),
    getItem("代收付提醒列表", "Calenderlist_collection"),
  ]),
  getItem("使用者管理", "usermange", undefined, [
    getItem("使用者管理列表", "users"),
    getItem("使用者管理新增", "user"),
  ]),
  getItem("復原管理", "rollback", undefined, [
    getItem("房屋復原管理", "rollback/tenements"),
    getItem("代收付復原管理", "rollback/collections"),
    getItem("使用者復原管理", "rollback/users"),
  ]),
];

const isNotAdminMenuItems: MenuItem[] = [...isAdminMenuItems.slice(0, 4)];

const Menus = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const [menuItems, setMenuItems] = useState<MenuProps["items"]>([]);

  useEffect(() => {
    setMenuItems(isAdmin ? isAdminMenuItems : isNotAdminMenuItems);
  }, [isAdmin]);

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key && e.key.toString() !== "") {
      navigate("/" + e.key.toString());
    }
    if (e.key === "login") {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={menuItems}
      className="sticky top-0 h-screen max-h-screen pt-10 overflow-y-auto bg-blue-100"
    />
  );
};

export default Menus;

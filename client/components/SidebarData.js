import React from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "About",
    path: "/",
    icon: <AiIcons.AiOutlineFolder />,
    cName: "nav-text",
  },
  {
    title: "Pills",
    path: "/",
    icon: <AiIcons.AiOutlineHeart />,
    cName: "nav-text",
  },
  {
    title: "Wallet",
    path: "/wallet",
    icon: <AiIcons.AiOutlineMedicineBox />,
    cName: "nav-text",
  },
];

import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import {
  HiOutlineArchiveBox,
  HiOutlineCog6Tooth,
  HiOutlineCube,
  HiOutlineGift,
  HiOutlineHome,
  HiOutlineLink,
  HiOutlineTag,
  HiOutlineUsers,
} from "react-icons/hi2";

function Sidebar() {
  return (
    <aside
      className="admin-sidebar relative border-r border-zinc-200 h-[90vh] space-y-16 py-6 px-3 overflow-y-scroll overflow-x-hidden"
      style={styles}
    >
      <SidebarSection legend="QUICK LINKS">
        <SidebarItem to="dashboard" text="Dashboard" icon={<HiOutlineHome />} />
        <SidebarItem
          to="products/new"
          text="New Product"
          icon={<HiOutlineArchiveBox />}
        />
        <SidebarItem
          to="coupons/new"
          text="New coupon"
          icon={<HiOutlineGift />}
        />
      </SidebarSection>

      <SidebarSection legend="CATALOG">
        <SidebarItem
          to="products?page=1"
          text="Products"
          icon={<HiOutlineArchiveBox />}
        />
        <SidebarItem
          to="categories?page=1"
          text="Categories"
          icon={<HiOutlineLink />}
        />
        <SidebarItem
          to="collections?page=1"
          text="Collections"
          icon={<HiOutlineTag />}
        />
        <SidebarItem
          to="orders?page=1"
          text="Orders"
          icon={<HiOutlineCube />}
        />
        <SidebarItem
          to="customers?page=1"
          text="Customers"
          icon={<HiOutlineUsers />}
        />
        <SidebarItem to="coupons" text="Coupons" icon={<HiOutlineGift />} />
        <SidebarItem
          to="settings"
          text="Settings"
          icon={<HiOutlineCog6Tooth />}
        />
      </SidebarSection>
    </aside>
  );
}

export default Sidebar;

function SidebarSection({ children, legend }) {
  return (
    <fieldset>
      <legend className="text-2xl font-light  w-3/4 mx-auto mb-6 text-gray-600">
        {legend}
      </legend>
      <ul className="font-medium text-[1.4rem] space-y-5">{children}</ul>
    </fieldset>
  );
}

function SidebarItem({ to, text, icon }) {
  return (
    <li className={"hover:scale-110 duration-[.3s]"}>
      <NavLink
        to={to}
        className="flex gap-4  items-center pl-[20%] border-l-4 py-4"
        end
      >
        <span className={"text-[1.7rem]"}>{icon}</span>
        <span className={"font-normal"}>{text}</span>
      </NavLink>
    </li>
  );
}

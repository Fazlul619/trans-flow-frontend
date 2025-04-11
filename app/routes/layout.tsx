import { Outlet } from "react-router-dom";
import NavBar from "~/components/NavBar.js";


export default function Layout() {
    return (
      <div>
        <NavBar />
        <Outlet />
      </div>
    );
  }
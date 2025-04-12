import { Outlet } from "react-router-dom";
import NavBar from "~/components/NavBar.js";


export default function Layout() {
    return (
      <div className="max-w-7xl  mx-auto my-5">
        <NavBar />
        <Outlet />
      </div>
    );
  }
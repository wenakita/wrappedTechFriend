import { Outlet } from "react-router-dom";
import Navigation from "../navigation";
function Layout() {
  return (
    <div>
      <Navigation />
      <div className="">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;

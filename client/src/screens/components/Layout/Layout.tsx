import "./Layout.css";
import { Outlet } from "react-router-dom";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Layout: React.FC = () => (
  <div className="app-container">
    <Header />
    <div className="content-wrap">
      <Outlet />
    </div>
    <Footer />
  </div>
);

export default Layout;

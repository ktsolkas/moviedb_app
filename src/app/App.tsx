import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const App = () => (
  <div>
    <Header />
    <Outlet />
  </div>
);

export default App;

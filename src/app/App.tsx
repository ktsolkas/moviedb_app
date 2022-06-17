import "./App.css";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import { useGetGenresQuery } from "./services/moviedbApi";

const App: React.FC = () => {
  useGetGenresQuery(null);

  return (
    <div className="app-container">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;

import "./HomePage.css";
import { Outlet } from "react-router-dom";

import SearchForm from "../../components/SearchForm/SearchForm";
import CategoriesBar from "./CategoriesBar/CategoriesBar";

const HomePage: React.FC = () => (
  <div className="homepage-container">
    <SearchForm />
    <CategoriesBar />
    <Outlet />
  </div>
);

export default HomePage;

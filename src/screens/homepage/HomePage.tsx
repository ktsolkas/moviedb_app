import "./HomePage.css";
import { Outlet } from "react-router-dom";

import SearchForm from "../../components/SearchForm";
import CategoriesBar from "../../components/CategoriesBar";

const HomePage: React.FC = () => (
  <>
    <SearchForm />
    <CategoriesBar />
    <Outlet />
  </>
);

export default HomePage;

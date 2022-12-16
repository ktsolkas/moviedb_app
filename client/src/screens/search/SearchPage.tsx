import "./SearchPage.css";

import { CardList } from "../components/CardList/CardList";
import SearchForm from "../components/SearchForm/SearchForm";

const SearchPage = () => (
  <div className="search-container">
    <SearchForm />
    <CardList />
  </div>
);

export default SearchPage;

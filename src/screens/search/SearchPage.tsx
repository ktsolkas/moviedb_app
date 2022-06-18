import "./SearchPage.css";
import { CardList } from "../../components/CardList";
import SearchForm from "../../components/SearchForm";

const SearchPage = () => (
  <div className="search-container">
    <SearchForm />
    <CardList />
  </div>
);

export default SearchPage;

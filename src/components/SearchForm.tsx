import "./SearchForm.css";
import { useState } from "react";
import { useDebounce } from "../app/hooks";

const SearchForm: React.FC = () => {
  const [input, setInput] = useState("");
  const debouncedinput = useDebounce(input, 1000);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInput(event.target.value);
  return (
    <div className="movie-search">
      <input
        type="text"
        value={input}
        placeholder="Search movie"
        onChange={onChange}
      />
      <i className="fa-solid fa-magnifying-glass fa-xl"></i>
      <p>{debouncedinput}</p>
    </div>
  );
};

export default SearchForm;

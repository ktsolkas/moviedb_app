import "./SearchForm.css";
import { useState } from "react";

const SearchForm: React.FC = () => {
  const [input, setInput] = useState("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInput(event.target.value);
  return (
    <div className="movie-search">
      <input
        type="text"
        value={input}
        placeholder="Search for movie by title"
        onChange={onChange}
      />
      <i className="fa-solid fa-magnifying-glass fa-xl"></i>
    </div>
  );
};

export default SearchForm;

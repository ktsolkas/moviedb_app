import "./SearchForm.css";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector, useDebounce } from "../app/hooks";
import { updateSearchInput } from "../features/search/searchSlice";

const SearchForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const inputReference = useRef<HTMLInputElement>(null);

  const input = useAppSelector((state) => state.search);
  const debouncedinput = useDebounce(input, 1000);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(updateSearchInput(event.target.value));

  useLayoutEffect(() => {
    if (inputReference.current) {
      inputReference.current.focus();
    }
  });

  useEffect(() => {
    if (debouncedinput && !location.pathname.endsWith(debouncedinput)) {
      navigate(`/search/${debouncedinput}`);
    }
    if (!debouncedinput && location.pathname.startsWith("/search")) {
      dispatch(updateSearchInput(""));
      navigate("/popular");
    }
  });

  return (
    <div className="movie-search">
      <input
        ref={inputReference}
        type="text"
        value={input}
        placeholder="Search movie"
        onChange={onChange}
      />
      <i className="fa-solid fa-magnifying-glass fa-xl"></i>
    </div>
  );
};

export default SearchForm;

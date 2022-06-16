import "./CardList.css";
import { useLocation } from "react-router-dom";
import { DualRing } from "react-awesome-spinners";
import { useEffect } from "react";

import Movie from "../common/types/Movie";
import MovieCard from "./MovieCard";
import {
  useGetMoviesByCategoryQuery,
  useGetSearchMovieResultQuery,
} from "../app/services/moviedbApi";
import Category from "../common/types/Category";
import { useAppDispatch } from "../app/hooks";
import { updateSearchInput } from "../features/search/searchSlice";

interface CardListProps {
  category?: Category;
}

interface LocationState {
  fromHeader?: boolean;
}

export const CardList: React.FC<CardListProps> = ({ category }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const pathname = location.pathname;
  const locationState = location.state as LocationState;

  let movies;
  const moviesByCategory = useGetMoviesByCategoryQuery;
  const moviesBySearch = useGetSearchMovieResultQuery;
  if (category) {
    movies = moviesByCategory(category);
  } else {
    movies = moviesBySearch(pathname);
  }
  const { data, isError, isFetching } = movies;

  useEffect(() => {
    if (locationState && locationState.fromHeader) {
      dispatch(updateSearchInput(""));
    }
  });

  if (isError) return <div>An error has occurred!</div>;

  if (isFetching) {
    return (
      <div className="spinner">
        <DualRing size={256} color="#fd2525" />
      </div>
    );
  }

  return (
    <div className="card-list">
      {data.results.map((movie: Movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          poster_path={movie.poster_path}
          vote_average={movie.vote_average}
          id={movie.id}
          genre_ids={movie.genre_ids}
        />
      ))}
    </div>
  );
};

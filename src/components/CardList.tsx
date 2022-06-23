import "./CardList.css";
import { useLocation } from "react-router-dom";
import { DualRing } from "react-awesome-spinners";
import { useEffect } from "react";

import Movie from "../common/types/Movie";
import MovieCard from "./MovieCard";
import {
  useGetMoviesByCategoryQuery,
  useGetSimilarMoviesQuery,
  useGetSearchMovieResultQuery,
} from "../app/services/api";
import Category from "../common/types/Category";
import { useAppDispatch } from "../app/hooks";
import { updateSearchInput } from "../features/search/searchSlice";

interface CardListProps {
  category?: Category;
  id?: number;
}

interface LocationState {
  fromHeader?: boolean;
}

export const CardList: React.FC<CardListProps> = ({ category, id }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const pathname = location.pathname;
  const locationState = location.state as LocationState;

  let movies;
  const moviesByCategory = useGetMoviesByCategoryQuery;
  const moviesBySearch = useGetSearchMovieResultQuery;
  const moviesRecommended = useGetSimilarMoviesQuery;
  if (category) {
    movies = moviesByCategory(category);
  } else if (id) {
    movies = moviesRecommended(id);
  } else {
    movies = moviesBySearch(pathname);
  }
  const { data, isError, isFetching } = movies;
  console.log("ena", data);

  useEffect(() => {
    if (locationState && locationState.fromHeader) {
      dispatch(updateSearchInput(""));
    }
  }, [dispatch, locationState]);

  if (isError) return <div>An error has occurred!</div>;

  if (isFetching) {
    return (
      <div className="spinner">
        <DualRing size={256} color="#fd2525" />
      </div>
    );
  }

  if (data.results.length === 0) {
    return (
      <p style={{ color: "white" }}>
        Could not find movies that match the search term.
      </p>
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

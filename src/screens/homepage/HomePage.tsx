import SearchForm from "../../components/SearchForm";
import {
  useGetGenresQuery,
  useGetPopularMoviesQuery,
} from "../../app/services/moviedbApi";
import { Outlet } from "react-router-dom";
import MovieCard from "../../components/MovieCard";

const HomePage: React.FC = () => {
  useGetGenresQuery(null);
  const { data, error, isLoading } = useGetPopularMoviesQuery(null);
  // const { data, error, isLoading } = useGetSearchMovieResultQuery("magic");
  console.log("hey", data, "ho", error, "ez", isLoading);
  let title, poster_path, vote_average, id, genre_ids;
  if (data) {
    title = data.results[0].title;
    poster_path = data.results[0].poster_path;
    vote_average = data.results[0].vote_average;
    id = data.results[0].id;
    genre_ids = data.results[0].genre_ids;
  }

  return (
    <>
      <SearchForm />
      {data ? (
        <MovieCard
          title={title}
          poster_path={poster_path}
          vote_average={vote_average}
          id={id}
          genre_ids={genre_ids}
        />
      ) : null}
      {/* <MovieCard
        title={title}
        poster_path={poster_path}
        vote_average={vote_average}
        id={id}
      /> */}
      <Outlet />
    </>
  );
};

export default HomePage;

import Movie from "../common/types/Movie";
import MovieCard from "./MovieCard";
import "./CardList.css";
import { useLocation, useParams } from "react-router-dom";
import { useGetMoviesByCategoryQuery } from "../app/services/moviedbApi";
import Category from "../common/types/Category";
import { DualRing } from "react-awesome-spinners";

interface CardListProps {
  movies: Movie[];
}

// export const CardList: React.FC<CardListProps> = ({ movies }) => {
export const CardList: React.FC = () => {
  const params = useLocation();

  console.log("fwtis", params.pathname);
  const { data, error, isError, isLoading, isFetching } =
    useGetMoviesByCategoryQuery(params.pathname as Category);
  if (isError) return <div>An error has occurred!</div>;
  if (isFetching)
    return (
      <div className="spinner">
        <DualRing size={256} color="#fd2525" />
      </div>
    );
  return (
    <div className="card-list">
      {data &&
        data.results.map((movie: Movie) => (
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

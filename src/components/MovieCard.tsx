import { useGetMovieImageQuery } from "../app/services/moviedbApi";
import MovieCardDetails from "./MovieCardDetais";
import "./MovieCard.css";

interface MovieCardProps {
  title: string;
  poster_path: string;
  vote_average: number;
  id: number;
  genre_ids: number[];
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  poster_path,
  vote_average,
  id,
  genre_ids,
}) => {
  const peon = useGetMovieImageQuery(id);
  console.log("halal", peon);
  console.log(id);
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
        alt={`${title} movie poster`}
      />
      <MovieCardDetails
        title={title}
        vote_average={vote_average}
        genre_ids={genre_ids}
      />
    </div>
  );
};

export default MovieCard;

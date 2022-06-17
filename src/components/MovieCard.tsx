import "./MovieCard.css";

import MovieCardDetails from "./MovieCardDetais";
import Image from "./Image";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="movie-card" onClick={onClick}>
      <div className="image-container">
        <Image
          errorImg="https://image.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg"
          placeholderImg="https://via.placeholder.com/400x200.png?text=This+Will+Be+Shown+Before+Load"
          src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
          alt={`${title} movie poster`}
        />
      </div>
      <MovieCardDetails
        title={title}
        vote_average={vote_average}
        genre_ids={genre_ids}
      />
    </div>
  );
};

export default MovieCard;

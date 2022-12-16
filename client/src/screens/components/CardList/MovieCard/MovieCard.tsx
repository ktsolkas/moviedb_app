import "./MovieCard.css";
import { useNavigate } from "react-router-dom";

import MovieCardDetails from "./MovieCardDetails/MovieCardDetais";
import Image from "../../Image/Image";

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
    <article className="movie-card" onClick={onClick}>
      <div className="image-container">
        <Image
          errorImg="/no-image-available.jpg"
          placeholderImg="/placeholderImg.jpg"
          src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
          alt={`${title} movie poster`}
        />
      </div>
      <MovieCardDetails
        title={title}
        vote_average={vote_average}
        genre_ids={genre_ids}
      />
    </article>
  );
};

export default MovieCard;

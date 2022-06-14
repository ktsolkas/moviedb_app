import { useAppSelector } from "../app/hooks";
import { selectGenreByIdList } from "../app/services/moviedbApi";
import "./MovieCardDetails.css";

interface MovieCardDetailsProps {
  title: string;
  vote_average: number;
  genre_ids: number[];
}

const MovieCardDetails: React.FC<MovieCardDetailsProps> = ({
  title,
  vote_average,
  genre_ids,
}) => {
  const genreList = useAppSelector(selectGenreByIdList)(genre_ids);
  return (
    <div className="details">
      <h3>{title}</h3>
      <p>
        {genreList.map((genre, index) => (
          <span key={index}>{`${genre}${
            index < genreList.length - 1 ? ", " : ""
          }`}</span>
        ))}
      </p>
      <div className="rating">
        <p>{vote_average}</p>
      </div>
    </div>
  );
};

export default MovieCardDetails;

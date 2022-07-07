import "./MovieCardDetails.css";

import { useAppSelector } from "../../../../../app/hooks";
import { selectGenreByIdList } from "../../../../../app/store/services/api";
import Rating from "../../../Rating/Rating";

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
  //Show only 4 genres. The rest of the genres for each movie can be seen in its own MoviePage
  const genreList = useAppSelector(selectGenreByIdList)(genre_ids).slice(0, 4);

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
      <Rating rating={vote_average} />
    </div>
  );
};

export default MovieCardDetails;

import "./MovieDetails.css";
import { useGetMovieByIdQuery } from "../../app/services/api";
import Rating from "../../components/Rating";
import Image from "../../components/Image";
import { runtimeConvert } from "../../common/utils/runtimeConvert";
import { format } from "../../common/utils/numberFormatter";
import React from "react";
import { selectToken } from "../../features/auth/authSlice";
import { useAppSelector } from "../../app/hooks";
import { useLocation, useNavigate } from "react-router-dom";

interface MovieDetailsProps {
  id: number;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ id }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data, isFetching } = useGetMovieByIdQuery(id);
  const userToken = useAppSelector(selectToken);

  const handleClick = () => {
    if (!userToken) {
      navigate("/signIn", { state: { from: pathname } });
    } else {
      //placeholder
    }
  };

  if (isFetching) {
    return <></>;
  }
  return (
    <>
      <div className="movie-details-container">
        <Image
          errorImg="/no-image-available.jpg"
          placeholderImg="/placeholderImg.jpg"
          src={`https://image.tmdb.org/t/p/w300/${data.poster_path}`}
          alt={`${data.title} movie poster`}
        />
        <div className="movie-details">
          <h2>{data.title}</h2>
          <hr />
          <p className="tagline">{data.tagline}</p>
          <div className="movie-details-main">
            <div>
              <h3>Plot</h3>
              <p className="overview">{data.overview}</p>
            </div>
            <div className="watchlist-review">
              <button onClick={handleClick}>
                <i className="fa-regular fa-star"></i> ADD TO WATCHLIST
              </button>
              <button onClick={handleClick}>
                <i className="fa-solid fa-pen"></i> REVIEW
              </button>
            </div>
            <div className="genres-container">
              <h3>Genres</h3>
              <p>
                {data.genres.map(
                  (genre: { id: number; name: string }, index: number) => (
                    <React.Fragment key={genre.id}>
                      <span className="genre">{genre.name}</span>
                      <span> </span>
                      {/* <span>{index < data.genres.length - 1 ? ", " : ""}</span> */}
                    </React.Fragment>
                  )
                )}
              </p>
            </div>
          </div>
          <Rating vote_average={data.vote_average} />
        </div>
      </div>
      <div className="movie-details-footer">
        <span>
          <i className="fa-solid fa-calendar-days"></i> Release Date:{" "}
          {data.release_date}
        </span>
        <span>
          <i className="fa-solid fa-clock"></i> Runtime:{" "}
          {runtimeConvert(data.runtime)}
        </span>
        <span>
          <i className="fa-solid fa-money-bill-1-wave"></i> Budget:{" "}
          {format(data.budget)}
        </span>
        <span>
          <i className="fa-solid fa-ticket"></i> Revenue: {format(data.revenue)}
        </span>
      </div>
    </>
  );
};

export default MovieDetails;

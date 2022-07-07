import "./MovieDetails.css";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Rating from "../../../components/Rating/Rating";
import Image from "../../../components/Image/Image";
import Movie from "../../../../common/types/Movie";
import ReviewModal from "../ReviewModal/ReviewModal";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  useAddToWatchlistMutation,
  useGetMovieByIdQuery,
  useRemoveFromWatchlistMutation,
} from "../../../../app/store/services/api";
import { selectUserEmail } from "../../../../app/store/authSlice";
import {
  addMovieToWatchlist,
  removeMovieFromWatchlist,
  selectWatchlistMovieIds,
} from "../../../../app/store/watchlistSlice";
import { runtimeConvert } from "../../../../common/utils/runtimeConvert";
import { format } from "../../../../common/utils/numberFormatter";

interface MovieDetailsProps {
  id: number;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userEmail = useAppSelector(selectUserEmail);
  const watchlistIds = useAppSelector(selectWatchlistMovieIds);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const { data, isFetching } = useGetMovieByIdQuery(id);
  const [addToWatchlist] = useAddToWatchlistMutation();
  const [removeFromWatchlist] = useRemoveFromWatchlistMutation();

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!userEmail) {
      navigate("/signIn", { state: { from: pathname } });
      return;
    }

    if (e.currentTarget.innerText === " REVIEW") {
      setModalIsOpen(true);
      return;
    }

    const movie: Movie = {
      movieId: id,
      title: data.title,
      poster_path: data.poster_path,
      vote_average: data.vote_average,
      genre_ids: data.genres.map(
        (genre: { id: number; name: string }) => genre.id
      ),
    };
    if (watchlistIds?.includes(id)) {
      try {
        dispatch(removeMovieFromWatchlist(id));
        const res: any = await removeFromWatchlist(id);
        if (!res.data) {
          throw new Error("error");
        }
      } catch (error) {
        dispatch(addMovieToWatchlist(movie));
      }
    } else {
      try {
        dispatch(addMovieToWatchlist(movie));
        const res: any = await addToWatchlist(movie);
        if (!res.data) {
          throw new Error("error");
        }
      } catch (error) {
        dispatch(removeMovieFromWatchlist(id));
      }
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
                <i
                  className={`fa-star ${
                    watchlistIds?.includes(id) ? "fa-solid" : "fa-regular"
                  }`}
                ></i>{" "}
                ADD TO WATCHLIST
              </button>
              <button onClick={handleClick}>
                <i className="fa-solid fa-pen"></i> REVIEW
              </button>
            </div>
            <div className="genres-container">
              <h3>Genres</h3>
              <p>
                {data.genres.map((genre: { id: number; name: string }) => (
                  <React.Fragment key={genre.id}>
                    <span className="genre">{genre.name}</span>
                    <span> </span>
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
          <Rating rating={data.vote_average} />
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
      {modalIsOpen && <ReviewModal movieId={id} close={closeModal} />}
    </>
  );
};

export default MovieDetails;

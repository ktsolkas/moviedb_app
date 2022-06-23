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
import Modal from "react-modal";
import Input from "../signIn/Input";

interface MovieDetailsProps {
  id: number;
}

Modal.setAppElement("#root");

const MovieDetails: React.FC<MovieDetailsProps> = ({ id }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data, isFetching } = useGetMovieByIdQuery(id);
  const userToken = useAppSelector(selectToken);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = '#f00';
  // }

  function closeModal() {
    setIsOpen(false);
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!userToken) {
      navigate("/signIn", { state: { from: pathname } });
    } else {
      //placeholder
      if (e.currentTarget.innerText === " REVIEW") {
        openModal();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <div>
        <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          // style={{ height: "auto" }}
          contentLabel="Example Modal"
        >
          {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
          <div className="modal">
            <button className="close-modal" onClick={closeModal}>
              X
            </button>
            <form onSubmit={handleSubmit}>
              <Input
                name="title"
                label="Review Title"
                handleChange={() => console.log(3)}
                autoFocus={true}
              />
              <label htmlFor="body">Review Body</label>
              <textarea name="body" />
              <label htmlFor="rating">Rating</label>
              <select>
                {Array.from(Array(11).keys()).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <button type="submit">Submit</button>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default MovieDetails;

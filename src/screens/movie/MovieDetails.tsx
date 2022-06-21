import "./MovieDetails.css";
import { useGetMovieByIdQuery } from "../../app/services/api";
import Rating from "../../components/Rating";
import Image from "../../components/Image";
import { runtimeConvert } from "../../common/utils/runtimeConvert";
import { format } from "../../common/utils/numberFormatter";
import React from "react";

interface MovieDetailsProps {
  id: number;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ id }) => {
  const { data, isFetching } = useGetMovieByIdQuery(id);
  if (isFetching) {
    return <p>LOADING</p>;
  }
  return (
    <>
      <div className="movie-details-container">
        <Image
          errorImg="https://image.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg"
          placeholderImg="https://via.placeholder.com/400x200.png?text=This+Will+Be+Shown+Before+Load"
          src={`https://image.tmdb.org/t/p/w300/${data.poster_path}`}
          alt={`${data.title} movie poster`}
        />
        <div className="movie-details">
          <h2>{data.title}</h2>
          <p>{data.tagline}</p>
          <h3>Plot</h3>
          <p>{data.overview}</p>
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
          <h3>Status</h3>
          <p>{data.status}</p>
          <h3>Produced By</h3>
          {data.production_companies.map(
            (value: { id: number; name: string }, index: number) => (
              <span key={value.id}>{`${value.name}${
                index < data.genres.length - 1 ? ", " : ""
              }`}</span>
            )
          )}
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

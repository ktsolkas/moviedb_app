import "./MoviePage.css";

import { useGetMovieImageQuery } from "../../app/services/moviedbApi";
import { useLocation } from "react-router-dom";
import MovieDetails from "./MovieDetails";
import ActorList from "./ActorList";

const MoviePage: React.FC = () => {
  const { pathname } = useLocation();
  const id = pathname.slice(7);
  const { data, isFetching } = useGetMovieImageQuery(id);
  if (isFetching) {
    return <p>LOADING</p>;
  }

  return (
    <>
      <div
        className="movie-page"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${data.backdrops[0].file_path})`,
        }}
      >
        <MovieDetails id={+id} />
      </div>
      <ActorList id={+id} />
    </>
  );
};

export default MoviePage;

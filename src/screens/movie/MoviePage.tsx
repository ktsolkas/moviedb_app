import "./MoviePage.css";

import { useGetMovieImageQuery } from "../../app/services/moviedbApi";
import { useLocation } from "react-router-dom";
import MovieDetails from "./MovieDetails";
import ActorList from "./ActorList";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { CardList } from "../../components/CardList";

const MoviePage: React.FC = () => {
  const { pathname } = useLocation();
  const id = pathname.slice(7);
  const { data, isFetching } = useGetMovieImageQuery(id);
  if (isFetching) {
    return <p>LOADING</p>;
  }
  const images = data.backdrops.map((item: any) => ({
    original: `https://image.tmdb.org/t/p/w1280${item.file_path}`,
    thumbnail: `https://image.tmdb.org/t/p/w200${item.file_path}`,
  }));

  return (
    <>
      <div
        className="movie-page-main"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${data.backdrops[0].file_path})`,
        }}
      >
        <MovieDetails id={+id} />
      </div>
      <div className="movie-page-side">
        <h2>Actors</h2>
        <ActorList id={+id} />
        <hr />
        <div className="image-gallery">
          <h2>Photos</h2>
          <ImageGallery items={images} autoPlay={true} showPlayButton={false} />
        </div>
        <hr />
        <div className='similar'>

        <h2>Similar</h2>
        <CardList id={+id} />
        </div>
      </div>
    </>
  );
};

export default MoviePage;

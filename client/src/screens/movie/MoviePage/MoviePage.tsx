import "./MoviePage.css";
import "react-image-gallery/styles/css/image-gallery.css";
import { useLocation } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import { DualRing } from "react-awesome-spinners";
import { useEffect } from "react";

import MovieDetails from "./MovieDetails/MovieDetails";
import ActorList from "./ActorList/ActorList";
import { CardList } from "../../components/CardList/CardList";
import Review from "./Review/Review";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  useGetMovieImageQuery,
  useGetMovieReviewsQuery,
} from "../../../app/store/services/api";
import {
  addReviews,
  clearReviews,
  selectReviewsByMovieId,
} from "../../../app/store/movieSlice";
import ReviewType from "../../../common/types/Review";

const MoviePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const id = pathname.slice(7);

  const { data, isFetching } = useGetMovieImageQuery(id);
  const reviews = useGetMovieReviewsQuery(id);

  const reviewState = useAppSelector((state) =>
    selectReviewsByMovieId(state, +id)
  );

  useEffect(() => {
    if (reviews.data) {
      dispatch(addReviews(reviews.data));
    }
    return () => {
      dispatch(clearReviews());
    };
  }, [dispatch, reviews.data]);

  if (isFetching) {
    return (
      <div className="spinner">
        <DualRing size={256} color="#fd2525" />
      </div>
    );
  }

  const images = data.backdrops.map((item: any) => ({
    original: `https://image.tmdb.org/t/p/w1280${item.file_path}`,
    thumbnail: `https://image.tmdb.org/t/p/w200${item.file_path}`,
  }));

  return (
    <>
      <main
        className="movie-page-main"
        style={{
          backgroundImage:
            data.backdrops[0] &&
            `url(https://image.tmdb.org/t/p/w1280${data.backdrops[0].file_path})`,
        }}
      >
        <MovieDetails id={+id} />
      </main>
      <div className="movie-page-side">
        <section>
          <h2>Actors</h2>
          <ActorList id={+id} />
        </section>
        <hr />
        <section>
          {!!images.length && (
            <>
              <div className="image-gallery">
                <h2>Photos</h2>
                <ImageGallery
                  items={images}
                  autoPlay={true}
                  showPlayButton={false}
                />
              </div>
              <hr />
            </>
          )}
        </section>
        <section className="similar">
          <h2>Similar</h2>
          <CardList id={+id} />
        </section>
        <section className="reviews">
          <h2>Reviews</h2>
          {reviewState.length ? (
            reviewState
              .reverse()
              .map((review: ReviewType, index: number) => (
                <Review key={index} {...review} />
              ))
          ) : (
            <p>No reviews available for this movie.</p>
          )}
        </section>
      </div>
    </>
  );
};

export default MoviePage;

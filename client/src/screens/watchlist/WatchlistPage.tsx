import "./WatchlistPage.css";

import MovieCard from "../components/CardList/MovieCard/MovieCard";
import { useAppSelector } from "../../app/hooks";
import { selectMoviesInWatchlist } from "../../app/store/watchlistSlice";
import Movie from "../../common/types/Movie";

const WatchlistPage: React.FC = () => {
  const watchlist = useAppSelector(selectMoviesInWatchlist);

  return (
    <main className="watchlist">
      <h2>My Watchlist</h2>
      {/* {if (!watchlist.length) {
    <p>You have not added any movies in your watchlist yet</p>;
  }} */}
      {watchlist.length ? (
        watchlist.map((movie: Movie) => {
          return (
            <MovieCard
              key={movie.movieId}
              title={movie.title}
              poster_path={movie.poster_path}
              vote_average={movie.vote_average}
              id={movie.movieId!}
              genre_ids={movie.genre_ids}
            />
          );
        })
      ) : (
        <p className="empty-watchlist">
          You have not added any movies in your watchlist yet.
        </p>
      )}
    </main>
  );
};

export default WatchlistPage;

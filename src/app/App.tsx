import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import { CardList } from "../screens/components/CardList/CardList";
import ProtectedRoute from "../screens/components/ProtectedRoute/ProtectedRoute";
import HomePage from "../screens/home/HomePage/HomePage";
import MoviePage from "../screens/movie/MoviePage/MoviePage";
import SearchPage from "../screens/search/SearchPage";
import SignInPage from "../screens/signIn/SignInPage";
import WatchlistPage from "../screens/watchlist/WatchlistPage";
import Layout from "../screens/components/Layout/Layout";
import { useAppDispatch, useAppSelector } from "./hooks";
import {
  selectWatchlist,
  useGetGenresQuery,
  useGetWatchlistQuery,
} from "./store/services/api";
import { selectUser } from "./store/authSlice";
import { auth } from "../app/store/authSlice";
import { updateWatchlist } from "./store/watchlistSlice";
import { categories } from "../common/types/Category";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useGetGenresQuery(null);
  useGetWatchlistQuery(null);
  const watchlist = useAppSelector(selectWatchlist);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const profile = JSON.parse("" + localStorage.getItem("profile"));
    if (profile) {
      dispatch(auth(profile));
      dispatch(updateWatchlist(watchlist || []));
    }
  }, [watchlist, dispatch]);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />}>
            <Route index element={<CardList category={"popular"} />} />
            {categories.map((value) => {
              return (
                <Route
                  key={value}
                  path={value}
                  element={<CardList category={value} />}
                />
              );
            })}
          </Route>
          <Route path="search/:searchTerm" element={<SearchPage />} />
          <Route path="movie/:movieId" element={<MoviePage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route
            path="/watchlist"
            element={
              <ProtectedRoute user={user?.profileData!}>
                <WatchlistPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;

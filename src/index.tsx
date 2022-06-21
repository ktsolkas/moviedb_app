import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./app/store";
import App from "./app/App";
import HomePage from "./screens/home/HomePage";
import { CardList } from "./components/CardList";
import { categories } from "./common/types/Category";
import MoviePage from "./screens/movie/MoviePage";
import SearchPage from "./screens/search/SearchPage";
import SignInPage from "./screens/signIn/SignInPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="79054974389-d331kq17ikhppgu7777st4lsqnis1ksr.apps.googleusercontent.com">
        <BrowserRouter>
          <Routes>
            <Route element={<App />}>
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
            </Route>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);

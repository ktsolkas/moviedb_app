import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./app/store";
import App from "./app/App";
import HomePage from "./screens/homepage/HomePage";
import { CardList } from "./components/CardList";
import SearchForm from "./components/SearchForm";
import { categories } from "./common/types/Category";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
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
            <Route
              path="search/:searchTerm"
              element={
                <>
                  <SearchForm />
                  <CardList />
                </>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

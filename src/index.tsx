import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { store } from "./app/store";
import App from "./app/App";
import HomePage from "./screens/homepage/HomePage";
import { CardList } from "./components/CardList";

const container = document.getElementById("root")!;
const root = createRoot(container);

const peon = ["popular", "top_rated", "upcoming", "now_playing"];

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<HomePage />}>
              {peon.map((value) => {
                return (
                  <Route key={value} path={value} element={<CardList />} />
                );
              })}
              <Route path="search/:searchTerm" element={<></>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

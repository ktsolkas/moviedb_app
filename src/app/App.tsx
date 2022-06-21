import "./App.css";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import {
  useCreateWatchlistMutation,
  useGetGenresQuery,
  useGetWatchlistQuery,
} from "./services/api";
import { useEffect } from "react";
// import { useEffect, useState } from "react";

//rafce

const App: React.FC = () => {
  useGetGenresQuery(null);
  const { data, isLoading, isSuccess } = useGetWatchlistQuery(null);
  console.log("asd", data, isLoading, isSuccess);
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch("http://localhost:3001/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  // console.log("ok man", data);
  // const watchlist = useGetWatchlistQuery(null);
  // console.log("ola pipa", watchlist);
  // const [peons, result] = useCreateWatchlistMutation();

  // useEffect(() => {
  //   peons({ data: "asd" });
  //   console.log("hjdfsdfkjskjdfskj", result);
  // }, []);

  return (
    <div className="app-container">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;

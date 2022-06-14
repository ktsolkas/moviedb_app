import { createApi, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { RootState } from "../store";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    params = { ...params, api_key: "5050df0b67b52bf426fac7f26ef4f205" };
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const moviedbApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => ({ url: "/genre/movie/list", method: "get" }),
    }),
    getPopularMovies: builder.query({
      query: () => ({ url: "/movie/popular", method: "get" }),
    }),
    getSearchMovieResult: builder.query({
      query: (input) => ({
        url: "/search/movie",
        method: "get",
        params: { query: input },
      }),
    }),
    getMovieImage: builder.query({
      query: (movie_id) => ({
        url: `/movie/${movie_id}/images`,
        method: "get",
      }),
    }),
  }),
});

export const selectGenreByIdList = (state: RootState) => (ids: number[]) => {
  const getGenres = state.api.queries["getGenres(null)"];
  let genreList: string[] = [];
  if (getGenres) {
    const data = getGenres.data as {
      genres: { id: number; name: "string" }[];
      startedTimeStamp: number;
    };
    console.log("lul", data.genres);
    ids.forEach((id) => {
      const genre = data.genres.find((item) => item.id === id);
      if (genre) {
        genreList.push(genre.name);
      }
    });
  }
  return genreList;
};

export const {
  useGetGenresQuery,
  useGetPopularMoviesQuery,
  useGetSearchMovieResultQuery,
  useGetMovieImageQuery,
} = moviedbApi;

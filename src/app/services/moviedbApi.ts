import { createApi, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import Category from "../../common/types/Category";
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
    params = { api_key: "5050df0b67b52bf426fac7f26ef4f205", ...params };
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
    getMoviesByCategory: builder.query({
      query: (category: Category) => ({
        url: `/movie/${category}`,
        method: "get",
      }),
    }),
    getSearchMovieResult: builder.query({
      query: (input: string) => ({
        url: "/search/movie",
        method: "get",
        params: { query: input.split("/")[2] },
      }),
    }),
    getMovieImage: builder.query({
      query: (movie_id) => ({
        url: `/movie/${movie_id}/images`,
        method: "get",
      }),
    }),
    getMovieById: builder.query({
      query: (movie_id) => ({
        url: `/movie/${movie_id}`,
        method: "get",
      }),
    }),
    getCredit: builder.query({
      query: (movie_id) => ({
        url: `/movie/${movie_id}/credits`,
        method: "get",
      }),
    }),
  }),
});

export const selectGenreByIdList = (state: RootState) => (ids: number[]) => {
  const getGenres = state.api.queries["getGenres(null)"];
  let genreList: string[] = [];

  if (getGenres && getGenres.status === "fulfilled") {
    const data = getGenres.data as {
      genres: { id: number; name: string }[];
    };

    genreList = ids.reduce((accumulator: string[], currentId: number) => {
      const genre = data.genres.find((item) => item.id === currentId);
      if (genre) {
        accumulator.push(genre.name);
      }
      return accumulator;
    }, []);
  }

  return genreList;
};

export const {
  useGetGenresQuery,
  useGetMoviesByCategoryQuery,
  useGetSearchMovieResultQuery,
  useGetMovieImageQuery,
  useGetMovieByIdQuery,
  useGetCreditQuery,
} = moviedbApi;

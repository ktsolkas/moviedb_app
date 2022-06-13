import { createApi, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

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
  async ({
    url,
    method,
    data,
    params = { api_key: "5050df0b67b52bf426fac7f26ef4f205" },
  }) => {
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
  }),
});

export const { useGetGenresQuery, useGetPopularMoviesQuery } = moviedbApi;

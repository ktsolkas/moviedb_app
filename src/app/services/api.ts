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
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    if (baseUrl === "https://api.themoviedb.org/3") {
      // params = { api_key: "5050df0b67b52bf426fac7f26ef4f205", ...params };
    } else {
      // headers;
    }
    try {
      if (baseUrl === "https://api.themoviedb.org/3") {
        const result = await axios({
          url: baseUrl + url,
          method,
          data,
          params,
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDUwZGYwYjY3YjUyYmY0MjZmYWM3ZjI2ZWY0ZjIwNSIsInN1YiI6IjYyYTVlM2QyNTM4NjZlMGRlMGYzYTMyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mmr3TYlySq6LTS3OFrE0UFTxPZECpGRIwWhIpWTF9fA",
          },
        });
        return { data: result.data };
      } else {
        const result = await axios({
          url: baseUrl + url,
          method,
          data,
          params,
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("profile")
                ? JSON.parse(localStorage.getItem("profile")!).token
                : ""
            }`,
          },
        });
        return { data: result.data };
      }
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
  reducerPath: "moviedbApi",
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
    getSimilarMovies: builder.query({
      query: (movie_id) => ({
        url: `/movie/${movie_id}/similar`,
        method: "get",
      }),
    }),
  }),
});

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (formData) => ({
        url: "/user/signin",
        method: "post",
        data: formData,
      }),
    }),
    signUp: builder.mutation({
      query: (formData) => ({
        url: "/user/signup",
        method: "post",
        data: formData,
      }),
    }),
    getWatchlist: builder.query({
      query: () => ({
        url: "/watchlist",
        method: "get",
      }),
    }),
    createWatchlist: builder.mutation({
      query: (watchlist) => ({
        url: "/watchlist",
        method: "post",
        data: watchlist,
      }),
    }),
  }),
});

export const selectGenreByIdList = (state: RootState) => (ids: number[]) => {
  const getGenres = state.moviedbApi.queries["getGenres(null)"];
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
  useGetSimilarMoviesQuery,
} = moviedbApi;

export const {
  useGetWatchlistQuery,
  useCreateWatchlistMutation,
  useSignInMutation,
  useSignUpMutation,
} = api;

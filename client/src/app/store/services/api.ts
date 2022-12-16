import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

import { RootState } from '../store';
import Category from '../../../common/types/Category';

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    const authorization =
      baseUrl === 'https://api.themoviedb.org/3'
        ? 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDUwZGYwYjY3YjUyYmY0MjZmYWM3ZjI2ZWY0ZjIwNSIsInN1YiI6IjYyYTVlM2QyNTM4NjZlMGRlMGYzYTMyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mmr3TYlySq6LTS3OFrE0UFTxPZECpGRIwWhIpWTF9fA'
        : `Bearer ${
            localStorage.getItem('profile')
              ? JSON.parse(localStorage.getItem('profile')!).token
              : ''
          }`;
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          Authorization: authorization,
        },
      });
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
  reducerPath: 'moviedbApi',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
  }),
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => ({ url: '/genre/movie/list', method: 'get' }),
    }),
    getMoviesByCategory: builder.query({
      query: (category: Category) => ({
        url: `/movie/${category}`,
        method: 'get',
      }),
    }),
    getSearchMovieResult: builder.query({
      query: (input: string) => ({
        url: '/search/movie',
        method: 'get',
        params: { query: input.split('/')[2] },
      }),
    }),
    getMovieImage: builder.query({
      query: (movie_id) => ({
        url: `/movie/${movie_id}/images`,
        method: 'get',
      }),
    }),
    getMovieById: builder.query({
      query: (movie_id) => ({
        url: `/movie/${movie_id}`,
        method: 'get',
      }),
    }),
    getCredit: builder.query({
      query: (movie_id) => ({
        url: `/movie/${movie_id}/credits`,
        method: 'get',
      }),
    }),
    getSimilarMovies: builder.query({
      query: (movie_id) => ({
        url: `/movie/${movie_id}/similar`,
        method: 'get',
      }),
    }),
  }),
});

export const serverApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: 'http://localhost:10000',
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (formData) => ({
        url: '/user/signin',
        method: 'post',
        data: formData,
      }),
    }),
    signUp: builder.mutation({
      query: (formData) => ({
        url: '/user/signup',
        method: 'post',
        data: formData,
      }),
    }),
    addReview: builder.mutation({
      query: (review) => ({
        url: '/review',
        method: 'post',
        data: review,
      }),
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: '/review/delete',
        method: 'post',
        data: { id },
      }),
    }),
    editReview: builder.mutation({
      query: (edittedReview) => ({
        url: '/review/edit',
        method: 'post',
        data: { ...edittedReview },
      }),
    }),
    getMovieReviews: builder.query({
      query: (movieId) => ({
        url: `/review//movie/${movieId}`,
        method: 'get',
      }),
    }),
    addToWatchlist: builder.mutation({
      query: ({ movieId, title, poster_path, vote_average, genre_ids }) => ({
        url: '/watchlist/add',
        method: 'post',
        data: { movieId, title, poster_path, vote_average, genre_ids },
      }),
    }),
    getWatchlist: builder.query({
      query: () => ({
        url: '/watchlist',
        method: 'get',
      }),
    }),
    removeFromWatchlist: builder.mutation({
      query: (movieId: number) => ({
        url: '/watchlist/remove',
        method: 'post',
        data: { movieId },
      }),
    }),
  }),
});

export const selectGenreByIdList = (state: RootState) => (ids: number[]) => {
  const getGenres = state.moviedbApi.queries['getGenres(null)'];
  let genreList: string[] = [];

  if (getGenres && getGenres.status === 'fulfilled') {
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

export const selectWatchlist = (state: RootState) =>
  serverApi.endpoints.getWatchlist.select(null)(state).data?.results;

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
  useSignInMutation,
  useSignUpMutation,
  useAddReviewMutation,
  useDeleteReviewMutation,
  useEditReviewMutation,
  useGetMovieReviewsQuery,
  useAddToWatchlistMutation,
  useRemoveFromWatchlistMutation,
} = serverApi;

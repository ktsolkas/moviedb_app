export default interface Movie {
  title: string;
  poster_path: string;
  vote_average: number;
  id: number;
  genre_ids: number[];
  overview: string;
  release_date: string;
}

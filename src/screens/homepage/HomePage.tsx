import SearchForm from "../../components/SearchForm";
import {
  useGetGenresQuery,
  useGetPopularMoviesQuery,
} from "../../app/services/moviedbApi";

const HomePage: React.FC = () => {
  const { data, error, isLoading } = useGetGenresQuery(null);
  // const { data, error, isLoading } = useGetPopularMoviesQuery(null);
  console.log("hey", data, "ho", error, "ez", isLoading);

  return <SearchForm />;
};

export default HomePage;

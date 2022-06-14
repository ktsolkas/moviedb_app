import SearchForm from "../../components/SearchForm";
import {
  useGetGenresQuery,
  useGetMoviesByCategoryQuery,
} from "../../app/services/moviedbApi";
import { Outlet } from "react-router-dom";
import { CardList } from "../../components/CardList";
import { DualRing } from "react-awesome-spinners";
import "./HomePage.css";
import CategoriesBar from "../../components/CategoriesBar";

const HomePage: React.FC = () => {
  const { isSuccess } = useGetGenresQuery(null);
  // const { data, error, isLoading } = useGetMoviesByCategoryQuery("popular");
  // const { data, error, isLoading } = useGetSearchMovieResultQuery("magic");
  // console.log("hey", data, "ho", error, "ez", isLoading);
  // let title, poster_path, vote_average, id, genre_ids;
  // if (data) {
  // title = data.results[0].title;
  // poster_path = data.results[0].poster_path;
  // vote_average = data.results[0].vote_average;
  // id = data.results[0].id;
  // genre_ids = data.results[0].genre_ids;
  // }
  console.log("KSIPNA", isSuccess);

  return (
    <>
      <SearchForm />
      {isSuccess && <CategoriesBar />}
      {/* <CategoriesBar /> */}
      {/* {isLoading ? (
        <div className="spinner">
          <DualRing size={256} color="#fd2525" />
        </div>
      ) : null}
      {data ? <CardList movies={data.results} /> : null} */}
      <Outlet />
    </>
  );
};

export default HomePage;

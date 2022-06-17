import { useState } from "react";
import { useGetCreditQuery } from "../../app/services/moviedbApi";
import Actor from "../../common/types/Actor";
import ActorCard from "./ActorCard";
import "./ActorList.css";

interface ActorListProps {
  id: number;
}

const ActorList: React.FC<ActorListProps> = ({ id }) => {
  const [showAll, setShowAll] = useState(false);
  const { data, isError, isFetching } = useGetCreditQuery(id);
  let visibleActors: Actor[] = [];
  if (isFetching) {
    return <p>FFS</p>;
  }
  if (isError) {
    return <p>Error</p>;
  }

  if (showAll) {
    visibleActors = data.cast;
  } else {
    visibleActors = data.cast.slice(0, 6);
  }
  console.log(visibleActors);

  return (
    <div className="actor-list">
      <h2>Actors</h2>
      {visibleActors.map((actor) => (
        <ActorCard key={actor.id} actor={actor} />
      ))}
    </div>
  );
};

export default ActorList;

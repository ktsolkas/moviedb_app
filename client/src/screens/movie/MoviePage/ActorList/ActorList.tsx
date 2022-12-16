import "./ActorList.css";
import { useState } from "react";

import ActorCard from "./ActorCard/ActorCard";
import { useGetCreditQuery } from "../../../../app/store/services/api";
import Actor from "../../../../common/types/Actor";

interface ActorListProps {
  id: number;
}

const ActorList: React.FC<ActorListProps> = ({ id }) => {
  const [showAll, setShowAll] = useState(false);
  const { data, isError, isFetching } = useGetCreditQuery(id);

  let visibleActors: Actor[] = [];

  if (isFetching) {
    return <></>;
  }

  if (isError) {
    return <p>An error has occured!</p>;
  }

  if (showAll) {
    visibleActors = data.cast;
  } else {
    visibleActors = data.cast.slice(0, 6);
  }

  return (
    <div className="actor-list-container">
      <div className="actor-list">
        {visibleActors.map((actor) => (
          <ActorCard key={actor.id} actor={actor} />
        ))}
      </div>
      {data.cast.length > 6 && (
        <>
          <button onClick={() => setShowAll((prev) => !prev)}>
            {showAll ? (
              <>
                <span>Show Less</span>
                <i className="fa-solid fa-caret-up"></i>
              </>
            ) : (
              <>
                <span>Show More</span>
                <i className="fa-solid fa-caret-down"></i>
              </>
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default ActorList;

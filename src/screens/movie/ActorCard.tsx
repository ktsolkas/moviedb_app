import Actor from "../../common/types/Actor";
import "./ActorCard.css";
import Image from "../../components/Image";

interface ActorCardProps {
  actor: Actor;
}

const ActorCard: React.FC<ActorCardProps> = ({ actor }) => {
  const { character, original_name, profile_path } = actor;
  return (
    <div className="actor-card">
      <Image
        errorImg="/no-image-available.jpg"
        placeholderImg="/placeholderImg.jpg"
        src={`https://image.tmdb.org/t/p/w300/${profile_path}`}
        alt={`Image of ${original_name}`}
      />
      <span>{original_name}</span>
      <span>{character}</span>
    </div>
  );
};

export default ActorCard;

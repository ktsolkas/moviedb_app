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
        errorImg="https://image.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg"
        placeholderImg="https://via.placeholder.com/400x200.png?text=This+Will+Be+Shown+Before+Load"
        src={`https://image.tmdb.org/t/p/w300/${profile_path}`}
        alt={`Image of ${original_name}`}
      />
      <span>{original_name}</span>
      <span>{character}</span>
    </div>
  );
};

export default ActorCard;

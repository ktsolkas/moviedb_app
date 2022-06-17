import "./Rating.css";

interface RatingProps {
  vote_average: number;
}

const Rating: React.FC<RatingProps> = ({ vote_average }) => (
  <div className="rating">
    <p>{vote_average}</p>
  </div>
);

export default Rating;
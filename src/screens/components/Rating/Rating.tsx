import "./Rating.css";

interface RatingProps {
  rating: number;
  precision?: number;
}

const Rating: React.FC<RatingProps> = ({ rating, precision }) => (
  <div className="rating">
    <p>{rating.toPrecision((rating !== 10 && precision) || 2)}</p>
  </div>
);

export default Rating;

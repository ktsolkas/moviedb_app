import "./Review.css";
import moment from "moment";
import { useState } from "react";

import Rating from "../../../components/Rating/Rating";
import ReviewModal from "../ReviewModal/ReviewModal";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectUserEmail } from "../../../../app/store/authSlice";
import { removeReview } from "../../../../app/store/movieSlice";
import { useDeleteReviewMutation } from "../../../../app/store/services/api";

interface ReviewProps {
  title: string;
  body: string;
  rating: string;
  userEmail: string;
  addedAt: string;
  _id: string;
}

const Review: React.FC<ReviewProps> = ({
  title,
  body,
  rating,
  userEmail,
  addedAt,
  _id,
}) => {
  const dispatch = useAppDispatch();
  const email = useAppSelector(selectUserEmail);
  const [deleteReview] = useDeleteReviewMutation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDelete = () => {
    dispatch(removeReview(_id));
    deleteReview(_id);
  };

  const openModal = async () => {
    setModalIsOpen(true);
  };

  return (
    <>
      <div className="review">
        <h4>{title}</h4>
        <p className="body">{body}</p>
        <Rating rating={+rating} precision={1} />
        <span>
          <em>
            {userEmail}, {}
          </em>
          <em>{moment(addedAt).fromNow()}</em>
        </span>
        {email === userEmail && (
          <div className="button-group">
            <button onClick={openModal}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
      {modalIsOpen && (
        <ReviewModal review={{ title, body, rating, _id }} close={closeModal} />
      )}
    </>
  );
};
export default Review;

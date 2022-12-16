import "./ReviewModal.css";
import { useEffect, useState } from "react";
import Modal from "react-modal";

import Input from "../../../components/Input/Input";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  useAddReviewMutation,
  useEditReviewMutation,
} from "../../../../app/store/services/api";
import { addReview, editReview } from "../../../../app/store/movieSlice";
import { selectUserEmail } from "../../../../app/store/authSlice";

interface ReviewModalProps {
  review?: {
    title: string;
    body: string;
    rating: string;
    _id: string;
  };
  movieId?: number;
  close: () => void;
}

Modal.setAppElement("#root");

const ReviewModal: React.FC<ReviewModalProps> = ({
  review,
  movieId,
  close,
}) => {
  const { title, body, rating, _id } = { ...review };
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector(selectUserEmail);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: title || "",
    body: body || "",
    rating: rating || "0",
  });

  const [addUserReview] = useAddReviewMutation();
  const [editUserReview] = useEditReviewMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    close();
    try {
      if (movieId) {
        const res = await addUserReview({
          ...formData,
          movieId,
          userEmail,
        }).unwrap();
        dispatch(addReview({ ...res }));
      } else {
        await editUserReview({
          ...formData,
          _id,
        });
        dispatch(editReview({ ...formData, _id: _id! }));
      }
      setFormData({ title: "", body: "", rating: "0" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
    >
  ) => {
    if (e.target.nodeName === "TEXTAREA") {
      setFormData((formData) => {
        return { ...formData, body: e.target.value };
      });
    } else if (e.target.nodeName === "SELECT") {
      setFormData((formData) => {
        return { ...formData, rating: e.target.value };
      });
    } else {
      setFormData((formData) => {
        return { ...formData, title: e.target.value };
      });
    }
  };

  useEffect(() => {
    setTimeout(() => setIsOpen(true), 0);
  }, []);

  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={close} contentLabel="Review Modal">
        <div className="modal">
          <button className="close-modal" onClick={close}>
            X
          </button>
          <form onSubmit={handleSubmit}>
            <Input
              name="title"
              label="Review Title"
              handleChange={handleChange}
              autoFocus={true}
              value={formData.title}
            />
            <label htmlFor="body">Review Body</label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
            />
            <label htmlFor="rating">Rating</label>
            <select value={formData.rating} onChange={handleChange}>
              {Array.from(Array(11).keys()).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ReviewModal;

import { useSelector } from "react-redux";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { FaSave, FaTrash, FaEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import {
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} from "../slices/reviewsApiSlice";
import { toast } from "react-toastify";

const ReviewCard = ({ review }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [editReview, { isLoading: editing }] = useUpdateReviewMutation();
  const [deleteReview, { isLoading: deleting }] = useDeleteReviewMutation();

  const [title, setTitle] = useState(review.title);
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const [showEdit, setShowEdit] = useState(false);

  const handleShowEdit = () => {
    setShowEdit(true);
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await editReview({
        _id: review._id,
        review: { title, rating, comment },
      }).unwrap();
      setShowEdit(false);
      toast.success("Review updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteReview(review).unwrap();
      toast.success("Review deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return showEdit ? (
    <div className="card m-2">
      <div className="card-body">
        <Form onSubmit={handleEdit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
          <div className="d-flex gap-1">
            <button
              disabled={editing}
              className="btn btn-primary"
              type="submit"
            >
              <FaSave />
            </button>
            <button
              disabled={editing}
              className="btn btn-danger"
              type="button"
              onClick={() => setShowEdit(false)}
            >
              <GiCancel />
            </button>
          </div>
        </Form>
      </div>
    </div>
  ) : (
    <div className="card m-2">
      <div className="card-body">
        <h5 className="card-title">{review.title}</h5>
        <p className="badge bg-primary">{review.rating}/10</p>
        <p className="card-text">{review.comment}</p>
      </div>
      <div className="card-footer">
        <p className="badge bg-secondary">Created by: {userInfo.name}</p>
        <div className="d-flex gap-2">
          <button
            disabled={editing}
            className="btn btn-primary"
            onClick={handleShowEdit}
          >
            <FaEdit />
          </button>
          <button
            disabled={deleting}
            className="btn btn-danger"
            onClick={handleDelete}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

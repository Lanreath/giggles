import { useDispatch, useSelector} from "react-redux";
import { useDeleteReviewMutation } from "../slices/reviewsApiSlice";
import { removeReview } from "../slices/userSlice";
import { toast } from "react-toastify";
import Loader from "./Loader";

const ReviewCard = ({ review }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [deleteReview, {isLoading}] = useDeleteReviewMutation();
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await deleteReview(review).unwrap();
      dispatch(removeReview(res));
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{review.title}</h5>
        <p className="card-text">{review.rating}</p>
        <p className="card-text">{review.comment}</p>
        <p className="card-text">
          <small className="text-muted">{userInfo.name}</small>
        </p>
        <button disabled={isLoading} className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default ReviewCard;

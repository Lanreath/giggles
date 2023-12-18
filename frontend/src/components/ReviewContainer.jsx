import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetReviewsByUserQuery,
} from "../slices/reviewsApiSlice";
import Loader from "./Loader";
import ReviewCard from "./ReviewCard";
const ReviewContainer = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: reviews = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetReviewsByUserQuery(userInfo);

  return (
    <>
      <div className="col">
        <div className="d-flex justify-content-evenly align-items-center my-2">
          <div className="h3">Your Reviews</div>
        </div>
        {(isLoading || isFetching) && <Loader />}
        {isError && toast.error(error?.data?.message || error.error)}
        {isSuccess &&
          reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
      </div>
    </>
  );
};

export default ReviewContainer;

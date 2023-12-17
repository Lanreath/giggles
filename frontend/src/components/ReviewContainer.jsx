import {  useSelector } from "react-redux";
import { useGetReviewsByUserQuery } from "../slices/reviewsApiSlice";
import { toast } from "react-toastify";
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
    <div className="col">
      {(isLoading || isFetching) && <Loader />}
      {isError && toast.error(error?.data?.message || error.error)}
      {isSuccess &&
        reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
    </div>
  );
};

export default ReviewContainer;

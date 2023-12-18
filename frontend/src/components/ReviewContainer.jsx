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
  // const [addReview, { isLoading: adding }] = useCreateReviewMutation();

  // const [title, setTitle] = useState("");
  // const [rating, setRating] = useState("");
  // const [comment, setComment] = useState("");
  // const [modalShow, setModalShow] = useState(false);

  // const handleShow = () => {
  //   setModalShow(true);
  // };
  // const handleClose = () => {
  //   setModalShow(false);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await addReview({ title, rating, comment, }).unwrap();
  //     setModalShow(false);
  //   } catch (err) {
  //     toast.error(err?.data?.message || err.error);
  //   }
  // };

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
      {/* <Modal show={modalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal> */}
    </>
  );
};

export default ReviewContainer;

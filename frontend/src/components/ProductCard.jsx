import { useDispatch, useSelector} from "react-redux";
import { useDeleteProductMutation } from "../slices/productsApiSlice";
import { toast } from "react-toastify";
import Loader from "./Loader";

const ProductCard = ({ product }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [deleteProduct, {isLoading}] = useDeleteProductMutation();
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await deleteProduct(product).unwrap();
      dispatch(removeProduct(res));
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.category}</p>
        <p className="card-text">{product.description}</p>
        <p className="card-text">
          <small className="text-muted">${product.price}</small>
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

export default ProductCard;

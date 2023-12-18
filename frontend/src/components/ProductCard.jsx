import { useState } from "react";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../slices/productsApiSlice";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

const ProductCard = ({ product }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [editProduct, { isLoading: editing }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();

  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [showEdit, setShowEdit] = useState(false);

  const handleShowEdit = () => {
    setShowEdit(true);
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await editProduct({
        _id: product._id,
        product: { name, category, description, price, stock },
      }).unwrap();
      setShowEdit(false);
      toast.success("Product updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteProduct(product).unwrap();
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="card m-2">
      {showEdit ? (
        <div className="card-body">
          <Form onSubmit={handleEdit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="stock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </Form.Group>
            <div className="d-flex gap-1">
              <button
                disabled={editing}
                className="btn btn-primary"
                type="submit"
              >
                <FaSave></FaSave>
              </button>
              <button
                disabled={editing}
                className="btn btn-danger"
                onClick={() => setShowEdit(false)}
              >
                <GiCancel></GiCancel>
              </button>
            </div>
          </Form>
        </div>
      ) : (
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="badge bg-primary">{product.category}</p>
          <p className="card-text">{product.description}</p>
          <p className="card-text">
            <small className="text-muted">Price: ${product.price}</small>
          </p>
          <p className="card-text">
            <small className="text-muted">Stock: {product.stock}</small>
          </p>
          <p className="badge bg-secondary">Created by: {userInfo.name}</p>
          <div className="card-footer d-flex gap-2">
            <button
              disabled={editing}
              className="btn btn-primary"
              onClick={handleShowEdit}
            >
              <FaEdit></FaEdit>
            </button>
            <button
              disabled={deleting}
              className="btn btn-danger"
              onClick={handleDelete}
            >
              <FaTrash></FaTrash>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;

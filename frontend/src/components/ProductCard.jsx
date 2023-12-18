import { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Modal, Button } from "react-bootstrap";
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../slices/productsApiSlice";
import { useCreateReviewMutation } from "../slices/reviewsApiSlice";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaSave, FaClipboardList } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

const ProductCard = ({ product }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [addReview, { isLoading: adding }] = useCreateReviewMutation();
  const [editProduct, { isLoading: editing }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();

  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const handleShow = () => {
    setModalShow(true);
  };
  const handleClose = () => {
    setModalShow(false);
  };
  const handleShowEdit = () => {
    setShowEdit(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addReview({
        product: product,
        title,
        rating,
        comment,
      }).unwrap();
      setModalShow(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
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
    <>
      <Modal show={modalShow} onHide={handleClose}>
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
            <Button disabled={adding} className="btn btn-primary" type="submit">
              <FaSave />
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {showEdit ? (
        <div className="card ">
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
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h5 className="card-title">{product.name}</h5>
              <Button variant="primary" onClick={handleShow}>
                <FaClipboardList />
              </Button>
            </div>
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
        </div>
      )}
    </>
  );
};

export default ProductCard;

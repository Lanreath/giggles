import { useState } from "react";
import {  useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { useCreateProductMutation, useGetProductsByUserQuery } from "../slices/productsApiSlice";
import { toast } from "react-toastify";
import Loader from "./Loader";
import ProductCard from "./ProductCard";
import FormContainer from "./FormContainer";
import { Form } from "react-router-dom";
const ProductContainer = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: products = [],
    isLoading: listing,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetProductsByUserQuery(userInfo);
  const [addProduct, {isLoading: adding}] = useCreateProductMutation();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [modalShow, setModalShow] = useState(false);

  const handleShow = () => {
    setModalShow(true);
  };
  const handleClose = () => {
    setModalShow(false);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await addProduct({ name, category, description, price }).unwrap();
      setModalShow(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }

  return (
    <>
    <div className="col">
      <div className="d-flex justify-content-evenly align-items-center my-2">
        <div className="h5">
          Your Products
        </div>
        <button type="button" onClick={handleShow} className="btn btn-success"> 
          +
        </button>
      </div>
      {(listing || isFetching) && <Loader />}
      {isError && toast.error(error?.data?.message || error.error)}
      {isSuccess &&
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
    </div>
          <Modal show={modalShow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormContainer>
              <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='name'>
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='category'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type='category'
                    placeholder='Enter category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type='description'
                    placeholder='Enter description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='price'>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type='price'
                    placeholder='Enter price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button
                  disabled={adding}
                  type='submit'
                  variant='primary'
                  className='mt-3'
                >
                  Add new product
                </Button>
              </Form>
            </FormContainer>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
  );
};

export default ProductContainer;

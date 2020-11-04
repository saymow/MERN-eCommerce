import { userInfo } from "os";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { TState } from "../../@types/redux";
import {
  ProductUpdateState,
  SingleProductState,
} from "../../@types/redux/product";
import { UserState, UserUpdateAsAdminState } from "../../@types/redux/user";
import { getSingleProduct, updateProduct } from "../../actions/productActions";
import { updateUser, userDetails } from "../../actions/userActions";
import FormContainer from "../../components/FormContainer";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import api from "../../services/api";

const ProductEditScreen: React.FC = () => {
  const { id } = useParams() as { id: string };
  const history = useHistory();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    image: "",
    description: "",
    numReviews: 0,
    price: 0,
    countInStock: 0,
  });
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState<null | string>(null);

  const { product, loading, error } = useSelector<TState, SingleProductState>(
    (state) => state.productDetails
  );

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector<TState, ProductUpdateState>((state) => state.productUpdate);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: "PRODUCT_UPDATE_RESET" });
      history.push("/admin/productlist");
    } else {
      if (!product?.name || product._id !== id) {
        dispatch(getSingleProduct(id));
      } else {
        setFormData({
          brand: product.brand,
          category: product.category,
          countInStock: product.countInStock,
          description: product.description,
          image: product.image,
          name: product.name,
          numReviews: product.numReviews,
          price: product.price,
        });
      }
    }
  }, [id, dispatch, product, successUpdate]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleUploadFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];
    const multipartFormData = new FormData();

    multipartFormData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/forma-data",
        },
      };

      const { data } = await api.post("/upload", multipartFormData, config);

      console.log(data);

      setFormData({
        ...formData,
        image: data,
      });
    } catch (err) {
      console.error(err);
    }
    setUploading(false);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    dispatch(updateProduct(id, formData));
  }

  return (
    <Layout>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && (
          <Message variant="danger">{errorUpdate?.message}</Message>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.message}</Message>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={formData.name}
                onChange={handleInputChange}
                type="name"
                name="name"
                placeholder="Enter name"
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                value={formData.price}
                onChange={handleInputChange}
                type="number"
                name="price"
                placeholder="Enter price"
              />
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                value={formData.image}
                onChange={handleInputChange}
                name="image"
                placeholder="Enter image url"
              />
              <Form.File
                id="image-file"
                label="Choose file"
                custom
                onChange={handleUploadFile}
              />
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                value={formData.brand}
                onChange={handleInputChange}
                name="brand"
                placeholder="Enter brand"
              />
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count in stock</Form.Label>
              <Form.Control
                value={formData.countInStock}
                onChange={handleInputChange}
                type="number"
                name="countInStock"
                placeholder="Enter Count in stock"
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                value={formData.category}
                onChange={handleInputChange}
                name="category"
                placeholder="Enter Category"
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={formData.description}
                onChange={handleInputChange}
                name="description"
                placeholder="Enter description"
              />
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                value={formData.brand}
                onChange={handleInputChange}
                name="brand"
                placeholder="Enter brand"
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Layout>
  );
};

export default ProductEditScreen;

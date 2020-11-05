import React, { FormEvent, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { DefaultApiCall, TState } from "../../@types/redux";
import { SingleProductState } from "../../@types/redux/product";
import { UserState } from "../../@types/redux/user";
import {
  getSingleProduct,
  createProductReview,
} from "../../actions/productActions";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Meta from "../../components/Meta";
import Rating from "../../components/Rating";

const Product: React.FC = () => {
  const { id } = useParams() as { id: string };
  const history = useHistory();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { product, loading, error } = useSelector<TState, SingleProductState>(
    (state) => state.productDetails
  );

  const { userInfo } = useSelector<TState, UserState>(
    (state) => state.userLogin
  );

  const {
    success: successProductReview,
    error: errorProductReview,
  } = useSelector<TState, DefaultApiCall>((state) => state.productReviewCreate);

  useEffect(() => {
    if (successProductReview) {
      alert("Review submited!");
      setRating(0);
      setComment("");
      dispatch({ type: "PRODUCT_CREATE_REVIEW_RESET" });
    }
    dispatch(getSingleProduct(id));
  }, [dispatch, id, successProductReview]);

  const handleAddToCart = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
  }

  return (
    <Layout>
      <Meta title={product?.name} />
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product!.image} alt={product!.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>{product!.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product!.rating}
                    text={`${product!.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>${product!.price}</ListGroup.Item>
                <ListGroup.Item>{product!.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price: </Col>
                      <Col>${product!.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status: </Col>
                      <Col>
                        {product!.countInStock > 0
                          ? "In Stock"
                          : "Out of stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product?.countInStock !== 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(parseInt(e.target.value))}
                          >
                            {[...Array(product!.countInStock).keys()].map(
                              (i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      disabled={product!.countInStock === 0}
                      onClick={handleAddToCart}
                      type="button"
                    >
                      Add to cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product?.reviews.length === 0 && <Message>No reviews</Message>}
              <ListGroup>
                {product?.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Costumer review</h2>
                  {errorProductReview && (
                    <Message variant="danger">
                      {errorProductReview.message}
                    </Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/signin">sign in.</Link> to write a
                      review.
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </Layout>
  );
};

export default Product;

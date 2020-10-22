import React, { useEffect, useState } from "react";
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
import { TState } from "../../@types/redux";
import { SingleProductState } from "../../@types/redux/product";
import { getSingleProduct } from "../../actions/productActions";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Rating from "../../components/Rating";

const Product: React.FC = () => {
  const { id } = useParams() as { id: string };
  const history = useHistory();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);

  const { product, loading, error } = useSelector<TState, SingleProductState>(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  return (
    <Layout>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
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
                      {product!.countInStock > 0 ? "In Stock" : "Out of stock"}
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
                          {[...Array(product!.countInStock).keys()].map((i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
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
      )}
    </Layout>
  );
};

export default Product;

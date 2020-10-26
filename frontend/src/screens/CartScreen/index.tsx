import React, { useEffect } from "react";
import {
  Col,
  ListGroup,
  Row,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useHistory, Link } from "react-router-dom";
import { TState } from "../../@types/redux";
import { CartState } from "../../@types/redux/cart";
import { UserState } from "../../@types/redux/user";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import Layout from "../../components/Layout";
import Message from "../../components/Message";

const CartScreen: React.FC = () => {
  const { id } = useParams() as { id?: string };
  const history = useHistory();
  const location = useLocation();

  const { cartItems } = useSelector<TState, CartState>((state) => state.cart);
  const { userInfo } = useSelector<TState, UserState>(
    (state) => state.userLogin
  );

  const qty =
    parseInt(new URLSearchParams(location.search).get("qty") as string) ||
    undefined;

  const dispatch = useDispatch();

  useEffect(() => {
    if (id && qty) dispatch(addToCart(id, qty));
  }, []);

  function handleRemoveFromCart(productId: string) {
    dispatch(removeFromCart(productId));
  }

  function handleCheckout() {
    history.push(userInfo ? "/shipping" : "/login?redirect=shipping");
  }

  return (
    <Layout>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item._id, parseInt(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => handleRemoveFromCart(item._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal (
                  {cartItems.reduce((accum, item) => accum + item.qty, 0)})
                  items
                </h2>
                $
                {cartItems
                  .reduce((accum, item) => accum + item.price * item.qty, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default CartScreen;

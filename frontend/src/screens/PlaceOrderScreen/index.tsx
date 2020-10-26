import React, { FormEvent, useEffect } from "react";
import { Col, ListGroup, Row, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { TState } from "../../@types/redux";
import { CartState } from "../../@types/redux/cart";
import { OrderState } from "../../@types/redux/order";
import { createOrder } from "../../actions/orderActions";
import CheckoutSteps from "../../components/CheckoutSteps";
import Layout from "../../components/Layout";
import Message from "../../components/Message";

// import { Container } from './styles';

const PlaceOrderScreen: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const cart = useSelector<TState, CartState>((state) => state.cart);

  const serializedCart = {
    ...cart,
  } as CartState & {
    itemsPrice: string;
    shippingPrice: string;
    taxPrice: string;
    totalPrice: string;
  };

  const addDecimals = (num: number) => {
    return Math.round((num * 100) / 100).toFixed(2);
  };

  serializedCart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acumm, item) => acumm + item.price * item.qty, 0)
  );

  serializedCart.shippingPrice = addDecimals(
    parseFloat(serializedCart.itemsPrice) > 100 ? 0 : 10
  );

  serializedCart.taxPrice = addDecimals(
    Number(0.15 * parseFloat(serializedCart.itemsPrice))
  );

  serializedCart.totalPrice = (
    parseFloat(serializedCart.itemsPrice) +
    parseFloat(serializedCart.shippingPrice) +
    parseFloat(serializedCart.taxPrice)
  ).toFixed(2);

  const { success, order, error } = useSelector<TState, OrderState>(
    (state) => state.orderCreate
  );

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [order, success, history]);

  function handlePlaceOrder(e: FormEvent) {
    e.preventDefault();

    dispatch(
      createOrder({
        orderItems: serializedCart.cartItems,
        shippingAddress: serializedCart.shippingAddress,
        paymentMethod: serializedCart.paymentMethod,
        itemsPrice: serializedCart.itemsPrice,
        shippingPrice: serializedCart.shippingPrice,
        taxPrice: serializedCart.taxPrice,
        totalPrice: serializedCart.totalPrice,
      })
    );
  }

  return (
    <Layout>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <address>
                <strong>Address: </strong>
                <br />
                {serializedCart.shippingAddress?.address}
                <br />
                {serializedCart.shippingAddress?.city}
                <br />
                {serializedCart.shippingAddress?.postalCode}
                <br />
                {serializedCart.shippingAddress?.country}
                <br />
              </address>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment method</h2>
              <strong>Method: </strong>
              {serializedCart.paymentMethod?.method}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {serializedCart.cartItems.length === 0 ? (
                <Message variant="danger">Your serializedCart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {serializedCart.cartItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${serializedCart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${serializedCart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${serializedCart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${serializedCart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error.message}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={serializedCart.cartItems.length === 0}
                  onClick={handlePlaceOrder}
                >
                  Place order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default PlaceOrderScreen;

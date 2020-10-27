import React, { useState, useEffect } from "react";
import { PayPalButton, PaypalOptions } from "react-paypal-button-v2";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { DefaultApiCall, TState } from "../../@types/redux";
import { OrderDetailsState } from "../../@types/redux/order";
import { getOrderDetails, payOrder } from "../../actions/orderActions";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import api from "../../services/api";

// import { Container } from './styles';

const OrderScreen: React.FC = () => {
  const history = useHistory();
  const { id } = useParams() as { id: string };
  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);

  const { order, loading, error } = useSelector<TState, OrderDetailsState>(
    (state) => state.orderDetails
  );

  console.log(order);

  const { loading: payLoading, success: successPay } = useSelector<
    TState,
    DefaultApiCall
  >((state) => state.orderPay);

  order.itemsPrice = order.orderItems.reduce(
    (acumm, item) => acumm + item.price,
    0
  );

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await api.get("/config/paypal");

      const scriptEl = document.createElement("script");

      scriptEl.type = "text/javascript";
      scriptEl.id = "PayPalScript";
      scriptEl.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      scriptEl.async = true;
      scriptEl.onload = () => setSdkReady(true);

      document.body.appendChild(scriptEl);
    };

    if (!order || order._id !== id || successPay) {
      dispatch({ type: "ORDER_PAY_RESET" });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) addPayPalScript();
      else setSdkReady(true);
    }
  }, [order, id, successPay]);

  function handleSuccessPayment(paymentResult: any) {
    console.log(paymentResult);
    dispatch(payOrder(id, paymentResult));
  }

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <>
          <h1>Order {order!._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <address>
                    <strong>Address: </strong>
                    {order.shippingAddress?.address},{" "}
                    {order.shippingAddress?.city},{" "}
                    {order.shippingAddress?.postalCode},{" "}
                    {order.shippingAddress?.country}.
                  </address>
                  {order.isDelivered ? (
                    <Message variant="success">
                      Paid on {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Not delivered</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod?.method}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success"> Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not paid</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <Message variant="danger">Your order is empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item) => (
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
                              <Link to={`/product/${item._id}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x ${item.price} = $
                              {item.qty * item.price}
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
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && (
                    <ListGroup.Item>
                      {payLoading && <Loader />}
                      {!sdkReady ? (
                        <Loader />
                      ) : (
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={handleSuccessPayment}
                        />
                      )}
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Layout>
  );
};

export default OrderScreen;

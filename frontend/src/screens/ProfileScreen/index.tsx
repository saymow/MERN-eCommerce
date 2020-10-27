import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { TState } from "../../@types/redux";
import { OrderlistState } from "../../@types/redux/order";
import { UpdateUser, UserState } from "../../@types/redux/user";
import { listMyOrders } from "../../actions/orderActions";
import { updateUserProfile, userDetails } from "../../actions/userActions";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

type ModifiableFields = "name" | "email" | "password";

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState<null | string>(null);

  const { userInfo, loading, error } = useSelector<TState, UserState>(
    (state) => state.userDetails
  );

  const { loading: ordersLoading, orders, error: ordersError } = useSelector<
    TState,
    OrderlistState
  >((state) => state.orderMyList);

  const { success, error: updateError } = useSelector<
    TState,
    UserState & { success?: boolean }
  >((state) => state.userUpdateProfile);

  useEffect(() => {
    if (!userInfo) {
      dispatch(userDetails());
      dispatch(listMyOrders());
    } else {
      console.log("request");

      setFormData({
        ...formData,
        name: userInfo.name,
        email: userInfo.email,
      });
    }
  }, [userInfo]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword)
      return setMessage("Passwords do not match.");

    const updates = { ...formData, confirmPassword: undefined };

    let modifiedFields = Object.keys(updates).filter(
      (key) => formData[key as ModifiableFields].length !== 0
    );

    let userUpdatedProps: {
      name?: string;
      email?: string;
      password?: string;
    } = {};

    modifiedFields.map((field) => {
      userUpdatedProps[field as ModifiableFields] =
        updates[field as ModifiableFields];
    });

    dispatch(
      updateUserProfile({
        id: userInfo!._id,
        ...userUpdatedProps,
      })
    );
  }

  return (
    <Layout>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {success && <Message variant="success">Profile updated</Message>}
          {(error || message || updateError) && (
            <Message variant="danger">
              {error?.message || message || updateError?.message}
            </Message>
          )}
          {loading && <Loader />}
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

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                value={formData.email}
                onChange={handleInputChange}
                type="email"
                name="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={formData.password}
                onChange={handleInputChange}
                type="password"
                name="password"
                placeholder="Enter password"
              />
            </Form.Group>

            <Form.Group controlId="ConfirmPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={formData.confirmPassword}
                onChange={handleInputChange}
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Register
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>My orders</h2>
          {ordersLoading ? (
            <Loader />
          ) : ordersError ? (
            <Message variant="danger">{ordersError.message}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant="light" className="btn-sm">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Layout>
  );
};

export default ProfileScreen;

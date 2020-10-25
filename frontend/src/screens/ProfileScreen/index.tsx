import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { TState } from "../../@types/redux";
import { UpdateUser, UserState } from "../../@types/redux/user";
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

  const { success, error: updateError } = useSelector<
    TState,
    UserState & { success?: boolean }
  >((state) => state.userUpdateProfile);

  useEffect(() => {
    if (!userInfo) dispatch(userDetails());
    else {
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
        </Col>
      </Row>
    </Layout>
  );
};

export default ProfileScreen;

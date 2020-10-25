import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { TState } from "../../@types/redux";
import { UserState } from "../../@types/redux/user";
import { login, register } from "../../actions/userActions";
import FormContainer from "../../components/FormContainer";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const RegisterScreen: React.FC = () => {
  const location = useLocation();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState<null | string>(null);

  const redirect = new URLSearchParams(location.search).get("redirect");

  const { userInfo, loading, error } = useSelector<TState, UserState>(
    (state) => state.userRegister
  );

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword)
      return setMessage("Passwords do not match.");

    dispatch(register(name, email, password));
  }

  return (
    <Layout>
      <FormContainer>
        <h1>Sign up</h1>
        {(error || message) && (
          <Message variant="danger">{error?.message || message}</Message>
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

        <Row className="py-3">
          <Col>
            Have an account?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </Layout>
  );
};

export default RegisterScreen;

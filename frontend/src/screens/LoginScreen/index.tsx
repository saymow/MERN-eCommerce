import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { TState } from "../../@types/redux";
import { UserState } from "../../@types/redux/user";
import { login } from "../../actions/userActions";
import FormContainer from "../../components/FormContainer";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const LoginScreen: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const redirect = new URLSearchParams(location.search).get("redirect");

  const { userInfo, loading, error } = useSelector<TState, UserState>(
    (state) => state.userLogin
  );

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  console.log(redirect);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch(login(formData.email, formData.password));

    console.log(redirect);

    if (redirect) {
      history.push("/" + redirect);
    }
  }

  return (
    <Layout>
      <FormContainer>
        <h1>Sign in</h1>
        {error && <Message variant="danger">{error.message}</Message>}
        {loading && <Loader />}
        <Form onSubmit={handleSubmit}>
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

          <Button type="submit" variant="primary">
            Sign in
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            New Costumer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </Layout>
  );
};

export default LoginScreen;

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { TState } from "../../@types/redux";
import { UserState, UserUpdateAsAdminState } from "../../@types/redux/user";
import { updateUser, userDetails } from "../../actions/userActions";
import FormContainer from "../../components/FormContainer";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const UserEditScreen: React.FC = () => {
  const { id } = useParams() as { id: string };
  const history = useHistory();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    isAdmin: false,
  });

  const [message, setMessage] = useState<null | string>(null);

  const { userInfo, loading, error } = useSelector<TState, UserState>(
    (state) => state.userDetails
  );

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector<TState, UserUpdateAsAdminState>((state) => state.userUpdate);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: "USER_UPDATE_RESET" });
      history.push("/admin/userlist");
    } else {
      if (!userInfo?.name || userInfo._id !== id) {
        dispatch(userDetails(id));
      } else {
        setFormData({
          name: userInfo.name,
          email: userInfo.email,
          isAdmin: userInfo.isAdmin,
        });
      }
    }
  }, [id, dispatch, userInfo, successUpdate]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    dispatch(
      updateUser(id, {
        name: formData.name,
        email: formData.email,
        isAdmin: formData.isAdmin,
      })
    );
  }

  return (
    <Layout>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && (
          <Message variant="danger">{errorUpdate.message}</Message>
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

            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={formData.isAdmin}
                onChange={(e) =>
                  setFormData({ ...formData, isAdmin: e.target.checked })
                }
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

export default UserEditScreen;

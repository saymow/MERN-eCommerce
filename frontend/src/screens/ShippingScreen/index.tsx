import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { TState } from "../../@types/redux";
import { CartState } from "../../@types/redux/cart";
import { saveShippingAddress } from "../../actions/cartActions";
import CheckoutSteps from "../../components/CheckoutSteps";
import FormContainer from "../../components/FormContainer";
import Layout from "../../components/Layout";

// import { Container } from './styles';

const ShippingScreen: React.FC = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const { shippingAddress } = useSelector<TState, CartState>(
    (state) => state.cart
  );

  const [formData, setFormData] = useState({
    postalCode: shippingAddress ? shippingAddress.postalCode : "",
    address: shippingAddress ? shippingAddress.address : "",
    city: shippingAddress ? shippingAddress.city : "",
    country: shippingAddress ? shippingAddress.country : "",
  });

  async function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch(saveShippingAddress(formData));

    history.push("/payment");
  }

  return (
    <Layout>
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={formData.address}
              onChange={handleInputChange}
              required
              type="text"
              name="address"
              placeholder="Address"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control
              value={formData.city}
              onChange={handleInputChange}
              required
              type="text"
              name="city"
              placeholder="City"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={formData.postalCode}
              onChange={handleInputChange}
              required
              type="text"
              name="postalCode"
              placeholder="Postal code"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={formData.country}
              onChange={handleInputChange}
              required
              type="text"
              name="country"
              placeholder="Country"
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </Layout>
  );
};

export default ShippingScreen;

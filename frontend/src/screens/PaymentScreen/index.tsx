import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { TState } from "../../@types/redux";
import { CartState, PaymentMethods } from "../../@types/redux/cart";
import { savePaymentMethod } from "../../actions/cartActions";
import CheckoutSteps from "../../components/CheckoutSteps";
import FormContainer from "../../components/FormContainer";
import Layout from "../../components/Layout";

// import { Container } from './styles';

const PaymentScreen: React.FC = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const { shippingAddress } = useSelector<TState, CartState>(
    (state) => state.cart
  );

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>("PayPal");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));

    history.push("/placeorder");
  }

  return (
    <Layout>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                label="Paypal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Stripe"
                id="stripe"
                name="paymentMethod"
                value="Stripe"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </Layout>
  );
};

export default PaymentScreen;

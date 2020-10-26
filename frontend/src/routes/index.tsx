import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RestrictedRoute from "../components/RestrictedRoute";
import CartScreen from "../screens/CartScreen";
import Home from "../screens/Home";
import LoginScreen from "../screens/LoginScreen";
import PaymentScreen from "../screens/PaymentScreen";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";
import Product from "../screens/Product";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ShippingScreen from "../screens/ShippingScreen";

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/product/:id" component={Product} />
        <Route path="/cart/:id?" component={CartScreen} />
        <RestrictedRoute
          path="/login"
          component={LoginScreen}
          fallback="/profile"
        />
        <RestrictedRoute
          path="/register"
          component={RegisterScreen}
          fallback="/profile"
        />
        <RestrictedRoute
          path="/profile"
          component={ProfileScreen}
          authenticated
          fallback="/login"
        />
        <RestrictedRoute
          path="/shipping"
          component={ShippingScreen}
          authenticated
          fallback="/login"
        />
        <RestrictedRoute
          path="/payment"
          component={PaymentScreen}
          authenticated
          fallback="/login"
        />
        <RestrictedRoute
          path="/placeorder"
          component={PlaceOrderScreen}
          authenticated
          fallback="/login"
        />
      </Switch>
    </Router>
  );
};

export default Routes;

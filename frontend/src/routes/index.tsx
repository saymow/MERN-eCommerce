import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RestrictedRoute from "../components/RestrictedRoute";
import CartScreen from "../screens/CartScreen";
import Home from "../screens/Home";
import LoginScreen from "../screens/LoginScreen";
import Product from "../screens/Product";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
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
        <Route path="/product/:id" component={Product} />
        <Route path="/cart/:id?" component={CartScreen} />
      </Switch>
    </Router>
  );
};

export default Routes;

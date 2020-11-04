import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RestrictedRoute from "../components/RestrictedRoute";
import CartScreen from "../screens/CartScreen";
import Home from "../screens/Home";
import LoginScreen from "../screens/LoginScreen";
import OrderListScreen from "../screens/OrderListScreen";
import OrderScreen from "../screens/OrderScreen";
import PaymentScreen from "../screens/PaymentScreen";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";
import Product from "../screens/Product";
import ProductEditScreen from "../screens/ProductEditScreen";
import ProductListScreen from "../screens/ProductListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ShippingScreen from "../screens/ShippingScreen";
import UserEditScreen from "../screens/UserEditScreen";
import UserListScreen from "../screens/UserListScreen";

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
        <RestrictedRoute
          path="/order/:id"
          component={OrderScreen}
          authenticated
          fallback="/login"
        />
        <RestrictedRoute
          path="/admin/userlist"
          component={UserListScreen}
          authenticated
          admin
          fallback="/login"
        />
        <RestrictedRoute
          path="/admin/user/:id/edit"
          component={UserEditScreen}
          authenticated
          admin
          fallback="/login"
        />
        <RestrictedRoute
          path="/admin/productlist"
          component={ProductListScreen}
          authenticated
          admin
          fallback="/login"
        />
        <RestrictedRoute
          path="/admin/products/:id/edit"
          component={ProductEditScreen}
          authenticated
          admin
          fallback="/login"
        />
        <RestrictedRoute
          path="/admin/orderlist"
          component={OrderListScreen}
          authenticated
          admin
          fallback="/login"
        />
      </Switch>
    </Router>
  );
};

export default Routes;

import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

import Product from "../screens/Product";
import Home from "../screens/Home";

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/product/:id" component={Product} />
      </Switch>
    </Router>
  );
};

export default Routes;

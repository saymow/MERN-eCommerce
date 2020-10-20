import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

import api from "../../services/api";

import Layout from "../../components/Layout";
import Product from "../../components/Product";

import { ProductType } from "../../@types/cart";

const Home: React.FC = () => {
  const [products, setProducuts] = useState<ProductType[]>([]);

  useEffect(() => {
    api.get("/products").then((response) => {
      setProducuts(response.data);
    });
  }, []);

  return (
    <Layout>
      <h1>Latest products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default Home;

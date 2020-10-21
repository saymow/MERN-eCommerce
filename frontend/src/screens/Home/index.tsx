import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { TState } from "../../@types/redux";
import { ProductListState } from "../../@types/redux/product";
import { listProducts } from "../../actions/productActions";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Product from "../../components/Product";

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const productList = useSelector<TState, ProductListState>(
    (state) => state.productList
  );
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <Layout>
      <h1>Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <Row>
          {products?.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Layout>
  );
};

export default Home;

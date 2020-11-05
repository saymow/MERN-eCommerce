import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { TState } from "../../@types/redux";
import { ProductListState } from "../../@types/redux/product";
import { listProducts } from "../../actions/productActions";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Meta from "../../components/Meta";
import Paginate from "../../components/Paginate";
import Product from "../../components/Product";
import ProductCarousel from "../../components/ProductCarousel";

const Home: React.FC = () => {
  const { keyword, pageNumber = "1" } = useParams() as {
    keyword?: string;
    pageNumber: string;
  };

  const dispatch = useDispatch();

  const productList = useSelector<TState, ProductListState>(
    (state) => state.productList
  );
  const { loading, error, products, page = 1, pages = 1 } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Layout>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go back
        </Link>
      )}
      <h1>Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <>
          <Row>
            {products?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </>
      )}
    </Layout>
  );
};

export default Home;

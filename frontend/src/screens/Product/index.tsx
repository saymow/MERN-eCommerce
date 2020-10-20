import React, { useEffect, useState } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { ProductType } from "../../@types/cart";
import Layout from "../../components/Layout";
import Rating from "../../components/Rating";
import api from "../../services/api";

const Product: React.FC = () => {
  const { id } = useParams() as { id: string };

  const [product, setProduct] = useState<ProductType | undefined>();

  useEffect(() => {
    api.get("/products/" + id).then((response) => {
      setProduct(response.data);
    });
  }, []);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{product.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>${product.price}</ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>Price: </Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status: </Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  disabled={product.countInStock === 0}
                  type="button"
                >
                  Add to cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default Product;

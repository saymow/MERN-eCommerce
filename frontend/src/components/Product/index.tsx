import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ProductType } from "../../@types/cart";

import Rating from "../Rating";

interface ProductProps {
  product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          ></Rating>
        </Card.Text>

        <Card.Text className="py-2" as="h3">
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;

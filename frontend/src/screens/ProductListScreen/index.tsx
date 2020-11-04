import React, { useEffect } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { DefaultApiCall, TState } from "../../@types/redux";
import {
  ProductCreateState,
  ProductListState,
} from "../../@types/redux/product";
import { UserDeletedState, UserListState } from "../../@types/redux/user";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../../actions/productActions";
import { deleteUser, listUsers } from "../../actions/userActions";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const ProductListScreen: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { products, error, loading } = useSelector<TState, ProductListState>(
    (state) => state.productList
  );

  const {
    error: deleteError,
    loading: deleteLoading,
    success: deleteSuccess,
  } = useSelector<TState, any>((state) => state.productDelete);

  const {
    error: createError,
    loading: createLoading,
    success: createSuccess,
    product: createdProduct,
  } = useSelector<TState, ProductCreateState>((state) => state.productCreate);

  useEffect(() => {
    if (createSuccess) {
      dispatch({ type: "PRODUCT_CREATE_RESET" });
      history.push(`/admin/products/${createdProduct?._id}/edit`);
    } else dispatch(listProducts());
  }, [dispatch, deleteSuccess, createSuccess, createdProduct]);

  async function handleDelete(id: string) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteProduct(id));
    }
  }

  async function handleCreateProduct() {
    dispatch(createProduct());
  }

  return (
    <Layout>
      <Row className="align-items-center">
        <Col>
          <h1>Product</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={handleCreateProduct}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {deleteError && <Message variant="danger">{deleteError.message}</Message>}
      {createError && <Message variant="danger">{createError.message}</Message>}
      {deleteLoading && <Loader />}
      {createLoading && <Loader />}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/products/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => handleDelete(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Layout>
  );
};

export default ProductListScreen;

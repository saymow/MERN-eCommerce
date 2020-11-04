import {
  ProductCreateAction,
  ProductDeleteAction,
  ProductListAction,
  ProductUpdateAction,
  SingleProductAction,
} from "../@types/redux/product";
import api from "../services/api";

export const listProducts = () => async (
  dispatch: (arg0: ProductListAction) => void
) => {
  try {
    dispatch({ type: "PRODUCT_LIST_REQUEST" });

    const { data } = await api.get("/products");

    dispatch({
      type: "PRODUCT_LIST_SUCCESS",
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: "PRODUCT_LIST_FAIL",
      payload: {
        message: err.response.data.message
          ? err.response.data.message
          : err.message,
      },
    });
  }
};

export const getSingleProduct = (id: string) => async (
  dispatch: (arg0: SingleProductAction) => void
) => {
  try {
    dispatch({
      type: "SINGLE_PRODUCT_REQUEST",
    });

    const { data } = await api.get(`products/${id}`);

    dispatch({
      type: "SINGLE_PRODUCT_SUCCESS",
      payload: { product: data },
    });
  } catch (err) {
    dispatch({
      type: "SINGLE_PRODUCT_FAIL",
      payload: {
        message: err.response.data.message
          ? err.response.data.message
          : err.message,
      },
    });
  }
};

export const deleteProduct = (id: string) => async (
  dispatch: (arg0: ProductDeleteAction) => void,
  getState: any
) => {
  try {
    dispatch({
      type: "PRODUCT_DELETE_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await api.delete(`products/${id}`, config);

    dispatch({
      type: "PRODUCT_DELETE_SUCCESS",
    });
  } catch (err) {
    dispatch({
      type: "PRODUCT_DELETE_FAIL",
      payload: {
        message: err.response.data.message
          ? err.response.data.message
          : err.message,
      },
    });
  }
};

export const createProduct = () => async (
  dispatch: (arg0: ProductCreateAction) => void,
  getState: any
) => {
  try {
    dispatch({
      type: "PRODUCT_CREATE_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await api.post(`products/`, {}, config);

    dispatch({
      type: "PRODUCT_CREATE_SUCCESS",
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: "PRODUCT_CREATE_FAIL",
      payload: {
        message: err.response.data.message
          ? err.response.data.message
          : err.message,
      },
    });
  }
};

export const updateProduct = (id: string, product: any) => async (
  dispatch: (arg0: ProductUpdateAction) => void,
  getState: any
) => {
  try {
    dispatch({
      type: "PRODUCT_UPDATE_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await api.put(`products/${id}`, product, config);

    dispatch({
      type: "PRODUCT_UPDATE_SUCCESS",
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: "PRODUCT_UPDATE_FAIL",
      payload: {
        message: err.response.data.message
          ? err.response.data.message
          : err.message,
      },
    });
  }
};

import {
  ProductCreateAction,
  ProductCreateReviewAction,
  ProductDeleteAction,
  ProductListAction,
  ProductTopsAction,
  ProductUpdateAction,
  SingleProductAction,
} from "../@types/redux/product";
import api from "../services/api";

export const listProducts = (keyword = "", pageNumber = "") => async (
  dispatch: (arg0: ProductListAction) => void
) => {
  try {
    dispatch({ type: "PRODUCT_LIST_REQUEST" });

    const { data } = await api.get(
      `/products?keyword=${keyword}&pageNumber=${pageNumber}`
    );

    dispatch({
      type: "PRODUCT_LIST_SUCCESS",
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: "PRODUCT_LIST_FAIL",
      payload: {
        message: err.response?.data?.message
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

export const createProductReview = (
  id: string,
  review: { comment: string; rating: number }
) => async (
  dispatch: (arg0: ProductCreateReviewAction) => void,
  getState: any
) => {
  try {
    dispatch({
      type: "PRODUCT_CREATE_REVIEW_REQUEST",
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

    await api.post(`products/${id}/reviews`, review, config);

    dispatch({
      type: "PRODUCT_CREATE_REVIEW_SUCCESS",
    });
  } catch (err) {
    dispatch({
      type: "PRODUCT_CREATE_REVIEW_FAIL",
      payload: {
        message: err.response.data.message
          ? err.response.data.message
          : err.message,
      },
    });
  }
};

export const listTopProducts = () => async (
  dispatch: (arg0: ProductTopsAction) => void
) => {
  try {
    dispatch({ type: "PRODUCT_TOP_REQUEST" });

    const { data } = await api.get("/products/top");

    dispatch({
      type: "PRODUCT_TOP_SUCCESS",
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: "PRODUCT_TOP_FAIL",
      payload: {
        message: err.response?.data?.message
          ? err.response.data.message
          : err.message,
      },
    });
  }
};

import {
  ListMyOrdersAction,
  OrderActions,
  OrderDeliverAction,
  OrderDetailsAction,
  OrderListAction,
  OrderPayActions,
} from "../@types/redux/order";
import api from "../services/api";

export const createOrder = (order) => async (
  dispatch: (arg0: OrderActions) => void,
  getState
) => {
  try {
    dispatch({
      type: "ORDER_CREATE_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await api.post("/orders", order, config);

    dispatch({
      type: "ORDER_CREATE_SUCCESS",
      payload: data,
    });
  } catch (err) {
    console.error(err.response.data);

    dispatch({
      type: "ORDER_CREATE_FAIL",
      payload: { message: err?.response?.data?.message || err.message },
    });
  }
};

export const getOrderDetails = (id: string) => async (
  dispatch: (arg0: OrderDetailsAction) => void,
  getState
) => {
  try {
    dispatch({
      type: "ORDER_DETAILS_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await api.get(`/orders/${id}`, config);

    dispatch({
      type: "ORDER_DETAILS_SUCCESS",
      payload: data,
    });
  } catch (err) {
    console.error(err);

    dispatch({
      type: "ORDER_DETAILS_FAIL",
      payload: { message: err?.response?.data?.message || err.message },
    });
  }
};

export const payOrder = (id: string, paymentResult) => async (
  dispatch: (arg0: OrderPayActions) => void,
  getState
) => {
  try {
    dispatch({
      type: "ORDER_PAY_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await api.put(`/orders/${id}/pay`, paymentResult, config);

    dispatch({
      type: "ORDER_PAY_SUCCESS",
      payload: data,
    });
  } catch (err) {
    console.error(err.response.data);

    dispatch({
      type: "ORDER_PAY_FAIL",
      payload: { message: err?.response?.data?.message || err.message },
    });
  }
};

export const listMyOrders = () => async (
  dispatch: (arg0: ListMyOrdersAction) => void,
  getState
) => {
  try {
    dispatch({
      type: "ORDER_LIST_MY_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    let config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await api.get(`/orders/me`, config);

    dispatch({
      type: "ORDER_LIST_MY_SUCCESS",
      payload: data,
    });
  } catch (err) {
    console.error(err.response.data);

    dispatch({
      type: "ORDER_LIST_MY_FAIL",
      payload: { message: err?.response?.data?.message || err.message },
    });
  }
};

export const listOrders = () => async (
  dispatch: (arg0: OrderListAction) => void,
  getState
) => {
  try {
    dispatch({
      type: "ORDER_LIST_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    let config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await api.get(`/orders/`, config);

    dispatch({
      type: "ORDER_LIST_SUCCESS",
      payload: data,
    });
  } catch (err) {
    console.error(err.response.data);

    dispatch({
      type: "ORDER_LIST_FAIL",
      payload: { message: err?.response?.data?.message || err.message },
    });
  }
};

export const deliveOrder = (id: string) => async (
  dispatch: (arg0: OrderDeliverAction) => void,
  getState
) => {
  try {
    dispatch({
      type: "ORDER_DELIVER_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await api.put(`/orders/${id}/deliver`, {}, config);

    dispatch({
      type: "ORDER_DELIVER_SUCCESS",
      payload: data,
    });
  } catch (err) {
    console.error(err.response.data);

    dispatch({
      type: "ORDER_DELIVER_FAIL",
      payload: { message: err?.response?.data?.message || err.message },
    });
  }
};

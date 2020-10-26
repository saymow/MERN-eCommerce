import { OrderActions } from "../@types/redux/order";
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

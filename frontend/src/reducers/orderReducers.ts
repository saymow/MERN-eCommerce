import { DefaultApiCall } from "../@types/redux";
import {
  OrderActions,
  OrderDetailsState,
  OrderState,
  OrderDetailsAction,
  OrderPayActions,
  OrderlistState,
  ListMyOrdersAction,
} from "../@types/redux/order";

export const orderCreateReducer = (
  state: OrderState = {},
  action: OrderActions
) => {
  switch (action.type) {
    case "ORDER_CREATE_REQUEST":
      return {
        loading: true,
      };

    case "ORDER_CREATE_SUCCESS":
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case "ORDER_CREATE_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderDatailsReducer = (
  state: OrderDetailsState = {
    loading: true,
    order: { orderItems: [], shippingAddress: {} },
  },
  action: OrderDetailsAction
): OrderDetailsState => {
  switch (action.type) {
    case "ORDER_DETAILS_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "ORDER_DETAILS_SUCCESS":
      return {
        loading: false,
        order: action.payload,
      };

    case "ORDER_DETAILS_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (
  state: DefaultApiCall & { success?: boolean } = {},
  action: OrderPayActions
): DefaultApiCall & { success?: boolean } => {
  switch (action.type) {
    case "ORDER_PAY_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "ORDER_PAY_SUCCESS":
      return {
        loading: false,
        success: true,
      };

    case "ORDER_PAY_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "ORDER_PAY_RESET":
      return {};
    default:
      return state;
  }
};

export const orderMyListReducer = (
  state: OrderlistState & { success?: boolean } = { orders: [] },
  action: ListMyOrdersAction
): OrderlistState & { success?: boolean } => {
  switch (action.type) {
    case "ORDER_LIST_MY_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "ORDER_LIST_MY_SUCCESS":
      const orders = action.payload;

      return {
        orders,
        loading: false,
        success: true,
      };

    case "ORDER_LIST_MY_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "ORDER_LIST_MY_RESET": {
      return { orders: [] };
    }

    default:
      return state;
  }
};

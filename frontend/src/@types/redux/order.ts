import { ApiError, DefaultApiCall } from ".";

export interface OrderState extends DefaultApiCall {
  success?: boolean;
  order?: any;
}

export type OrderActions =
  | {
      type: "ORDER_CREATE_REQUEST";
    }
  | {
      type: "ORDER_CREATE_SUCCESS";
      payload: any;
    }
  | {
      type: "ORDER_CREATE_FAIL";
      payload: ApiError;
    };

export interface OrderDetailsState extends DefaultApiCall {
  order: any;
}

export type OrderDetailsAction =
  | {
      type: "ORDER_DETAILS_REQUEST";
    }
  | {
      type: "ORDER_DETAILS_SUCCESS";
      payload: any;
    }
  | {
      type: "ORDER_DETAILS_FAIL";
      payload: ApiError;
    };

export interface OrderlistState extends DefaultApiCall {
  orders: any[];
}

export type OrderPayActions =
  | {
      type: "ORDER_PAY_REQUEST";
    }
  | {
      type: "ORDER_PAY_SUCCESS";
      payload: any;
    }
  | {
      type: "ORDER_PAY_FAIL";
      payload: ApiError;
    }
  | {
      type: "ORDER_PAY_RESET";
    };

export type ListMyOrdersAction =
  | {
      type: "ORDER_LIST_MY_REQUEST";
    }
  | {
      type: "ORDER_LIST_MY_SUCCESS";
      payload: any;
    }
  | {
      type: "ORDER_LIST_MY_FAIL";
      payload: ApiError;
    }
  | { type: "ORDER_LIST_MY_RESET" };

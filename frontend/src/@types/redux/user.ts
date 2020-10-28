import { ApiError, DefaultApiCall } from ".";

export interface User {
  _id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  token: string;
}

export interface UpdateUser {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

export type UserLoginAction =
  | { type: "USER_LOGIN_REQUEST" }
  | {
      type: "USER_LOGIN_SUCCESS";
      payload: User;
    }
  | { type: "USER_LOGIN_FAIL"; payload: ApiError }
  | { type: "USER_LOGOUT" };

export type UserDetailsAction =
  | { type: "USER_DETAILS_REQUEST" }
  | {
      type: "USER_DETAILS_SUCCESS";
      payload: User;
    }
  | { type: "USER_DETAILS_FAIL"; payload: ApiError }
  | { type: "USER_DETAILS_RESET" };

export type UserRegisterAction =
  | { type: "USER_REGISTER_REQUEST" }
  | {
      type: "USER_REGISTER_SUCCESS";
      payload: User;
    }
  | { type: "USER_REGISTER_FAIL"; payload: ApiError };

export type UserUpdateAction =
  | { type: "USER_UPDATE_PROFILE_REQUEST" }
  | {
      type: "USER_UPDATE_PROFILE_SUCCESS";
      payload: User;
    }
  | { type: "USER_UPDATE_PROFILE_FAIL"; payload: ApiError }
  | { type: "USER_UPDATE_PROFILE_RESET" };

export type UserlistAction =
  | { type: "USER_LIST_REQUEST" }
  | {
      type: "USER_LIST_SUCCESS";
      payload: User[];
    }
  | { type: "USER_LIST_FAIL"; payload: ApiError }
  | { type: "USER_LIST_RESET" };

export type UserDeleteAction =
  | { type: "USER_DELETE_REQUEST" }
  | {
      type: "USER_DELETE_SUCCESS";
    }
  | { type: "USER_DELETE_FAIL"; payload: ApiError };

export type UserUpdateAsAdminAction =
  | { type: "USER_UPDATE_REQUEST" }
  | {
      type: "USER_UPDATE_SUCCESS";
      payload: User;
    }
  | { type: "USER_UPDATE_FAIL"; payload: ApiError }
  | { type: "USER_UPDATE_RESET" };

export interface UserState extends DefaultApiCall {
  userInfo?: User;
}

export interface UserDeletedState extends DefaultApiCall {
  success?: boolean;
}

export interface UserUpdateAsAdminState extends DefaultApiCall {
  success?: boolean;
}

export interface UserListState extends DefaultApiCall {
  users: User[];
}

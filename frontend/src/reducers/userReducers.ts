import {
  UserDetailsAction,
  UserLoginAction,
  UserRegisterAction,
  UserState,
  UserUpdateAction,
} from "../@types/redux/user";

export const userLoginReducer = (
  state: UserState = {},
  action: UserLoginAction
): UserState => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { ...state, loading: true };
    case "USER_LOGIN_SUCCESS":
      const { _id, name, email, isAdmin, token } = action.payload;
      return {
        ...state,
        loading: false,
        userInfo: { _id, name, email, isAdmin, token },
      };
    case "USER_LOGIN_FAIL":
      const { message } = action.payload;

      return {
        loading: false,
        error: {
          message,
        },
      };
    case "USER_LOGOUT":
      return { loading: false };

    default:
      return state;
  }
};

export const userRegisterReducer = (
  state: UserState = {},
  action: UserRegisterAction
): UserState => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { ...state, loading: true };
    case "USER_REGISTER_SUCCESS":
      const { _id, name, email, isAdmin, token } = action.payload;
      return {
        ...state,
        loading: false,
        userInfo: { _id, name, email, isAdmin, token },
      };
    case "USER_REGISTER_FAIL":
      const { message } = action.payload;

      return {
        loading: false,
        error: {
          message,
        },
      };

    default:
      return state;
  }
};

export const userDetailsReducer = (
  state: UserState = {},
  action: UserDetailsAction
): UserState => {
  switch (action.type) {
    case "USER_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "USER_DETAILS_SUCCESS":
      const { _id, name, email, isAdmin, token } = action.payload;
      return {
        ...state,
        loading: false,
        userInfo: { _id, name, email, isAdmin, token },
      };
    case "USER_DETAILS_FAIL":
      const { message } = action.payload;

      return {
        loading: false,
        error: {
          message,
        },
      };

    default:
      return state;
  }
};
export const userUpdateProfileReducer = (
  state: UserState & { success?: boolean } = {},
  action: UserUpdateAction
): UserState & { success?: boolean } => {
  switch (action.type) {
    case "USER_UPDATE_PROFILE_REQUEST":
      return { loading: true };
    case "USER_UPDATE_PROFILE_SUCCESS":
      const { _id, name, email, isAdmin, token } = action.payload;
      return {
        ...state,
        success: true,
        loading: false,
        userInfo: { _id, name, email, isAdmin, token },
      };
    case "USER_UPDATE_PROFILE_FAIL":
      const { message } = action.payload;

      return {
        loading: false,
        error: {
          message,
        },
      };
    case "USER_UPDATE_PROFILE_RESET":
      return {};

    default:
      return state;
  }
};

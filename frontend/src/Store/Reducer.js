import { AUTHENTICATE, LOGOUT } from "./ActionTypes";

const initialState = {
  user: null,
};

const reducer = (state = initialState, action) => {
  console.log("reduceerrrr", action);
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
export default reducer;

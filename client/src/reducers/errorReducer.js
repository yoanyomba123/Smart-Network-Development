import { GET_ERRORS } from "../actions/types";
var initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.errors;
    default:
      return state;
  }
}

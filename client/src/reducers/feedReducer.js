import { LOAD_FEED } from "../actions/types";

var initialState = {};

export default function(state = initialState, action) {
  console.log("ACTION +" + action.payload);
  switch (action.type) {
    case LOAD_FEED:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}

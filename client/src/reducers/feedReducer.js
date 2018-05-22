import { LOAD_FEED } from "../actions/types";

var initialState = {};

export default function(state = initialState, action) {
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

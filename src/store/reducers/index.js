// Root Reducer

import { combineReducers } from "redux";
import authUserReducer from "./authUser";
import candidateReducer from "./candidateReducer";
import checkoutReducer from "./checkoutReducer";
import builderReducer from "./builderReducer"
export let rootReducer = combineReducers({
  authUser: authUserReducer,
  candidate:candidateReducer,
  checkout:checkoutReducer,
  builder:builderReducer,
});

export default rootReducer;

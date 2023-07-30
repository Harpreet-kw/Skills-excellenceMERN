import { createStore, applyMiddleware, combineReducers  } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from '../redux/rootReducer';
import voucherReducer from "./voucherReducer";

// BINDING MIDDLEWARE
const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};


const reducer = combineReducers({
  rootReducer : rootReducer,
  vouchers: voucherReducer
})
// applyMiddleware supercharges createStore with middleware:
const store = createStore(reducer, bindMiddleware([thunkMiddleware]))

export default store;
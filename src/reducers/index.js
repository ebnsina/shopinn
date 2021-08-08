import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { codReducer } from "./codReducer";
import { couponReducer } from "./couponReducer";
import { drawerReducer } from "./drawerReducer";
import { searchReducer } from "./searchReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  coupon: couponReducer,
  cod: codReducer,
});

export default rootReducer;

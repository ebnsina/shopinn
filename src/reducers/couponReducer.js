let initialState = false;

export function couponReducer(state = initialState, action) {
  switch (action.type) {
    case "COUPON_APPLIED":
      return action.payload;

    default:
      return state;
  }
}

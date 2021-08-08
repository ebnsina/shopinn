let initialState = false;

export function codReducer(state = initialState, action) {
  switch (action.type) {
    case "COD":
      return action.payload;

    default:
      return state;
  }
}

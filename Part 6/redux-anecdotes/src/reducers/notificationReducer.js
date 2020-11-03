const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return state.concat(action.data);
    default:
      return state;
  }
}

export default notificationReducer
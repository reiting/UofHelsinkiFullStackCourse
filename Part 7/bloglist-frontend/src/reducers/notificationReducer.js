const initialState = { message: '' }

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      clearTimeout(state.delay);
      return action.data.message;
    case 'REMOVE_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
}

export const setNotificationMessage = (message, delay) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: {
        message,
        delay: setTimeout(() => {
          dispatch(removeNotificationMessage(''));
        }, delay * 1000),
      }
    })
  }
}

export const removeNotificationMessage = message => {
  return {
    type: 'REMOVE_NOTIFICATION',
  }
}

export default notificationReducer

const initialState = {message: '' }

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.data.message;
    case 'REMOVE_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
}

export const setNotificationMessage = message => {
  console.log('mesage', message)
  return {
    type: 'NEW_NOTIFICATION',
    data: { message },
  }
}

export const removeNotificationMessage = message => {
  return {
    type: 'REMOVE_NOTIFICATION',
  }
}

export default notificationReducer
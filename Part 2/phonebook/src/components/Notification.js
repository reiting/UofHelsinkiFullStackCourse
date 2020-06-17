import React from 'react';

const Notification = ({ message, hasError = false }) => {
    const nameOfClass = hasError ? 'error-message' : 'success-message';

    if (message === null) {
      return null
    }
  
    return (
      <div className={nameOfClass}>
        {message}
      </div>
    )
  }

  export default Notification;
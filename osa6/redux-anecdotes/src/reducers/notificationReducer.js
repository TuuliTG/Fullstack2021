const notificationMessageAtStart = 'Welcome to anecdote app!'

const initialState = notificationMessageAtStart

const notificationReducer = (state = initialState, action) => {
    console.log('Notification: action:', action)
    switch (action.type) {
        case 'SET_MESSAGE':
          state = action.message
          return state
        case 'RESET_MESSAGE':
          const text = ''
          state = text
          return state
        default:
          return state
    }
}

export const changeNotification = text => {
    return {
        type: 'SET_MESSAGE',
        message: text
    }
}

export const resetNotification = () => {
    return {
        type: 'RESET_MESSAGE'
    }
}

export default notificationReducer
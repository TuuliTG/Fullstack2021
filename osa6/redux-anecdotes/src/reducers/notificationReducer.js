const notificationMessageAtStart = 'Welcome to anecdote app!'

const initialState = notificationMessageAtStart

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
          state = action.message
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

export default notificationReducer
const notificationMessageAtStart = 'Welcome to anecdote app!'

const initialState = {
    message: notificationMessageAtStart,
    timeOutId: ""
}

const notificationReducer = (state = initialState, action) => {
    console.log('Notification: action:', action)
    switch (action.type) {
        case 'SET_MESSAGE':
          state = {
              ...state,
              message: action.message
          }
          return state
        case 'RESET_MESSAGE':
          state = {
              ...state,
              message: ''
          }
          return state
        case 'SET_TIMEOUT_ID':
            state = {
                ...state,
                timeOutId: action.id
            }
            return state
        default:
          return state
    }
}

export const changeNotification = (text, timeInSeconds, previousTimeOut) => {
    return async dispatch => {
        dispatch({
            type: 'SET_MESSAGE',
            message: text
        })
        clearTimeout(previousTimeOut)
        let timeOutId = setTimeout(() => {
          dispatch({
            type: 'RESET_MESSAGE'
          })
        }, timeInSeconds*1000)
        dispatch({
            type: 'SET_TIMEOUT_ID',
            id: timeOutId
        })
    }
}

export default notificationReducer
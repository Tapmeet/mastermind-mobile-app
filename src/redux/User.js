export const LOGGED_IN_USER = 'LOGGED_IN_USER'
export const LOGGED_OUT_USER = 'LOGGED_OUT_USER'

const initialState = []

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN_USER:
      return [...state, action.payload]
    case LOGGED_OUT_USER:
      return state.filter(userInfo => userInfo.id !== action.payload.id)
  }
  return state
 
}

export default userDataReducer
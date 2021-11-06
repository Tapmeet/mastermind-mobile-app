export const ADD_TO_EVENT = 'ADD_TO_EVENT'
export const UPDATE_EVENT = 'UPDATE_EVENT'
export const EMPTY_EVENT = 'EMPTY_EVENT'
const initialState = [];
const eventReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_EVENT:
      return [...state, action.payload]
    case UPDATE_EVENT:
      return action.payload
    case EMPTY_EVENT:
      return []
  }
  return state
}

export default eventReducer
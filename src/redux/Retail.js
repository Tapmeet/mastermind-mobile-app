export const ADD_TO_CART = 'ADD_TO_CART'
export const UPDATE_CART = 'UPDATE_CART'
export const EMPTY_CART = 'EMPTY_CART'
const initialState = [];
const cartItemsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload]
    case UPDATE_CART:
      return action.payload
    case EMPTY_CART:
      return []
  }
  return state
}

export default cartItemsReducer
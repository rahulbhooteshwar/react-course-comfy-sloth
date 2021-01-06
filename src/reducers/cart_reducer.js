import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case ADD_TO_CART:
      const { id, color, amount, product } = payload
      const tempItem = state.cart.find((i) => i.id === id + color)
      if (tempItem) {
        const tempCart = state.cart.map(cartItem => {
          if (tempItem.id === cartItem.id) {
            let newAmount = cartItem.amount + amount
            newAmount = newAmount <= cartItem.max ? newAmount : cartItem.max
            return { ...cartItem, amount: newAmount }
          } else {
            return cartItem
          }
        })
        return { ...state, cart: tempCart }
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
          color,
          amount,
        }
        return { ...state, cart: [...state.cart, newItem] }
      }
    case REMOVE_CART_ITEM:
      const filtered = state.cart.filter(item => item.id !== payload.id)
      return { ...state, cart: filtered }
    case CLEAR_CART:
      return { ...state, cart: [] }
    case TOGGLE_CART_ITEM_AMOUNT:
      const tempCart = state.cart.map(cartItem => {
        if (payload.id === cartItem.id) {
          let newAmount = payload.amount
          newAmount = newAmount <= cartItem.max ? newAmount : cartItem.max
          return { ...cartItem, amount: newAmount }
        } else {
          return cartItem
        }
      })
      return { ...state, cart: tempCart }
    case COUNT_CART_TOTALS:
      let totalItems = 0
      let totalPrice = 0
      state.cart.forEach(item => {
        totalItems += item.amount
        totalPrice += item.price * item.amount
      })
      return { ...state, total_price: totalPrice, total_items: totalItems }
    default:
      throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default cart_reducer

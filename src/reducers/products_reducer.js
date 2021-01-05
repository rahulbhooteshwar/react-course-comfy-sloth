import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const products_reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_PRODUCTS_BEGIN:
      return { ...state, products_loading: true, products_error: false }
    case GET_PRODUCTS_SUCCESS:
      const products = payload
      const featured_products = products.filter(product => product.featured)
      return { ...state, products, featured_products, products_loading: false }
    case GET_PRODUCTS_ERROR:
      return { ...state, products_loading: false, products_error: true }
    case GET_SINGLE_PRODUCT_BEGIN:
      return { ...state, single_product_loading: true, single_product_error: false }
    case GET_SINGLE_PRODUCT_SUCCESS:
      return { ...state, single_product_loading: false, single_product: payload}
    case GET_SINGLE_PRODUCT_ERROR:
      return { ...state, single_product_loading: false, single_product_error: true}
    default:
      throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default products_reducer

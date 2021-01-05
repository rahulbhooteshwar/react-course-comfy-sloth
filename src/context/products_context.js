import axios from 'axios'
import React, { useCallback, useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url, single_product_url as productUrl } from '../utils/constants'
import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {}
}

const ProductsContext = React.createContext()
export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const fetchProducts = async () => {
    dispatch({ type: GET_PRODUCTS_BEGIN })
    try {
      const { data } = await axios.get(url)
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data })
    } catch (e) {
      dispatch({ type: GET_PRODUCTS_ERROR })
    }
  }
  const fetchSingleProduct = useCallback(async (id) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      const { data } = await axios(`${productUrl}${id}`)
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: data })
    } catch (e) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }, [])
  useEffect(() => {
    fetchProducts()
  }, [])
  return (
    <ProductsContext.Provider value={{ ...state, fetchSingleProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ProductsProvider } from './context/products_context'
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context'
import { GlobalProvider } from './context/global_context'

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root'))

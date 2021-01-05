import React from 'react'
import { useFilterContext } from '../context/filter_context'
import { useProductsContext } from '../context/products_context'
import GridView from './GridView'
import ListView from './ListView'
import Loading from './Loading'
const ProductList = () => {
  const {products_loading} = useProductsContext()
  const { filtered_products: products, grid_view } = useFilterContext()
  if (products_loading) {
    return <Loading/>
  }
  if (!products_loading && products.length < 1) {
    return <h5>Sorry, no products matched your search...</h5>
  }
  if (grid_view) {
    return <GridView products={products} />
  } else {
    return <ListView products={products} />
  }
}

export default ProductList

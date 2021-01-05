import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS
} from '../actions'

const filter_reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case LOAD_PRODUCTS:
      const prices = payload.map(p => p.price)
      const max_price = Math.max(...prices)
      return {
        ...state,
        all_products: [...payload],
        filtered_products: [...payload],
        filters: { ...state.filters, max_price, price: max_price }
      }
    case CLEAR_FILTERS:
      const initFilters = {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        // free shipping
        shipping: false
      }
      return { ...state, filtered_products: [...state.all_products], filters: initFilters }
    case SET_GRIDVIEW:
      return { ...state, grid_view: true }
    case SET_LISTVIEW:
      return { ...state, grid_view: false }
    case UPDATE_FILTERS:
      return { ...state, filters: { ...state.filters, ...payload } }
    case FILTER_PRODUCTS:
      const { all_products, filters } = state
      let filtered = [...all_products]
      filtered = filtered.filter(({ company, category, price, name, shipping, colors }) => {
        const forCompany = ['all', company].includes(filters.company) ? true : false
        const forCategory = ['all', category].includes(filters.category) ? true : false
        const forColor = ['all', ...colors].includes(filters.color)
        const forPrice = price <= filters.price
        const forText = !filters.text.trim() || name.includes(filters.text.trim())
        const forShipping = (filters.shipping && shipping) || !filters.shipping
        return forCompany && forCategory && forPrice && forColor && forShipping && forText
      })
      return { ...state, filtered_products: filtered }
    case UPDATE_SORT:
      return { ...state, sort: payload }
    case SORT_PRODUCTS:
      const { sort, filtered_products } = state
      let tempProducts = [...filtered_products]
      if (sort === 'price-lowest') {
        tempProducts.sort((a, b) => a.price - b.price)
      } else if (sort === 'price-highest') {
        tempProducts.sort((a, b) => b.price - a.price)
      } else if (sort === 'name-a') {
        tempProducts.sort((a, b) => a.name.localeCompare(b.name))
      } else {
        tempProducts.sort((a, b) => b.name.localeCompare(a.name))
      }
      return { ...state, filtered_products: tempProducts }
    default:
      throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default filter_reducer

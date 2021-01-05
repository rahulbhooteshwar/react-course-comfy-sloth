import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'
import { useProductsContext } from '../context/products_context'

const Filters = () => {
  const { products_loading: loading } = useProductsContext()
  const {
    all_products,
    filters: {
      text,
      category,
      company,
      color,
      min_price,
      price,
      max_price,
      shipping
    },
    updateFilters,
    clearFilters
  } = useFilterContext()
  const categories = getUniqueValues(all_products, 'category')
  const companies = getUniqueValues(all_products, 'company')
  const colors = getUniqueValues(all_products, 'colors', true)
  return <Wrapper>
    <div className="content">
      {
        !loading && <form onSubmit={e => e.preventDefault()}>
          {/* search input */}
          <div className="form-control">
            <input type="text" name="text" placeholder="search"
              autoComplete="off"
              className="search-input"
              value={text}
              onChange={(e) => updateFilters('text', e.target.value.toLowerCase())}
            />
          </div>
          {/* categories */}
          <div className="form-control">
            <h5>Category</h5>
            <div>
              {
                categories.map((c, index) => {
                  return <button
                    className={`${c === category ? 'active' : ''}`}
                    key={index}
                    onClick={() => updateFilters('category', c)}
                  >
                    {c}
                  </button>
                })
              }
            </div>
          </div>
          {/* Companies */}
          <div className="form-control">
            <label htmlFor="company">
              <h5>Company</h5>
            </label>
            <select name="company" id="company" className="company"
              value={company}
              onChange={({ target: { value } }) => updateFilters('company', value)}
            >
              {
                companies.map((c, index) => {
                  return <option key={index} value={c}>{c}</option>
                })
              }
            </select>
          </div>
          {/* colors */}
          <div className="form-control">
            <h5>Color</h5>
            <div className="colors">
              {
                colors.map((c, index) => {
                  return <button key={index}
                    className={`${c === 'all' ? "all-btn" : "color-btn"} ${color === c ? 'active' : ''}`}
                    style={{ backgroundColor: c === 'all' ? 'transparent' : c }}
                    onClick={() => updateFilters('color', c)}
                  >
                    {c === 'all' ? c : (c === color ? <FaCheck /> : null)}
                  </button>
                })
              }
            </div>
          </div>
          {/* price range */}
          <div className="form-control">
            <label htmlFor="price">
              <h5>Price</h5>
            </label>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              id="price"
              value={price}
              min={min_price}
              max={max_price}
              onChange={e => updateFilters('price', Number(e.target.value))}
            />
          </div>
          {/* shipping */}
          <div className="form-control shipping">
            <input type="checkbox" name="shipping" id="shipping"
              onChange={() => updateFilters('shipping', !shipping)}
              checked={shipping} /> Free Shipping
          </div>
          <button onClick={clearFilters} className="clear-btn">Clear Filters</button>
        </form>
      }

    </div>
  </Wrapper >
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
    :focus{
      outline:0
    }
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
    text-transform: capitalize;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    :focus {
      outline: 0
    }
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters

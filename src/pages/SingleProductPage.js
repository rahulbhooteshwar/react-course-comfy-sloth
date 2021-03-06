import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SingleProductPage = () => {
  const { id } = useParams()
  const {
    fetchSingleProduct,
    single_product: product,
    single_product_loading: loading,
    single_product_error: error } = useProductsContext()
  useEffect(() => {
    fetchSingleProduct(id)
  }, [fetchSingleProduct, id])
  if (loading) {
    return <Loading />
  } else if (error) {
    return <Error />
  }
  const {
    name,
    price,
    images,
    description,
    stock,
    stars,
    reviews,
    id: sku,
    company
  } = product
  return <Wrapper>
    <PageHero title={name} extraChild={<Link to='/products'>Products</Link>} />
    <div className="section section-center page">
      <Link to="/products" className="btn">
        Back to Products
      </Link>
      <div className="product-center">
        {images && <ProductImages images={images}/>}
        <section className="content">
          <h2>{name}</h2>
          {stars && <Stars {...{stars, reviews}}/>}
          <h5 className='price'>{formatPrice(price)}</h5>
          <div className="desc">{description}</div>
          <p className="info">
            <span>Available : </span>
            {stock > 0 ? `In Stock (${stock} left)` : 'Out of Stock'}
          </p>
          <p className="info">
            <span>SKU : </span>
            {sku}
          </p>
          <p className="info">
            <span>Brand : </span>
            {company}
          </p>
          <hr />
          {stock > 0 ? <AddToCart product={product}/>: null}
        </section>
      </div>
    </div>
  </Wrapper>
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage

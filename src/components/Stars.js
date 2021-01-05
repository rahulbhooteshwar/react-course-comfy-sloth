import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
const Stars = ({ stars, reviews }) => {
  const starArray = new Array(Math.floor(stars)).fill(1)
  if (stars - Math.floor(stars) > 0) {
    starArray.push(stars - Math.floor(stars))
  }
  return <Wrapper>
    <div className="stars">
      {stars} &nbsp;
      {
        starArray.map((star, index) => {
          return <span key={index}>
            {
              star === 1
                ? <BsStarFill />
                : star >= 0.5
                  ? <BsStarHalf />
                  : <BsStar />
            }
          </span>
        })
      }
    </div>
    <div className="reviews">
      ({reviews} customer reviews)
    </div>
  </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars

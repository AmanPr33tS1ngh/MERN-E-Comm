import React from 'react'

const Ratings = (rating) => {
  return (
    <div className='rating'>
      <span>
        <i
        className={rating.rating >= 1 ? 'fa fa-star checked' : rating.rating >= 0.5 ? 'fa fa-star-half-full checked' : 'fa fa-star  checked'}
           />
      </span>
      <span>
        <i
          className={rating.rating >= 2 ? 'fa fa-star checked' : rating.rating >= 1.5 ? 'fa fa-star-half-full checked' : 'fa fa-star checked'} />
      </span>
      <span>
        <i
          className={rating.rating >= 3 ? 'fa fa-star checked' : rating.rating >= 2.5 ? 'fa fa-star-half-full checked' : 'fa fa-star checked'} />
      </span>
      <span>
        <i
          className={rating.rating >= 4 ? 'fa fa-star checked' : rating.rating >= 3.5 ? 'fa fa-star-half-full checked' : 'fa fa-star checked'} />
      </span>
      <span>
        <i
          className={rating.rating >= 5 ? 'fa fa-star checked' : rating.rating >= 4.5 ? 'fa fa-star-half-full checked' : 'fa fa-star checked'} />
      </span>
      <span>  <strong>{rating.numReviews}</strong> reviews </span>
    </div>
  )
}

export default Ratings

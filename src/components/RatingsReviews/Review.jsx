import React from "react"
import moment from "moment"

export default function Review(props) {
  console.log(props.review)

  const check = <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="black" className="bi bi-check2" viewBox="0 0 16 16">
  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
</svg>

  return (
    <div className='review'>
      <div className='reviewTop'>
        <div className="reviewStars">
          {props.starRating(props.review.rating)}
        </div>
        <div className="reviewAuthor">
          {props.review.reviewer_name} - {moment(props.review.date).format('MMMM D, YYYY')}
        </div>
      </div>
      <div className="reviewTitle">
        {props.review.summary}
      </div>
      <div className="reviewBody">
        {props.review.body}
      </div>
      <div className="reviewRecommended">
        {props.review.recommend && check} {props.review.recommend ? `I recommend this product` : ''}
      </div>
      <div className='reviewDivider'></div>
    </div>
  )
}
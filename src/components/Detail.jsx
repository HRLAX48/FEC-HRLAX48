import React from "react"
import Overview from "./Overview"
import RatingsAndReviews from "./RatingsReviews"
import RelatedItems from "./RelatedItems"
import axios from "axios"
import Options from "../config"
import QuestionsAnswers from "./QuestionsAnswers"

export default function Detail(props) {
  const [rating, setRating] = React.useState(5)
  const [reviews, setReviews] = React.useState([])

  React.useEffect(() => {
    axios.get(`${Options.URL}/reviews/?product_id=${props.selected.id}&count=999`, {
      headers: {
        Authorization: Options.TOKEN
      }
    })
      .then(res => {
        setReviews(res.data.results)
        function roundQuarter(num) {
          return Math.round(num*4)/4
        }
        let average = 0;
        for (let i = 0; i < res.data.results.length; i++) {
          average += res.data.results[i].rating
        }
        average = average / res.data.results.length
        setRating(roundQuarter(average))
      })
  }, [props.selected])

  return (
    <div>
      <Overview
        selected={props.selected}
        rating={rating}
        reviews={reviews}
      />
      <RelatedItems
        products={props.products}
        selected ={props.selected}
        setSaved={props.setSaved}
        outfits={props.outfits}
      />
      <QuestionsAnswers
        selected={props.selected}
      />
      <RatingsAndReviews
        selected={props.selected}
        rating={rating}
        reviews={reviews}
      />
    </div>
  )
}
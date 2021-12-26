import React from "react"
import moment from "moment"
import axios from "axios"
import Options from "../../config"
import Answer from "./Answer"

export default function QAElement(props) {

  const [marked, setMarked] = React.useState(false)
  const [helpful, setHelpful] = React.useState(props.element.question_helpfulness)
  const [numAnswers, setNumAnswers] = React.useState(2)
  const [expandedAnswers, setExpandedAnswers] = React.useState(false)

  let answers = []
  for (let key in props.element.answers) {
    answers.push(props.element.answers[key])
  }

  function sellerCompare(a, b) {
    if (a.answerer_name === 'Seller' && b.answerer_name === 'Seller') {
      return 0
    }
    if (a.answerer_name === 'Seller' && b.answerer_name !== 'Seller') {
      return -1
    }
    if (a.answerer_name !== 'Seller' && b.answerer_name === 'Seller') {
      return 1
    }
  }

  answers = answers.sort((a, b) => b.helpfulness - a.helpfulness).sort(sellerCompare)

  function markHelpful() {
    if (!marked) {
      axios.put(`${Options.URL}/qa/questions/${props.element.question_id}/helpful`, null, {
        headers: {
          Authorization: Options.TOKEN
        }
      })
        .then(() => {
          setMarked(true)
          setHelpful(helpful + 1)
        })
    }
  }

  function reportQuestion() {
    axios.put(`${Options.URL}/qa/questions/${props.element.question_id}/report`, null, {
      headers: {
        Authorization: Options.TOKEN
      }
    })
      .then(() => {
        props.refresh()
        alert('Thank you for your report. You shouldn\'t see this question anymore')
      })
  }

  function imageModal(imageURL) {
    // Doesnt do anything yet because we don't actually have images in reviews...
  }

  function toggleAnswers() {
    if (expandedAnswers) {
      setNumAnswers(2)
    } else {
      setNumAnswers(999)
    }
    setExpandedAnswers(!expandedAnswers)
  }

  return (
    <div>
      <div className="questionBody d-flex align-items-end">
        <div className="qaLeft">
          <b>Q:</b>
        </div>
        <div className="me-auto mw-75">
          <b>{props.element.question_body}</b>
        </div>
        <div className="d-flex align-items-center reviewHelpful pt-3">
          <div>
            Helpful?
          </div>
          <div className="cP reviewBodyShowMore ps-2 pe-1" onClick={markHelpful}>
            Yes
          </div>
          <div>
            ({helpful})
          </div>
          <div className="px-2">
            |
          </div>
          <div className="cP reviewBodyShowMore" onClick={() => {}}>
            Add Answer
          </div>
        </div>
      </div>
      <div className="questionAnswers d-flex mt-2">
        <div className="qaLeft">
          <b>A:</b>
        </div>
        <div className="mw-75 answerColumn">
          {answers.slice(0, numAnswers).map(answer => (
            <Answer answer={answer} key={answer.id} refresh={props.refresh}/>
          ))}
        </div>
      </div>
      {answers.length > 2 &&
      <>
      <div className="d-flex">
        <div className="qaLeft"></div>
        <div onClick={toggleAnswers} className="cP reviewBodyShowMore mt-0">
          {numAnswers === 2 ? 'See More Answers' : 'Collapse Answers'}
        </div>
      </div>
      </>
      }
    </div>
  )
}
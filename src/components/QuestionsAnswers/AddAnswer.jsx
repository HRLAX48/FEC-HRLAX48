import React from "react";
import axios from "axios";
import Options from "../../config";

export default function AddAnswer(props) {

  const [question, setQuestion] = React.useState(props.question)
  const [answer, setAnswer] = React.useState('')
  const [nickname, setNickname] = React.useState('')
  const [email, setEmail] = React.useState('')

  function handleSubmit() {
    let error = ['Errors:']
    if (!nickname) {
      error.push('Nickname Missing')
    }
    if (!email.includes('@')) {
      error.push('Invalid Email Format')
    }
    if (error.length !== 1) {
      alert(error.join('\n'))
    } else {
      axios.post(`${Options.URL}/qa/questions/${props.question.question_id}/answers`, {
        body: answer,
        name: nickname,
        email: email,
        photos: []
      },
      {
        headers: {
          Authorization: Options.TOKEN
        }
      })
      .then(() => alert('Answer Submitted!'))
      .then(() => props.setShowModal(false))
      .then(() => props.refresh())
      .catch(err => alert(err))
    }
  }

  return (
    <div className="modal fade" id="answerModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Submit Your Answer: {question.question_body}</h5>
            <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="answer" className="col-form-label">Your Answer*:</label>
                <textarea type="text" className="form-control" id="answer" maxLength={1000} onChange={e => setAnswer(e.target.value)}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="nickname" className="col-form-label">Nickname*:</label>
                <input className="form-control" id="nickname" maxLength={60} placeholder="Example: jack543!" onChange={e => setNickname(e.target.value)}></input>
                For privacy reasons, do not use your full name or email address
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="col-form-label">Email*:</label>
                <input type="email" className="form-control" id="email" maxLength={60} placeholder="jack@email.com" onChange={e => setEmail(e.target.value)}></input>
                For authentication reasons, you will not be emailed
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit} data-dismiss="modal">Submit Answer</button>
          </div>
        </div>
      </div>
    </div>
  )
}
import React from 'react';
import { getAllQuestions } from '../../core/actions/question';
import QuestionCard from './QuestionCard';

const QuestionList = () => {
  const [questions, setQuestions] = React.useState([]);  

  React.useEffect(() => {
    async function fetchQuestions() {
      let response = await getAllQuestions();
      // response = await response.json()
      setQuestions(response);
    }

    fetchQuestions()
  }, [])

  return ( 
    <>
      <div>
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard {...question} />
          ))
        ) : (
          <p className='message'>No Questions available. Please add some Questions.</p>
        )}
      </div>        
  </>
  )
}

export default QuestionList


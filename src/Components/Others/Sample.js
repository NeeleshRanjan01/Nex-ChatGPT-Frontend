// import React, { useState, useEffect } from 'react';
// import './QuestionAnswer.css';

// const Sample = () => {
//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState('');
//   const [showAnswer, setShowAnswer] = useState(false);
//   const [index, setIndex] = useState(0);

//   let data="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       if (index < answer.length) {
//         setIndex(index + 1);
//       }
//     }, 50);

//     return () => {
//       clearTimeout(timeoutId);
//     };
//   }, [index, answer]);

//   const handleQuestionSubmit = (event) => {
//     event.preventDefault();
//     setAnswer(data)
//     setShowAnswer(true);
//   };

//   return (
//     <div className="question-answer">
//       <form onSubmit={handleQuestionSubmit}>
//         <input
//           type="text"
//           placeholder="Ask me anything..."
//           value={question}
//           onChange={(event) => setQuestion(event.target.value)}
//         />
//         <button type="submit">Submit</button>
//       </form>
//       {showAnswer ? (
//         <div className="answer">
//           <p>{answer.slice(0, index)}</p>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default Sample;




import React, { useState, useEffect } from 'react';

const QuestionAnswer = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [index, setIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  let data="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (index < answer.length) {
        setIndex(index + 1);
      } 
    //   else {
    //     setCursorVisible(!cursorVisible);
    //   }
    }, 50);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [index, answer, cursorVisible]);

  const handleQuestionSubmit = (event) => {
    event.preventDefault();
    setAnswer(data)
    setShowAnswer(true);
  };

  return (
    <div>
      <form onSubmit={handleQuestionSubmit}>
        <input
          type="text"
          placeholder="Ask me anything..."
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {showAnswer ? (
        <div>
          <p>{answer.slice(0, index)}</p>
          {/* {index === answer.length ? (
            <span className={`cursor ${cursorVisible ? '' : 'hidden'}`}>|</span>
          ) : null} */}
        </div>
      ) : null}
    </div>
  );
};

export default QuestionAnswer;



import React, { useState } from 'react';

const QuestionBox = ({
  question,
  questionText,
  choice1,
  choice2,
  choice3,
  choice4,
  onChoiceSelect,
  nextQuestion,
}) => {
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleChoiceClick = (choiceNumber) => {
    setSelectedChoice(choiceNumber);
    onChoiceSelect(choiceNumber);
    nextQuestion(); 
  };

  return (
    <div className="container flex flex-col text-xl bg-blue-400 font-medium text-gray-900 p-4 rounded-lg shadow-md">
      <p>
        {question}. {questionText}
      </p>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <button
          onClick={() => handleChoiceClick(1)}
          type="button"
          className={`bg-blue-200 hover:bg-blue-300 p-2 rounded ${
            selectedChoice === 1 ? 'bg-blue-500 text-white' : ''
          }`}
        >
          {choice1}
        </button>
        <button
          onClick={() => handleChoiceClick(2)}
          type="button"
          className={`bg-blue-200 hover:bg-blue-300 p-2 rounded ${
            selectedChoice === 2 ? 'bg-blue-500 text-white' : ''
          }`}
        >
          {choice2}
        </button>
        <button
          onClick={() => handleChoiceClick(3)}
          type="button"
          className={`bg-blue-200 hover:bg-blue-300 p-2 rounded ${
            selectedChoice === 3 ? 'bg-blue-500 text-white' : ''
          }`}
        >
          {choice3}
        </button>
        <button
          onClick={() => handleChoiceClick(4)}
          type="button"
          className={`bg-blue-200 hover:bg-blue-300 p-2 rounded ${
            selectedChoice === 4 ? 'bg-blue-500 text-white' : ''
          }`}
        >
          {choice4}
        </button>
      </div>
    </div>
  );
};

export default QuestionBox;
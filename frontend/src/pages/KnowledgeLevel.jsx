import React, { useState } from "react";
import axios from "axios";
import QuestionBox from "../components/QuestionBox";

const KnowledgeLevel = () => {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchQuestions = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic.");
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`http://localhost:5000/api/query/question`, { text: topic });
      console.log(response.data)
      setQuestions(response.data.questions || []);
    } catch (err) {
        console.log(err)
      setError("Failed to fetch questions. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      <h2 className="text-2xl font-bold mb-4">Enter a Topic</h2>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter topic name"
        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 w-80"
      />
      <button
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={fetchQuestions}
        disabled={loading}
      >
        {loading ? "Fetching..." : "Get Questions"}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {questions.length > 0 && (
        <div className="mt-6 w-full max-w-lg">
          <QuestionBox
            question={currentQuestionIndex + 1}
            questionText={questions[currentQuestionIndex].text}
            choice1={questions[currentQuestionIndex].choices[0]}
            choice2={questions[currentQuestionIndex].choices[1]}
            choice3={questions[currentQuestionIndex].choices[2]}
            choice4={questions[currentQuestionIndex].choices[3]}
            onChoiceSelect={(choice) => console.log("Selected Choice:", choice)}
            nextQuestion={nextQuestion}
          />
        </div>
      )}
    </div>
  );
};

export default KnowledgeLevel;

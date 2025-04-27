import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react"; // Import Clerk authentication hooks

const Dashboard = () => {
  const navigate = useNavigate();

  const [topic, setTopic] = useState("");
  const [knowledgeLevel, setKnowledgeLevel] = useState("");
  const [interests, setInterests] = useState("");
  const [learnerType, setLearnerType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/chat", {
      state: {
        topic,
        knowledgeLevel,
        interests,
        learnerType,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">AI Tutor Chat</h1>
          <UserButton afterSignOutUrl="/signin" /> {/* Logout button */}
        </header>

        {/* Form */}
        <div className="flex-1 p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Level of Knowledge
              </label>
              <input
                type="text"
                value={knowledgeLevel}
                onChange={(e) => setKnowledgeLevel(e.target.value)}
                placeholder="Beginner, Intermediate, Advanced"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Interests</label>
              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="E.g., Coding, Data Science"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Type of Learner
              </label>
              <input
                type="text"
                value={learnerType}
                onChange={(e) => setLearnerType(e.target.value)}
                placeholder="Fast, Medium, Slow"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Start Learning
            </button>
              <div classname="flex justify-center items-center mt-4">
            <button 
        className="mt-10 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"  
        onClick={() => navigate("/knowledge-level")}
      >
        Know Your Knowledge Level
      </button>
      </div>
          </form>

          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

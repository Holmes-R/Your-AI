import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

// ✅ Flask backend URL (running locally)
const backendURL = "http://127.0.0.1:5001";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [originalSummary, setOriginalSummary] = useState("");


  const location = useLocation();
  const { topic, knowledgeLevel, interests, learnerType } =
    location.state || {};

  useEffect(() => {
    const initialPrompt =
      topic && knowledgeLevel && interests && learnerType
        ? `I am a ${knowledgeLevel} learner interested in ${topic}. My interests are ${interests}, and I am a ${learnerType} learner. Please guide me.(Shorter response in points)`
        : "👋 Hello! How can I help you today?";

    setMessages([{ text: initialPrompt, sender: "user" }]);
    handleSendMessage(initialPrompt);
  }, [topic, knowledgeLevel, interests, learnerType]);

  // ✅ Handle sending messages
  const handleSendMessage = async (message = null) => {
    const userInput = message || input.trim();
    if (!userInput) return;

    const userMessage = { text: userInput, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    if (!message) setInput(""); // Clear input field

    try {
      const response = await fetch(`${backendURL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: userInput }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiResponse = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        aiResponse += chunk; // ✅ Collect streamed response
        setMessages((prev) => [
          ...prev.filter((msg) => msg.sender !== "bot"),
          { text: aiResponse, sender: "bot" },
        ]);
      }

      if (!aiResponse.trim()) aiResponse = "🤖 No response from AI.";
      setMessages((prev) => [
        ...prev.filter((msg) => msg.sender !== "bot"),
        { text: formatResponse(aiResponse), sender: "bot" },
      ]);
    } catch (error) {
      console.error("AI response error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "❌ Error getting AI response!", sender: "bot" },
      ]);
    }
  };

  // ✅ Format AI Response for Readability
  const formatResponse = (text) => {
    return text
      .trim()
      .split(/\d+\.\s|\n+/) // ✅ Split at numbered points (1., 2., 3.) OR new lines
      .filter((line) => line.trim() !== "") // Remove empty lines
      .map((line, i) => (
        <p key={i} className="mb-2">
          {" "}
          {i + 1}. {line.trim()}{" "}
        </p>
      ));
  };


  // ✅ Handle file upload separately
  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: `📎 Uploaded: ${uploadedFile.name}`, sender: "user" },
    ]);

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      const response = await fetch(`${backendURL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setOriginalSummary(data.summary);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `📄 Summary: ${data.summary}`, sender: "bot" },
        ]);
      } else {
        throw new Error(data.error || "File upload failed.");
      }
    } catch (error) {
      console.error("File upload failed:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "❌ Error uploading file!", sender: "bot" },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">AI Chat</h1>
        <UserButton afterSignOutUrl="/signin" />
      </header>

      {/* Chat Container */}
      <div className="flex flex-1">
        <div className="flex-1 flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-white p-4 flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Send
            </button>
          </div>
          {/* File Upload Section */}
          <div className="bg-white p-4 flex justify-between items-center">
            <label
              htmlFor="fileInput"
              className="cursor-pointer bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
            >
              📎 Upload File
            </label>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileUpload}
              accept=".txt,.pdf,.docx"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

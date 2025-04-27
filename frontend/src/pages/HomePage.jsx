import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to Your AI Tutor
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Learn at your own pace with personalized guidance.
        </p>
        <Link
          to="/signin"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Adaptive Learning */}
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-4xl text-blue-600 mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                ChatBot Interface
              </h3>
              <p className="text-gray-600">
                Learn with a chatbot interface that adapts to your learning
                style
              </p>
            </div>

            {/* Feature 2: Real-Time Feedback */}
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-4xl text-green-600 mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Real-Time Feedback
              </h3>
              <p className="text-gray-600">
                Get instant feedback on your answers and improve faster.
              </p>
            </div>

            {/* Feature 3: Progress Tracking */}
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-4xl text-purple-600 mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Self-Paced Learning
              </h3>
              <p className="text-gray-600">
                Learn at your pace with your personalised AI tutor
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Start Learning?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Sign up now and experience personalized education like never before.
        </p>
        <Link
          to="/signin"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Sign Up Today
        </Link>
      </section>
    </div>
  );
};

export default HomePage;

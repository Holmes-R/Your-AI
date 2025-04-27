import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import RootLayout from "./pages/rootLayout";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
import ProtectedRoute from "./components/protectedRoute";
import KnowledgeLevel from "./pages/KnowledgeLevel";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="signin" element={<SigninPage />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="chat"
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
            />
            <Route path="/knowledge-level" element={<KnowledgeLevel />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;

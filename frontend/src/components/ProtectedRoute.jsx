import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();

  console.log("Auth state:", { isSignedIn, isLoaded });

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <Navigate to="/signin" />;

  return children;
};

export default ProtectedRoute;

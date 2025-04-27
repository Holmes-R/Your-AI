import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
      <div className="logo">
        <Link to="/" className="text-xl font-bold text-gray-800">
          Your AI Tutor
        </Link>
      </div>
      <nav className="flex items-center space-x-4">
        <SignedIn>
          <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
            Dashboard
          </Link>
          <UserButton afterSignOutUrl="/" /> {/* Clerk's UserButton */}
        </SignedIn>
        <SignedOut>
          <Link to="/signin" className="text-gray-700 hover:text-blue-600">
            Sign In
          </Link>
        </SignedOut>
      </nav>
    </header>
  );
};

export default Header;

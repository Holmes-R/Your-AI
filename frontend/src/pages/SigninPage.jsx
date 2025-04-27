import { SignIn } from "@clerk/clerk-react";

const SigninPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn
        redirectUrl="/dashboard"
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300",
            footerActionLink: "text-blue-600 hover:text-blue-700",
            socialButtonsBlockButton:
              "border border-gray-300 hover:bg-gray-50 rounded-lg transition duration-300",
          },
        }}
      />
    </div>
  );
};

export default SigninPage;

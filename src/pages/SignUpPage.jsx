import { SignUp } from '@clerk/clerk-react';
import { motion } from 'framer-motion';

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-700 mb-2">Create Your Account</h1>
            <p className="text-gray-600">
              Join Yojana Finder to save schemes and get personalized recommendations
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <SignUp 
              path="/sign-up"
              routing="path"
              signInUrl="/sign-in"
              redirectUrl="/"
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-blue-700 hover:bg-blue-800 text-white',
                  footerActionLink: 'text-blue-700 hover:text-blue-800',
                  card: 'rounded-md shadow-none',
                }
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;

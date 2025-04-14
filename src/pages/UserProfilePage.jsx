import { useUser, UserProfile, useClerk } from '@clerk/clerk-react';
import { LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const UserProfilePage = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut();
  };

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-700 mb-2">Your Profile</h1>
            <p className="text-gray-600">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <UserProfile
              path="/profile"
              routing="path"
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-blue-700 hover:bg-blue-800 text-white',
                  card: 'rounded-md shadow-none',
                }
              }}
            />
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleSignOut}
              className="flex items-center justify-center mx-auto bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md transition-colors duration-300"
            >
              <LogOut size={18} className="mr-2" />
              Sign Out
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfilePage;

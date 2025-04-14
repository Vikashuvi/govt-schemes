import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, AlertCircle } from 'lucide-react';
import SchemeCard from '../components/SchemeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import { useUser } from '@clerk/clerk-react';

// In a real app, this would come from a database
// For demo purposes, we'll simulate saved schemes with localStorage
const SavedSchemesPage = () => {
  const { user, isLoaded } = useUser();
  const [savedSchemes, setSavedSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user) {
      // Simulate fetching saved schemes from localStorage
      const fetchSavedSchemes = () => {
        setLoading(true);
        try {
          // In a real app, this would be a database query
          const savedSchemesData = localStorage.getItem(`savedSchemes_${user.id}`);
          if (savedSchemesData) {
            setSavedSchemes(JSON.parse(savedSchemesData));
          }
        } catch (error) {
          // Silent error handling for demo purposes
        } finally {
          setLoading(false);
        }
      };

      // Add a small delay to simulate network request
      const timer = setTimeout(() => {
        fetchSavedSchemes();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLoaded, user]);

  if (!isLoaded || loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-6">
            <Bookmark size={24} className="text-blue-600 mr-2" />
            <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-800">
              Your Saved Schemes
            </h1>
          </div>
          <p className="text-blue-600 text-center mb-8">
            Access your bookmarked government schemes for quick reference
          </p>

          {savedSchemes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedSchemes.map((scheme) => (
                <motion.div
                  key={scheme.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SchemeCard scheme={scheme} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <Alert
                type="info"
                message={
                  <div className="flex flex-col items-center">
                    <AlertCircle size={40} className="mb-2 text-blue-500" />
                    <span className="text-center">You haven't saved any schemes yet. Browse schemes and click "Save" to add them to your collection.</span>
                  </div>
                }
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SavedSchemesPage;

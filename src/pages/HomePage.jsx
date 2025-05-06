import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import UserWelcomeCard from '../components/UserWelcomeCard';
import SearchParametersBadge from '../components/SearchParametersBadge';
import SchemeDetailCard from '../components/SchemeDetailCard';
import LoadingSpinner from '../components/LoadingSpinner';
import schemes from '../data/schemes.json';

const HomePage = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [recommendedSchemes, setRecommendedSchemes] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      // Get user profile from localStorage
      const storedProfile = localStorage.getItem('userProfile');
      const profile = storedProfile ? JSON.parse(storedProfile) : null;
      setUserProfile(profile);

      // Filter schemes based on user profile or show top schemes if no profile
      let filteredSchemes = [...schemes];

      if (profile) {
        // Simple matching algorithm - in a real app this would be more sophisticated
        filteredSchemes = filteredSchemes.filter(scheme => {
          // Match by occupation
          const occupationMatch =
            scheme.eligibility.occupation.includes(profile.occupation) ||
            scheme.eligibility.occupation.includes('Any');

          // Match by age (simple check)
          const ageMatch =
            scheme.eligibility.age === 'Any' ||
            scheme.eligibility.age === profile.age ||
            scheme.eligibility.age.includes(profile.age);

          // Match by gender
          const genderMatch =
            scheme.eligibility.gender === 'Any' ||
            scheme.eligibility.gender === profile.gender ||
            (Array.isArray(scheme.eligibility.gender) &&
              scheme.eligibility.gender.includes(profile.gender));

          return occupationMatch && (ageMatch || genderMatch);
        });
      }

      // Sort by relevance (in a real app, this would use a more complex algorithm)
      filteredSchemes.sort((a, b) => b.id - a.id);

      // Take top schemes
      setRecommendedSchemes(filteredSchemes.slice(0, 4));
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded || loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Welcome Card with Stats */}
          <UserWelcomeCard />

          {/* Search Parameters */}
          <div className="mt-8">
            <SearchParametersBadge />
          </div>

          {/* Recommended Schemes */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recommended Schemes for You</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedSchemes.length > 0 ? (
                recommendedSchemes.map((scheme, index) => (
                  <motion.div
                    key={scheme.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <SchemeDetailCard
                      scheme={scheme}
                      matchScore={100 - (index * 5)}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-2 text-center py-8">
                  <p className="text-gray-500">No recommended schemes found. Please update your profile to get personalized recommendations.</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;

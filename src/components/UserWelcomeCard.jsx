import { useUser } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';
import schemes from '../data/schemes.json';

const UserWelcomeCard = () => {
  const { user } = useUser();
  const [availableSchemes, setAvailableSchemes] = useState(0);
  const [savedSchemes, setSavedSchemes] = useState(0);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    if (user) {
      // Get saved schemes count
      try {
        const savedSchemesData = localStorage.getItem(`savedSchemes_${user.id}`);
        if (savedSchemesData) {
          const savedSchemes = JSON.parse(savedSchemesData);
          setSavedSchemes(savedSchemes.length);
        }
      } catch (error) {
        console.error('Error loading saved schemes:', error);
      }

      // Get profile completion - in a real app this would be more sophisticated
      const storedProfile = localStorage.getItem('userProfile');
      if (storedProfile) {
        const profile = JSON.parse(storedProfile);
        // Calculate completion percentage based on filled fields
        const totalFields = 10; // Assuming 10 fields in the profile
        const filledFields = Object.values(profile).filter(val => val && val !== '').length;
        setProfileCompletion(Math.round((filledFields / totalFields) * 100));
      } else {
        setProfileCompletion(0);
      }

      // Set available schemes count from actual data
      setAvailableSchemes(schemes.length);

      // Set last updated date
      setLastUpdated(new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }));
    }
  }, [user]);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md p-6 relative overflow-hidden">
      <div className="flex items-center mb-4">
        <div className="bg-white rounded-full p-2 mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Welcome back, {user?.firstName || 'User'}</h2>
          <p className="text-blue-100">Here are your recommended government schemes based on your profile</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-sm h-24 flex flex-col justify-center items-center">
          <div className="text-3xl font-bold text-blue-600">{availableSchemes}</div>
          <div className="text-sm text-gray-600">Available Schemes</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm h-24 flex flex-col justify-center items-center">
          <div className="text-3xl font-bold text-blue-600">{savedSchemes}</div>
          <div className="text-sm text-gray-600">Saved Schemes</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm h-24 flex flex-col justify-center items-center">
          <div className="text-3xl font-bold text-blue-600">{profileCompletion}%</div>
          <div className="text-sm text-gray-600">Profile Completion</div>
        </div>
      </div>

      <div className="absolute top-4 right-4 text-sm text-blue-100">
        Last updated: {lastUpdated}
      </div>
    </div>
  );
};

export default UserWelcomeCard;

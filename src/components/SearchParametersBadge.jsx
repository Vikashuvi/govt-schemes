import { useState, useEffect } from 'react';
import { User, Calendar, Briefcase, MapPin } from 'lucide-react';

const SearchParametersBadge = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Get user profile from localStorage
    try {
      const storedProfile = localStorage.getItem('userProfile');
      if (storedProfile) {
        setUserProfile(JSON.parse(storedProfile));
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  }, []);

  if (!userProfile) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-gray-700 font-medium">Your Search Parameters</h3>
        <button 
          className="text-blue-600 text-sm font-medium flex items-center"
          onClick={() => window.location.href = '/eligibility'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Modify Parameters
        </button>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          <User size={16} className="mr-1" />
          <span>Name: {userProfile.fullName || 'Not specified'}</span>
        </div>
        
        <div className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
          <Calendar size={16} className="mr-1" />
          <span>Age: {userProfile.age || 'Not specified'}</span>
        </div>
        
        <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Gender: {userProfile.gender || 'Not specified'}</span>
        </div>
        
        <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
          <Briefcase size={16} className="mr-1" />
          <span>Occupation: {userProfile.occupation || 'Not specified'}</span>
        </div>
        
        <div className="flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
          <MapPin size={16} className="mr-1" />
          <span>Location: {userProfile.state || 'Not specified'}</span>
        </div>
      </div>
    </div>
  );
};

export default SearchParametersBadge;

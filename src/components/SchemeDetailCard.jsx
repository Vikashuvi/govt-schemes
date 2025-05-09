import { useState, useEffect } from 'react';
import { ExternalLink, Bookmark, BookmarkCheck, Share2, Tag } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

const SchemeDetailCard = ({ scheme, matchScore = 95 }) => {
  const { user, isSignedIn } = useUser();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isSignedIn && user) {
      // Check if this scheme is saved in localStorage
      try {
        const savedSchemesData = localStorage.getItem(`savedSchemes_${user.id}`);
        if (savedSchemesData) {
          const savedSchemes = JSON.parse(savedSchemesData);
          setIsSaved(savedSchemes.some(savedScheme => savedScheme.id === scheme.id));
        }
      } catch (error) {
        console.error('Error checking saved status:', error);
      }
    }
  }, [isSignedIn, user, scheme.id]);

  const toggleSave = () => {
    if (!isSignedIn || !user) return;

    try {
      // Get current saved schemes
      const savedSchemesData = localStorage.getItem(`savedSchemes_${user.id}`);
      let savedSchemes = savedSchemesData ? JSON.parse(savedSchemesData) : [];

      if (isSaved) {
        // Remove scheme from saved list
        savedSchemes = savedSchemes.filter(savedScheme => savedScheme.id !== scheme.id);
      } else {
        // Add scheme to saved list
        savedSchemes.push(scheme);
      }

      // Update localStorage
      localStorage.setItem(`savedSchemes_${user.id}`, JSON.stringify(savedSchemes));
      setIsSaved(!isSaved);
    } catch (error) {
      console.error('Error saving scheme:', error);
    }
  };

  // Format application deadline
  const formatDeadline = (dateString) => {
    if (!dateString) return 'No deadline specified';

    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // Get category from tags or default to General
  const getCategory = () => {
    if (scheme.tags && scheme.tags.length > 0) {
      // Try to find a category-like tag
      const categoryTags = scheme.tags.filter(tag =>
        tag.includes('For') ||
        tag.includes('Education') ||
        tag.includes('Housing') ||
        tag.includes('Health') ||
        tag.includes('Entrepreneurship')
      );
      return categoryTags.length > 0 ? categoryTags[0] : scheme.tags[0];
    }
    return 'General';
  };

  // Get eligibility text
  const getEligibilityText = () => {
    if (scheme.eligibilityText) return scheme.eligibilityText;

    const eligibility = scheme.eligibility;
    if (!eligibility) return 'All citizens';

    const parts = [];

    if (eligibility.occupation && eligibility.occupation !== 'Any') {
      parts.push(Array.isArray(eligibility.occupation)
        ? eligibility.occupation.join(', ')
        : eligibility.occupation);
    }

    if (eligibility.income && eligibility.income !== 'Any') {
      parts.push(`Income: ${eligibility.income}`);
    }

    if (eligibility.age && eligibility.age !== 'Any') {
      parts.push(`Age: ${eligibility.age}`);
    }

    if (eligibility.gender && eligibility.gender !== 'Any') {
      parts.push(`Gender: ${Array.isArray(eligibility.gender)
        ? eligibility.gender.join(', ')
        : eligibility.gender}`);
    }

    if (eligibility.caste && eligibility.caste !== 'Any') {
      parts.push(`Category: ${Array.isArray(eligibility.caste)
        ? eligibility.caste.join(', ')
        : eligibility.caste}`);
    }

    return parts.length > 0 ? parts.join('; ') : 'All citizens';
  };

  // Get default image based on category
  const getDefaultImage = () => {
    // All images should be fixed now, but keep this as a fallback
    const brokenImageMap = {};

    // If scheme has an imageUrl property, check if it's in the broken image map
    if (scheme.imageUrl) {
      return brokenImageMap[scheme.imageUrl] || scheme.imageUrl;
    }

    // Fallback to category-based image selection
    const category = getCategory().toLowerCase();

    if (category.includes('farmer') || category.includes('agriculture')) {
      return '/images/schemes/agriculture-default.jpg';
    } else if (category.includes('student') || category.includes('education')) {
      return '/images/schemes/education-default.jpg';
    } else if (category.includes('entrepreneur') || category.includes('business')) {
      return '/images/schemes/entrepreneur-default.jpg';
    } else if (category.includes('women') || category.includes('female')) {
      return '/images/schemes/women-default.jpg';
    } else if (category.includes('housing') || category.includes('home')) {
      return '/images/schemes/housing-default.jpg';
    } else if (category.includes('pension') || category.includes('senior')) {
      return '/images/schemes/senior-default.jpg';
    } else {
      return '/images/schemes/general-default.jpg';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col w-full">
      <div className="h-48 overflow-hidden">
        <img
          src={getDefaultImage()}
          alt={scheme.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/schemes/general-default.jpg';
          }}
        />
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            Eligible
          </div>
          <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {matchScore}% Match Score
          </div>
        </div>

        <h3 className="text-lg font-semibold text-blue-700 mt-2 line-clamp-1">{scheme.name}</h3>
        <p className="text-sm text-gray-500 mb-2">Category: {getCategory()}</p>

        <div className="border-t border-b border-gray-100 py-3 my-3 flex-grow">
          <div className="text-sm line-clamp-2">
            <strong>Benefits:</strong> {scheme.benefits || scheme.description}
          </div>
          <div className="text-sm mt-2 line-clamp-2">
            <strong>Eligibility:</strong> {getEligibilityText()}
          </div>
          <div className="text-sm mt-2">
            <strong>Application Deadline:</strong> {formatDeadline(scheme.applicationDeadline || '2025-04-30')}
          </div>
        </div>

        <div className="flex justify-between items-center mt-auto">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
            onClick={() => window.open(scheme.applyUrl, '_blank')}
          >
            Apply Now <ExternalLink size={14} className="ml-1" />
          </button>

          <div className="flex space-x-2">
            <button
              onClick={toggleSave}
              className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label={isSaved ? "Unsave scheme" : "Save scheme"}
            >
              {isSaved ? (
                <BookmarkCheck size={18} className="text-blue-600" />
              ) : (
                <Bookmark size={18} />
              )}
            </button>

            <button
              className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Share scheme"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetailCard;

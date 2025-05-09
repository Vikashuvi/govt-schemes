import { useState, useEffect } from 'react';
import { ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

const SchemeCard = ({ scheme }) => {
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
        // Silent error handling for demo purposes
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
      // Silent error handling for demo purposes
    }
  };

  // Get default image based on tags
  const getDefaultImage = () => {
    // All images should be fixed now, but keep this as a fallback
    const brokenImageMap = {};

    // If scheme has an imageUrl property, check if it's in the broken image map
    if (scheme.imageUrl) {
      return brokenImageMap[scheme.imageUrl] || scheme.imageUrl;
    }

    // Fallback to tag-based image selection
    if (!scheme.tags || scheme.tags.length === 0) {
      return '/images/schemes/general-default.jpg';
    }

    const tags = scheme.tags.map(tag => tag.toLowerCase());

    if (tags.some(tag => tag.includes('farmer') || tag.includes('agriculture'))) {
      return '/images/schemes/agriculture-default.jpg';
    } else if (tags.some(tag => tag.includes('student') || tag.includes('education'))) {
      return '/images/schemes/education-default.jpg';
    } else if (tags.some(tag => tag.includes('entrepreneur') || tag.includes('business'))) {
      return '/images/schemes/entrepreneur-default.jpg';
    } else if (tags.some(tag => tag.includes('women') || tag.includes('female'))) {
      return '/images/schemes/women-default.jpg';
    } else if (tags.some(tag => tag.includes('housing') || tag.includes('home'))) {
      return '/images/schemes/housing-default.jpg';
    } else if (tags.some(tag => tag.includes('pension') || tag.includes('senior'))) {
      return '/images/schemes/senior-default.jpg';
    } else {
      return '/images/schemes/general-default.jpg';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col w-full">
      <div className="h-48 overflow-hidden relative">
        <img
          src={getDefaultImage()}
          alt={scheme.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/schemes/general-default.jpg';
          }}
        />
        <div className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
          Eligible
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-blue-700 line-clamp-1">{scheme.name}</h3>
          {isSignedIn && (
            <button
              onClick={toggleSave}
              className="text-blue-600 hover:text-blue-800 transition-colors flex-shrink-0 ml-2"
              aria-label={isSaved ? "Unsave scheme" : "Save scheme"}
            >
              {isSaved ? (
                <BookmarkCheck size={20} className="text-blue-600" />
              ) : (
                <Bookmark size={20} />
              )}
            </button>
          )}
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{scheme.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {scheme.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {scheme.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{scheme.tags.length - 3} more</span>
          )}
        </div>

        <div className="flex justify-between items-center mt-auto">
          <a
            href={scheme.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
          >
            Apply Now <ExternalLink size={14} className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SchemeCard;

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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-blue-700">{scheme.name}</h3>
          {isSignedIn && (
            <button
              onClick={toggleSave}
              className="text-blue-600 hover:text-blue-800 transition-colors"
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
        <p className="text-gray-600 mb-4">{scheme.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {scheme.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <a
            href={scheme.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors bg-yellow-100 px-3 py-1 rounded-md"
          >
            Apply Now <ExternalLink size={14} className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SchemeCard;

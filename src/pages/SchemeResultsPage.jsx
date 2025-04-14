import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import SchemeCard from '../components/SchemeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import schemes from '../data/schemes.json';

const SchemeResultsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    occupation: [],
    caste: [],
    gender: [],
    age: []
  });

  // Filter categories
  const filterOptions = {
    occupation: ['Farmer', 'Student', 'Entrepreneur', 'Unemployed', 'Any'],
    caste: ['General', 'SC/ST', 'OBC', 'EWS', 'Any'],
    gender: ['Male', 'Female', 'Any'],
    age: ['Below 25', '25-40', '40-60', 'Above 60', 'Any']
  };

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      const storedProfile = localStorage.getItem('userProfile');
      
      if (!storedProfile) {
        navigate('/eligibility');
        return;
      }
      
      setUserProfile(JSON.parse(storedProfile));
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    if (!userProfile) return;
    
    // Filter schemes based on user profile
    // This is a simplified filtering logic - in a real app, this would be more sophisticated
    let filtered = [...schemes];
    
    // Apply active filters if any
    if (activeFilters.occupation.length > 0) {
      filtered = filtered.filter(scheme => 
        activeFilters.occupation.some(filter => 
          scheme.eligibility.occupation.includes(filter) || 
          scheme.eligibility.occupation.includes('Any')
        )
      );
    }
    
    if (activeFilters.caste.length > 0) {
      filtered = filtered.filter(scheme => 
        activeFilters.caste.some(filter => 
          scheme.eligibility.caste === filter || 
          scheme.eligibility.caste === 'Any' ||
          scheme.eligibility.caste.includes(filter)
        )
      );
    }
    
    if (activeFilters.gender.length > 0) {
      filtered = filtered.filter(scheme => 
        activeFilters.gender.some(filter => 
          scheme.eligibility.gender === filter || 
          scheme.eligibility.gender === 'Any' ||
          scheme.eligibility.gender.includes(filter)
        )
      );
    }
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(scheme => 
        scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredSchemes(filtered);
  }, [userProfile, activeFilters, searchTerm]);

  const toggleFilter = (category, value) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      
      if (newFilters[category].includes(value)) {
        // Remove filter if already active
        newFilters[category] = newFilters[category].filter(item => item !== value);
      } else {
        // Add filter
        newFilters[category] = [...newFilters[category], value];
      }
      
      return newFilters;
    });
  };

  const clearFilters = () => {
    setActiveFilters({
      occupation: [],
      caste: [],
      gender: [],
      age: []
    });
    setSearchTerm('');
  };

  if (loading) {
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
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">
            Your Eligible Schemes
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Based on your profile, we've found the following government schemes you may be eligible for.
          </p>

          {/* Search and Filter Controls */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-1/2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Search schemes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <Filter size={18} className="mr-1" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-white rounded-md shadow-sm border border-gray-200"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-700">Filter Schemes</h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    Clear All
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {Object.entries(filterOptions).map(([category, options]) => (
                    <div key={category}>
                      <h4 className="font-medium text-gray-700 capitalize mb-2">{category}</h4>
                      <div className="space-y-2">
                        {options.map(option => (
                          <label key={option} className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded text-indigo-600 focus:ring-indigo-500 mr-2"
                              checked={activeFilters[category].includes(option)}
                              onChange={() => toggleFilter(category, option)}
                            />
                            <span className="text-sm text-gray-600">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Results */}
          {filteredSchemes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchemes.map((scheme) => (
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
            <Alert
              type="info"
              message="No schemes found matching your criteria. Try adjusting your filters or search term."
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SchemeResultsPage;

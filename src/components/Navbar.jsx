import { Link } from 'react-router-dom';
import { Home, FileText, UserCheck, User, LogIn, Bookmark } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const { user, isSignedIn, isLoaded } = useUser();

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center">
          <span className="text-yellow-300">Sarkari</span>
          <span className="ml-1">Nidhi</span>
        </Link>

        <div className="flex space-x-4 md:space-x-6 items-center">
          <Link to="/" className="flex items-center hover:text-yellow-300 transition-colors">
            <Home size={18} className="mr-1" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link to="/schemes" className="flex items-center hover:text-yellow-300 transition-colors">
            <FileText size={18} className="mr-1" />
            <span className="hidden sm:inline">All Schemes</span>
          </Link>
          <Link to="/eligibility" className="flex items-center hover:text-yellow-300 transition-colors">
            <UserCheck size={18} className="mr-1" />
            <span className="hidden sm:inline">Check Eligibility</span>
          </Link>

          {isLoaded && isSignedIn ? (
            <div className="flex items-center space-x-4">
              <Link to="/saved-schemes" className="flex items-center hover:text-yellow-300 transition-colors">
                <Bookmark size={18} className="mr-1" />
                <span className="hidden sm:inline">Saved</span>
              </Link>
              <Link to="/profile" className="flex items-center hover:text-yellow-300 transition-colors">
                <User size={18} className="mr-1" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
            </div>
          ) : (
            <Link to="/sign-in" className="flex items-center hover:text-yellow-300 transition-colors">
              <LogIn size={18} className="mr-1" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

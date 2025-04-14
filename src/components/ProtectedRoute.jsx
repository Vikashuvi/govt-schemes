import { useAuth, RedirectToSignIn } from '@clerk/clerk-react';

const ProtectedRoute = ({ children }) => {
  const { isLoaded, userId } = useAuth();
  
  if (!isLoaded) {
    // You can show a loading state here
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!userId) {
    return <RedirectToSignIn />;
  }
  
  return children;
};

export default ProtectedRoute;

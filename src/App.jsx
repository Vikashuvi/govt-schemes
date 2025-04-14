import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkLoaded, ClerkLoading } from '@clerk/clerk-react';

// Pages
import HomePage from './pages/HomePage';
import EligibilityFormPage from './pages/EligibilityFormPage';
import SchemeResultsPage from './pages/SchemeResultsPage';
import AllSchemesPage from './pages/AllSchemesPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import UserProfilePage from './pages/UserProfilePage';
import SavedSchemesPage from './pages/SavedSchemesPage';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  return (
    <Router>
      <ClerkLoading>
        <div className="flex justify-center items-center min-h-screen">
          <LoadingSpinner />
        </div>
      </ClerkLoading>

      <ClerkLoaded>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/sign-in/*" element={<SignInPage />} />
              <Route path="/sign-up/*" element={<SignUpPage />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } />
              <Route path="/eligibility" element={
                <ProtectedRoute>
                  <EligibilityFormPage />
                </ProtectedRoute>
              } />
              <Route path="/results" element={
                <ProtectedRoute>
                  <SchemeResultsPage />
                </ProtectedRoute>
              } />
              <Route path="/schemes" element={
                <ProtectedRoute>
                  <AllSchemesPage />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/saved-schemes" element={
                <ProtectedRoute>
                  <SavedSchemesPage />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </ClerkLoaded>
    </Router>
  );
}

export default App

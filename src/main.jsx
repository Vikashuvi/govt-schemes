import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.jsx'

// Import Clerk publishable key from environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Check if the key is available
if (!clerkPubKey) {
  // Handle missing key silently
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={clerkPubKey}
      appearance={{
        elements: {
          // Hide security-related UI elements
          userButtonSecurityTab: "hidden",
          userProfileSecuritySection: "hidden",
          userSettingsSecurityTab: "hidden"
        }
      }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
)

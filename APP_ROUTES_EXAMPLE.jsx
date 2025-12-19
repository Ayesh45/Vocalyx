/**
 * EXAMPLE App.js WITH FIREBASE ROUTES
 * 
 * This shows how to update your existing App.js to include
 * the new login/signup pages and Firebase authentication
 */

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';

// Import existing pages
import Home from './Home';
import LandingPage from './LandingPage';
import AddPatientForm from './AddPatientForm';
import PatientDetail from './PatientDetail';
import Dashboard from './Dashboard';
import AACBoardBuilder from './aac/AACBoardBuilder';
import ScheduleEditor from './schedule/ScheduleEditor';
import ScheduleHome from './schedule/ScheduleHome';

// Import new Firebase pages
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';

// Loading component
function LoadingScreen() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '18px'
    }}>
      Loading...
    </div>
  );
}

// Protected route component - only logged-in users can access
function ProtectedRoute({ element, isAuthenticated, isLoading }) {
  if (isLoading) return <LoadingScreen />;
  return isAuthenticated ? element : <Navigate to="/login" replace />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // Check authentication state on app load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setCurrentUser(user);
        // Store user info in session storage for use in components
        sessionStorage.setItem('patientId', user.uid);
        sessionStorage.setItem('patientEmail', user.email);
        sessionStorage.setItem('patientName', user.displayName || '');
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
        // Clear session storage on logout
        sessionStorage.removeItem('patientId');
        sessionStorage.removeItem('patientEmail');
        sessionStorage.removeItem('patientName');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES - Accessible without authentication */}
        
        {/* Landing page - first page user sees */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />}
        />
        
        {/* Authentication routes */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
        />
        
        <Route 
          path="/signup" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignupPage />}
        />
        
        {/* PROTECTED ROUTES - Require authentication */}
        
        {/* Main dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute 
              element={<Dashboard />} 
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
            />
          }
        />
        
        {/* Patient pages */}
        <Route 
          path="/patient" 
          element={
            <ProtectedRoute 
              element={<PatientDetail />} 
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
            />
          }
        />
        
        <Route 
          path="/add-patient" 
          element={
            <ProtectedRoute 
              element={<AddPatientForm />} 
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
            />
          }
        />
        
        {/* AAC Board Builder */}
        <Route 
          path="/aac-board" 
          element={
            <ProtectedRoute 
              element={<AACBoardBuilder />} 
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
            />
          }
        />
        
        {/* Visual Schedule */}
        <Route 
          path="/schedule-home" 
          element={
            <ProtectedRoute 
              element={<ScheduleHome />} 
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
            />
          }
        />
        
        <Route 
          path="/schedule/:id" 
          element={
            <ProtectedRoute 
              element={<ScheduleEditor />} 
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
            />
          }
        />
        
        {/* Home page */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute 
              element={<Home />} 
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
            />
          }
        />
        
        {/* Catch-all - redirect to login */}
        <Route 
          path="*" 
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;


/**
 * WHAT CHANGED:
 * 
 * 1. Added imports for Firebase auth
 * 2. Added import for LoginPage and SignupPage
 * 3. Created LoadingScreen component
 * 4. Created ProtectedRoute component for authenticated routes
 * 5. Added useEffect to check auth state on load
 * 6. Added /login route
 * 7. Added /signup route
 * 8. Wrapped all existing routes with ProtectedRoute
 * 9. Added conditional redirects based on auth state
 * 
 * FLOW:
 * 
 * User visits app
 *   → Firebase checks if authenticated
 *   → If NOT: Redirect to /login or /signup
 *   → If YES: Redirect to /dashboard
 *   → User can access all protected routes
 *   → On logout: Session cleared, redirect to /login
 * 
 * SESSION STORAGE (used by components):
 * - 'patientId': User's Firebase UID
 * - 'patientEmail': User's email
 * - 'patientName': User's display name
 * 
 * USE IN COMPONENTS:
 * 
 * const patientId = sessionStorage.getItem('patientId');
 * const patientEmail = sessionStorage.getItem('patientEmail');
 * 
 * // Load patient data from Firebase
 * const result = await getPatientData(patientId);
 * 
 * ROUTES SUMMARY:
 * 
 * PUBLIC:
 * - /              → Landing page (or dashboard if logged in)
 * - /login         → Login page
 * - /signup        → Signup page
 * 
 * PROTECTED (need authentication):
 * - /dashboard     → Main patient dashboard
 * - /patient       → Patient details
 * - /add-patient   → Add new patient (for multi-patient support)
 * - /aac-board     → AAC board builder
 * - /schedule-home → Schedule overview
 * - /schedule/:id  → Edit specific schedule
 * - /home          → Home page
 * 
 * FEATURES:
 * - Auto-redirect based on auth state
 * - Loading screen while checking auth
 * - Session persistence across page refreshes
 * - Protected routes require login
 * - Can't access /login if already logged in
 * - Logout clears all session data
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/layout/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';


import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyNotesPage from './pages/MyNotesPage';
import SharedNotesPage from './pages/SharedNotesPage';
import CreateNotePage from './pages/CreateNotePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <main className="bg-gray-100 min-h-screen">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* --- Protected Routes --- */}
            {/* The ProtectedRoute component will guard all nested routes */}
            <Route element={<ProtectedRoute />}>
              {/* The "dashboard" is now the My Notes page */}
              <Route path="/dashboard" element={<MyNotesPage />} />
              <Route path="/shared" element={<SharedNotesPage />} />
              <Route path="/create" element={<CreateNotePage />} />
              
              {/* Optional: A redirect to handle any invalid routes when logged in */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Route>
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
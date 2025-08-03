import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  
  const activeStyle = {
    backgroundColor: '#eef2ff', 
    color: '#4f46e5', 
  };

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          NoteShare
        </Link>
        <div className="flex items-center space-x-2">
          {user ? (
            <>
              {/* Navigation Links as styled buttons */}
              <NavLink to="/dashboard" style={({ isActive }) => isActive ? activeStyle : undefined} className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100">My Notes</NavLink>
              <NavLink to="/shared" style={({ isActive }) => isActive ? activeStyle : undefined} className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100">Shared Notes</NavLink>
              <NavLink to="/create" className="px-3 py-2 rounded-md text-sm font-medium bg-indigo-500 text-white hover:bg-indigo-600">Add Note</NavLink>
              
              <div className="w-px h-6 bg-slate-200 mx-2"></div>

              <span className="text-sm text-slate-500">Hi, {user.username}</span>
              <button onClick={handleLogout} className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-3 rounded-md text-sm">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100">Login</NavLink>
              <NavLink to="/register" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-3 rounded-md text-sm">Register</NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
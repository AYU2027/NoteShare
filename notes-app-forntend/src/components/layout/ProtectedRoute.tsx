import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ClipLoader } from 'react-spinners'; 

const ProtectedRoute = () => {
  const { user, loading } = useAuth(); 

  
  
  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <ClipLoader color={"#14b8a6"} size={50} />
      </div>
    );
  }

  
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  
  return <Outlet />;
};

export default ProtectedRoute;
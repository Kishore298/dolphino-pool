import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const adminInfo = localStorage.getItem('adminInfo');
    const location = useLocation();

    if (!adminInfo) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;

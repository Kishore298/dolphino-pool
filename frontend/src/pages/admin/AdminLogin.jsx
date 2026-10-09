import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../utils/api';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        const adminInfo = localStorage.getItem('adminInfo');
        if (adminInfo) {
            navigate('/admin/dashboard');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/auth/login', { username, password });
            localStorage.setItem('adminInfo', JSON.stringify(data));
            toast.success('Login successful!');
            
            const from = location.state?.from?.pathname || '/admin/dashboard';
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="p-8 text-center bg-navy-900">
                    <img src="/logo.png" alt="Dolphino Logo" className="h-12 mx-auto bg-white p-2 rounded-lg mb-4" />
                    <h2 className="text-2xl font-bold text-white">Admin Portal</h2>
                </div>
                
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>
                        
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-3 font-bold flex justify-center items-center"
                        >
                            {loading ? (
                                <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                                "Login to Dashboard"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;

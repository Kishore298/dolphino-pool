import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
    FiHome, 
    FiBriefcase, 
    FiTool, 
    FiImage, 
    FiMessageSquare, 
    FiMail, 
    FiSettings, 
    FiLogOut,
    FiX
} from 'react-icons/fi';
import { toast } from 'react-toastify';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <FiHome /> },
        { name: 'Projects', path: '/admin/projects', icon: <FiBriefcase /> },
        { name: 'Services', path: '/admin/services', icon: <FiTool /> },
        { name: 'Gallery', path: '/admin/gallery', icon: <FiImage /> },
        { name: 'Testimonials', path: '/admin/testimonials', icon: <FiMessageSquare /> },
        { name: 'Enquiries', path: '/admin/enquiries', icon: <FiMail /> },
        { name: 'Settings', path: '/admin/settings', icon: <FiSettings /> },
    ];

    const handleLogout = () => {
        localStorage.removeItem('adminInfo');
        toast.info('Logged out successfully');
        navigate('/admin/login');
    };

    return (
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy-900 text-white shadow-xl flex flex-col transition-transform duration-300 md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-6 border-b border-navy-800 flex items-center justify-between bg-white md:justify-center">
                <img src="/logo.png" alt="Dolphino Logo" className="h-10 object-contain" />
                <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-500 md:hidden"
                >
                    <FiX className="text-2xl" />
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-6">
                <ul className="space-y-2 px-4">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                                    location.pathname === item.path 
                                        ? 'bg-secondary text-white font-medium shadow-md' 
                                        : 'text-gray-300 hover:bg-navy-800 hover:text-white'
                                }`}
                            >
                                <span className="mr-3 text-lg">{item.icon}</span>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="p-4 border-t border-navy-800">
                <button 
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                >
                    <FiLogOut className="mr-3 text-lg" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;

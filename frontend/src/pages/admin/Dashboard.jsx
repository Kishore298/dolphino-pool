import { useState, useEffect } from 'react';
import { FiBriefcase, FiTool, FiImage, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        projects: 0,
        services: 0,
        gallery: 0,
        enquiries: 0,
        newEnquiries: 0
    });
    const [recentEnquiries, setRecentEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [projects, services, gallery, enquiries] = await Promise.all([
                    api.get('/projects'),
                    api.get('/services'),
                    api.get('/gallery'),
                    api.get('/enquiries')
                ]);

                setStats({
                    projects: projects.data.length,
                    services: services.data.length,
                    gallery: gallery.data.length,
                    enquiries: enquiries.data.length,
                    newEnquiries: enquiries.data.filter(e => e.status === 'New').length
                });

                setRecentEnquiries(enquiries.data.slice(0, 5));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-secondary rounded-full animate-spin"></div>
            </div>
        );
    }

    const statCards = [
        { title: 'Total Projects', value: stats.projects, icon: <FiBriefcase />, color: 'bg-blue-500', link: '/admin/projects' },
        { title: 'Active Services', value: stats.services, icon: <FiTool />, color: 'bg-green-500', link: '/admin/services' },
        { title: 'Gallery Images', value: stats.gallery, icon: <FiImage />, color: 'bg-purple-500', link: '/admin/gallery' },
        { title: 'New Enquiries', value: stats.newEnquiries, icon: <FiMail />, color: 'bg-red-500', link: '/admin/enquiries' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-8">Dashboard Overview</h1>
            
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {statCards.map((card, index) => (
                    <Link to={card.link} key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow flex items-center">
                        <div className={`w-14 h-14 rounded-full ${card.color} text-white flex items-center justify-center text-2xl mr-4`}>
                            {card.icon}
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">{card.title}</p>
                            <h3 className="text-3xl font-bold text-gray-800">{card.value}</h3>
                        </div>
                    </Link>
                ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Enquiries */}
                <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-primary">Recent Enquiries</h2>
                        <Link to="/admin/enquiries" className="text-secondary text-sm font-medium hover:underline">View All</Link>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {recentEnquiries.length > 0 ? (
                            recentEnquiries.map((enquiry) => (
                                <div key={enquiry._id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-gray-800">{enquiry.name}</h4>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                                            enquiry.status === 'New' ? 'bg-red-100 text-red-700' :
                                            enquiry.status === 'Contacted' ? 'bg-yellow-100 text-yellow-700' :
                                            enquiry.status === 'Converted' ? 'bg-green-100 text-green-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                            {enquiry.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-1">{enquiry.interestedService}</p>
                                    <p className="text-sm text-gray-500">{new Date(enquiry.createdAt).toLocaleDateString()}</p>
                                </div>
                            ))
                        ) : (
                            <div className="p-6 text-center text-gray-500">No recent enquiries</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

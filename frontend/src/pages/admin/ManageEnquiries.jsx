import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiTrash2 } from 'react-icons/fi';
import api from '../../utils/api';

const ManageEnquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        try {
            const { data } = await api.get('/enquiries');
            setEnquiries(data);
        } catch (error) {
            toast.error('Failed to fetch enquiries');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await api.put(`/enquiries/${id}`, { status: newStatus });
            toast.success('Status updated successfully');
            fetchEnquiries();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this enquiry?')) {
            try {
                await api.delete(`/enquiries/${id}`);
                toast.success('Enquiry deleted');
                fetchEnquiries();
            } catch (error) {
                toast.error('Failed to delete enquiry');
            }
        }
    };

    if (loading) {
        return <div className="flex justify-center py-10"><div className="w-10 h-10 border-4 border-t-secondary rounded-full animate-spin"></div></div>;
    }

    const statuses = ['New', 'Contacted', 'Follow-up', 'Converted', 'Closed'];

    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-8">Manage Enquiries</h1>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="p-4 font-semibold text-gray-600">Date</th>
                                <th className="p-4 font-semibold text-gray-600">Customer Info</th>
                                <th className="p-4 font-semibold text-gray-600">Interested In</th>
                                <th className="p-4 font-semibold text-gray-600">Message</th>
                                <th className="p-4 font-semibold text-gray-600">Status</th>
                                <th className="p-4 font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {enquiries.length > 0 ? (
                                enquiries.map((enquiry) => (
                                    <tr key={enquiry._id} className="hover:bg-gray-50">
                                        <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                                            {new Date(enquiry.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold text-gray-800">{enquiry.name}</div>
                                            <div className="text-sm text-gray-500">{enquiry.phone}</div>
                                            {enquiry.email && <div className="text-sm text-gray-500">{enquiry.email}</div>}
                                            <div className="text-sm text-gray-500">{enquiry.location}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-block bg-aqua-light text-secondary px-2 py-1 rounded text-xs font-medium">
                                                {enquiry.interestedService}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600 max-w-xs">
                                            <p className="line-clamp-3">{enquiry.message || '-'}</p>
                                        </td>
                                        <td className="p-4">
                                            <select
                                                value={enquiry.status}
                                                onChange={(e) => handleStatusChange(enquiry._id, e.target.value)}
                                                className={`text-sm rounded border-gray-300 shadow-sm px-2 py-1 outline-none font-medium ${
                                                    enquiry.status === 'New' ? 'bg-red-50 text-red-700 border-red-200' :
                                                    enquiry.status === 'Contacted' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                    enquiry.status === 'Converted' ? 'bg-green-50 text-green-700 border-green-200' :
                                                    'bg-gray-50 text-gray-700 border-gray-200'
                                                }`}
                                            >
                                                {statuses.map(status => (
                                                    <option key={status} value={status}>{status}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="p-4">
                                            <button 
                                                onClick={() => handleDelete(enquiry._id)}
                                                className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50 transition-colors"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-500">No enquiries found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageEnquiries;

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import api from '../../utils/api';

const ManageTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data } = await api.get('/testimonials');
            setTestimonials(data);
        } catch (error) {
            toast.error('Failed to fetch testimonials');
        } finally {
            setLoading(false);
        }
    };

    const openModal = (testimonial = null) => {
        if (testimonial) {
            setEditingId(testimonial._id);
            Object.keys(testimonial).forEach(key => setValue(key, testimonial[key]));
        } else {
            setEditingId(null);
            reset({
                customerName: '', location: '', rating: 5, 
                review: '', customerImage: '', isPublished: true
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        reset();
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            if (editingId) {
                await api.put(`/testimonials/${editingId}`, data);
                toast.success('Testimonial updated successfully');
            } else {
                await api.post('/testimonials', data);
                toast.success('Testimonial created successfully');
            }
            closeModal();
            fetchData();
        } catch (error) {
            toast.error('Operation failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            try {
                await api.delete(`/testimonials/${id}`);
                toast.success('Testimonial deleted');
                fetchData();
            } catch (error) {
                toast.error('Failed to delete testimonial');
            }
        }
    };

    if (loading) return <div className="flex justify-center py-10"><div className="w-10 h-10 border-4 border-t-secondary rounded-full animate-spin"></div></div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-primary">Manage Testimonials</h1>
                <button onClick={() => openModal()} className="btn-primary flex items-center px-4 py-2">
                    <FiPlus className="mr-2" /> Add Testimonial
                </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="p-4 font-semibold text-gray-600">Customer</th>
                                <th className="p-4 font-semibold text-gray-600">Location</th>
                                <th className="p-4 font-semibold text-gray-600">Rating</th>
                                <th className="p-4 font-semibold text-gray-600">Review</th>
                                <th className="p-4 font-semibold text-gray-600">Status</th>
                                <th className="p-4 font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {testimonials.map((testimonial) => (
                                <tr key={testimonial._id} className="hover:bg-gray-50">
                                    <td className="p-4 font-bold text-gray-800">{testimonial.customerName}</td>
                                    <td className="p-4 text-sm text-gray-500">{testimonial.location}</td>
                                    <td className="p-4 text-sm text-yellow-500">{testimonial.rating} / 5</td>
                                    <td className="p-4 text-sm text-gray-600 max-w-xs truncate">{testimonial.review}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${testimonial.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {testimonial.isPublished ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex space-x-2">
                                            <button onClick={() => openModal(testimonial)} className="text-blue-500 hover:bg-blue-50 p-2 rounded"><FiEdit /></button>
                                            <button onClick={() => handleDelete(testimonial._id)} className="text-red-500 hover:bg-red-50 p-2 rounded"><FiTrash2 /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-primary">{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 text-2xl"><FiX /></button>
                        </div>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                                <input type="text" {...register("customerName", { required: true })} className="w-full px-4 py-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                                <input type="text" {...register("location", { required: true })} className="w-full px-4 py-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                                <input type="number" min="1" max="5" {...register("rating", { required: true, min: 1, max: 5 })} className="w-full px-4 py-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Review *</label>
                                <textarea {...register("review", { required: true })} rows="4" className="w-full px-4 py-2 border rounded-md"></textarea>
                            </div>
                            
                            <label className="flex items-center space-x-2 mt-2">
                                <input type="checkbox" {...register("isPublished")} className="rounded text-secondary" />
                                <span>Published</span>
                            </label>
                            
                            <div className="flex justify-end pt-4 border-t border-gray-100 mt-6">
                                <button type="button" onClick={closeModal} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-2">Cancel</button>
                                <button type="submit" disabled={isSubmitting} className="btn-primary px-6 py-2">
                                    {isSubmitting ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageTestimonials;

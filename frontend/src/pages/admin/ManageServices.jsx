import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiPlus, FiX, FiUploadCloud, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import api from '../../utils/api';

const ManageServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const { register, handleSubmit, reset, setValue, getValues, watch } = useForm();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data } = await api.get('/services');
            setServices(data);
        } catch (error) {
            toast.error('Failed to fetch services');
        } finally {
            setLoading(false);
        }
    };

    const openModal = (service = null) => {
        if (service) {
            setEditingId(service._id);
            Object.keys(service).forEach(key => {
                if (key === 'features' || key === 'benefits' || key === 'galleryImages') {
                    setValue(key, service[key].join('\n'));
                } else if (key === 'faq') {
                    setValue(key, JSON.stringify(service[key], null, 2));
                } else {
                    setValue(key, service[key]);
                }
            });
        } else {
            setEditingId(null);
            reset({
                name: '', slug: '', category: 'Swimming Pools', shortDescription: '', 
                detailedDescription: '', features: '', benefits: '', mainImage: '', 
                galleryImages: '', faq: '[]', displayOrder: 0, isPublished: true
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
        
        let parsedFaq = [];
        try {
            parsedFaq = JSON.parse(data.faq || '[]');
        } catch (e) {
            toast.error('Invalid FAQ JSON format');
            setIsSubmitting(false);
            return;
        }

        const formattedData = {
            ...data,
            slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
            features: data.features ? data.features.split('\n').filter(Boolean) : [],
            benefits: data.benefits ? data.benefits.split('\n').filter(Boolean) : [],
            galleryImages: data.galleryImages ? data.galleryImages.split('\n').filter(Boolean) : [],
            faq: parsedFaq
        };

        try {
            if (editingId) {
                await api.put(`/services/${editingId}`, formattedData);
                toast.success('Service updated successfully');
            } else {
                await api.post('/services', formattedData);
                toast.success('Service created successfully');
            }
            closeModal();
            fetchData();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await api.delete(`/services/${id}`);
                toast.success('Service deleted');
                fetchData();
            } catch (error) {
                toast.error('Failed to delete service');
            }
        }
    };

    const handleFileUpload = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setUploadingImage(true);
        try {
            const { data } = await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            if (field === 'mainImage') {
                setValue('mainImage', data.url);
            } else if (field === 'galleryImages') {
                const currentVal = getValues('galleryImages') || '';
                const newVal = currentVal ? `${currentVal}\n${data.url}` : data.url;
                setValue('galleryImages', newVal);
            }
            toast.success('Image uploaded successfully');
        } catch (error) {
            toast.error('Failed to upload image');
        } finally {
            setUploadingImage(false);
        }
    };

    const moveItem = (field, index, direction) => {
        const str = getValues(field);
        if (!str) return;
        const arr = str.split('\n').filter(Boolean);
        if (direction === -1 && index > 0) {
            [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
        } else if (direction === 1 && index < arr.length - 1) {
            [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
        }
        setValue(field, arr.join('\n'));
    };

    const removeItem = (field, index) => {
        const str = getValues(field);
        if (!str) return;
        const arr = str.split('\n').filter(Boolean);
        arr.splice(index, 1);
        setValue(field, arr.join('\n'));
    };

    const watchedGallery = watch('galleryImages')?.split('\n').filter(Boolean) || [];

    if (loading) return <div className="flex justify-center py-10"><div className="w-10 h-10 border-4 border-t-secondary rounded-full animate-spin"></div></div>;

    const categories = ['Swimming Pools', 'Water Features', 'Recreational Water Features'];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-primary">Manage Services</h1>
                <button onClick={() => openModal()} className="btn-primary flex items-center px-4 py-2">
                    <FiPlus className="mr-2" /> Add Service
                </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="p-4 font-semibold text-gray-600">Image</th>
                                <th className="p-4 font-semibold text-gray-600">Name</th>
                                <th className="p-4 font-semibold text-gray-600">Category</th>
                                <th className="p-4 font-semibold text-gray-600">Order</th>
                                <th className="p-4 font-semibold text-gray-600">Status</th>
                                <th className="p-4 font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {services.map((service) => (
                                <tr key={service._id} className="hover:bg-gray-50">
                                    <td className="p-4">
                                        <img src={service.mainImage || 'https://via.placeholder.com/150'} alt={service.name} className="w-16 h-16 object-cover rounded" />
                                    </td>
                                    <td className="p-4 font-bold text-gray-800">{service.name}</td>
                                    <td className="p-4 text-sm text-gray-500">{service.category}</td>
                                    <td className="p-4 text-sm text-gray-500">{service.displayOrder}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${service.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {service.isPublished ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex space-x-2">
                                            <button onClick={() => openModal(service)} className="text-blue-500 hover:bg-blue-50 p-2 rounded"><FiEdit /></button>
                                            <button onClick={() => handleDelete(service._id)} className="text-red-500 hover:bg-red-50 p-2 rounded"><FiTrash2 /></button>
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
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                            <h2 className="text-2xl font-bold text-primary">{editingId ? 'Edit Service' : 'Add Service'}</h2>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 text-2xl"><FiX /></button>
                        </div>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Name *</label>
                                    <input type="text" {...register("name", { required: true })} className="w-full px-4 py-2 border rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                                    <select {...register("category", { required: true })} className="w-full px-4 py-2 border rounded-md">
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Main Image *</label>
                                    <div className="flex items-center space-x-4">
                                        {getValues("mainImage") && (
                                            <div className="w-20 h-20 rounded overflow-hidden shadow-sm border border-gray-200">
                                                <img src={getValues("mainImage")} className="w-full h-full object-cover" alt="Preview" />
                                            </div>
                                        )}
                                        <input type="hidden" {...register("mainImage", { required: true })} />
                                        <label className="cursor-pointer bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center shadow-sm transition-colors">
                                            <FiUploadCloud className="mr-2" />
                                            {uploadingImage ? 'Uploading...' : 'Upload Image'}
                                            <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'mainImage')} accept="image/*,video/*" disabled={uploadingImage} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
                                <textarea {...register("shortDescription", { required: true })} rows="2" className="w-full px-4 py-2 border rounded-md"></textarea>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description *</label>
                                <textarea {...register("detailedDescription", { required: true })} rows="5" className="w-full px-4 py-2 border rounded-md"></textarea>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Features (One per line)</label>
                                    <textarea {...register("features")} rows="4" className="w-full px-4 py-2 border rounded-md"></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Benefits (One per line)</label>
                                    <textarea {...register("benefits")} rows="4" className="w-full px-4 py-2 border rounded-md"></textarea>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="block text-sm font-medium text-gray-700">Gallery Image URLs (One per line)</label>
                                    <label className="cursor-pointer text-xs bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-2 py-1 rounded flex items-center transition-colors">
                                        <FiUploadCloud className="mr-1" />
                                        Upload & Append
                                        <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'galleryImages')} accept="image/*,video/*" disabled={uploadingImage} />
                                    </label>
                                </div>
                                <textarea {...register("galleryImages")} rows="4" className="w-full px-4 py-2 border rounded-md"></textarea>
                                
                                {/* Gallery Previews */}
                                {watchedGallery.length > 0 && (
                                    <div className="mt-2 flex gap-2 overflow-x-auto custom-scrollbar pb-2">
                                        {watchedGallery.map((url, i) => (
                                            <div key={i} className="relative w-20 h-20 rounded border border-gray-200 shrink-0 group">
                                                {url.match(/\.(mp4|mov|avi|mkv)$/i) || url.includes('/video/upload/') ? (
                                                    <video src={url} className="w-full h-full object-cover" />
                                                ) : (
                                                    <img src={url} className="w-full h-full object-cover" alt="" />
                                                )}
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                                                    {i > 0 && <button type="button" onClick={() => moveItem('galleryImages', i, -1)} className="text-white hover:text-primary"><FiArrowLeft size={14}/></button>}
                                                    <button type="button" onClick={() => removeItem('galleryImages', i)} className="text-white hover:text-red-500"><FiTrash2 size={14}/></button>
                                                    {i < watchedGallery.length - 1 && <button type="button" onClick={() => moveItem('galleryImages', i, 1)} className="text-white hover:text-primary"><FiArrowRight size={14}/></button>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">FAQ (JSON format: [{`{"question": "Q", "answer": "A"}`}, ...])</label>
                                <textarea {...register("faq")} rows="4" className="w-full px-4 py-2 border rounded-md font-mono text-sm"></textarea>
                            </div>
                            
                            <div className="flex space-x-6 items-center">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                                    <input type="number" {...register("displayOrder")} className="w-32 px-4 py-2 border rounded-md" />
                                </div>
                                <label className="flex items-center space-x-2 mt-6">
                                    <input type="checkbox" {...register("isPublished")} className="rounded text-secondary" />
                                    <span>Published</span>
                                </label>
                            </div>
                            
                            <div className="flex justify-end pt-4 border-t border-gray-100">
                                <button type="button" onClick={closeModal} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 mr-4">Cancel</button>
                                <button type="submit" disabled={isSubmitting} className="btn-primary px-8 py-2">
                                    {isSubmitting ? 'Saving...' : 'Save Service'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageServices;

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiPlus, FiX, FiUploadCloud } from 'react-icons/fi';
import api from '../../utils/api';

const ManageGallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadingMedia, setUploadingMedia] = useState(false);

    const { register, handleSubmit, reset, setValue, watch } = useForm();
    const mediaTypeWatcher = watch('mediaType', 'image');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data } = await api.get('/gallery');
            setImages(data);
        } catch (error) {
            toast.error('Failed to fetch gallery');
        } finally {
            setLoading(false);
        }
    };

    const openModal = (item = null) => {
        if (item) {
            setEditingId(item._id);
            Object.keys(item).forEach(key => setValue(key, item[key]));
        } else {
            setEditingId(null);
            reset({
                imageUrl: '', publicId: 'dummy_id', title: '', 
                category: 'Swimming Pools', displayOrder: 0, isPublished: true, mediaType: 'image'
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
                await api.put(`/gallery/${editingId}`, data);
                toast.success('Updated successfully');
            } else {
                await api.post('/gallery', data);
                toast.success('Added successfully');
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
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await api.delete(`/gallery/${id}`);
                toast.success('Deleted successfully');
                fetchData();
            } catch (error) {
                toast.error('Failed to delete');
            }
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setUploadingMedia(true);
        try {
            const { data } = await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setValue('imageUrl', data.url);
            setValue('publicId', data.public_id);
            setValue('mediaType', data.resource_type === 'video' ? 'video' : 'image');
            toast.success('File uploaded to Cloudinary');
        } catch (error) {
            toast.error('Failed to upload file');
            console.error(error);
        } finally {
            setUploadingMedia(false);
        }
    };

    if (loading) return <div className="flex justify-center py-10"><div className="w-10 h-10 border-4 border-t-secondary rounded-full animate-spin"></div></div>;

    const categories = ['Swimming Pools', 'FRP Pools', 'Civil Pools', 'Fountains', 'Waterfalls', 'Rain Dance'];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-primary">Manage Gallery</h1>
                <button onClick={() => openModal()} className="btn-primary flex items-center px-4 py-2">
                    <FiPlus className="mr-2" /> Add Media
                </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {images.map((item) => (
                    <div key={item._id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden relative group">
                        {item.mediaType === 'video' ? (
                            <video src={item.imageUrl} className="w-full h-40 object-cover" controls muted />
                        ) : (
                            <img src={item.imageUrl} alt={item.title || 'Gallery'} className="w-full h-40 object-cover" />
                        )}
                        
                        <div className="p-3">
                            <p className="text-xs font-bold text-secondary">{item.category}</p>
                            <p className="text-sm font-medium text-gray-800 truncate">{item.title || 'Untitled'}</p>
                        </div>
                        <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => openModal(item)} className="bg-white text-blue-500 p-1.5 rounded shadow"><FiEdit /></button>
                            <button onClick={() => handleDelete(item._id)} className="bg-white text-red-500 p-1.5 rounded shadow"><FiTrash2 /></button>
                        </div>
                        {!item.isPublished && (
                            <div className="absolute top-2 left-2 bg-gray-800/80 text-white text-xs px-2 py-1 rounded">Draft</div>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-primary">{editingId ? 'Edit Media' : 'Add Media'}</h2>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 text-2xl"><FiX /></button>
                        </div>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Upload File (Image/Video)</label>
                                <div className="flex items-center space-x-4">
                                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center transition-colors">
                                        <FiUploadCloud className="mr-2" />
                                        {uploadingMedia ? 'Uploading...' : 'Choose File'}
                                        <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*,video/*" disabled={uploadingMedia} />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Media URL (Auto-filled on upload)</label>
                                <input type="text" {...register("imageUrl", { required: true })} className="w-full px-4 py-2 border rounded-md bg-gray-50" readOnly />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Media Type</label>
                                    <select {...register("mediaType")} className="w-full px-4 py-2 border rounded-md">
                                        <option value="image">Image</option>
                                        <option value="video">Video</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                                    <select {...register("category", { required: true })} className="w-full px-4 py-2 border rounded-md">
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title / Alt Text</label>
                                <input type="text" {...register("title")} className="w-full px-4 py-2 border rounded-md" />
                            </div>
                            
                            <div className="flex space-x-6 items-center">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                                    <input type="number" {...register("displayOrder")} className="w-24 px-4 py-2 border rounded-md" />
                                </div>
                                <label className="flex items-center space-x-2 mt-6">
                                    <input type="checkbox" {...register("isPublished")} className="rounded text-secondary" />
                                    <span>Published</span>
                                </label>
                            </div>
                            
                            <div className="flex justify-end pt-4 border-t border-gray-100 mt-6">
                                <button type="button" onClick={closeModal} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-2">Cancel</button>
                                <button type="submit" disabled={isSubmitting || uploadingMedia} className="btn-primary px-6 py-2">
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

export default ManageGallery;

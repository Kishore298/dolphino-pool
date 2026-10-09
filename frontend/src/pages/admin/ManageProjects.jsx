import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiPlus, FiX, FiUploadCloud, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import api from '../../utils/api';

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
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
            const [projectsRes, servicesRes] = await Promise.all([
                api.get('/projects?category=All'),
                api.get('/services')
            ]);
            setProjects(projectsRes.data);
            setServices(servicesRes.data);
        } catch (error) {
            toast.error('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const openModal = (project = null) => {
        if (project) {
            setEditingId(project._id);
            // Pre-fill form
            Object.keys(project).forEach(key => {
                if (key === 'scopeOfWork' || key === 'galleryImages' || key === 'projectVideos') {
                    setValue(key, project[key].join('\n'));
                } else if (key === 'relatedServices') {
                    setValue(key, project[key].map(s => s._id || s));
                } else {
                    setValue(key, project[key]);
                }
            });
        } else {
            setEditingId(null);
            reset({
                name: '', slug: '', category: 'Civil Pool', location: '', 
                description: '', scopeOfWork: '', mainImage: '', galleryImages: '', projectVideos: '',
                isFeatured: false, isPublished: true, relatedServices: []
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
        
        // Format arrays
        const formattedData = {
            ...data,
            slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
            scopeOfWork: data.scopeOfWork ? data.scopeOfWork.split('\n').filter(Boolean) : [],
            galleryImages: data.galleryImages ? data.galleryImages.split('\n').filter(Boolean) : [],
            projectVideos: data.projectVideos ? data.projectVideos.split('\n').filter(Boolean) : []
        };

        try {
            if (editingId) {
                await api.put(`/projects/${editingId}`, formattedData);
                toast.success('Project updated successfully');
            } else {
                await api.post('/projects', formattedData);
                toast.success('Project created successfully');
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
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await api.delete(`/projects/${id}`);
                toast.success('Project deleted');
                fetchData();
            } catch (error) {
                toast.error('Failed to delete project');
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
            } else if (field === 'projectVideos') {
                const currentVal = getValues('projectVideos') || '';
                const newVal = currentVal ? `${currentVal}\n${data.url}` : data.url;
                setValue('projectVideos', newVal);
            }
            toast.success('File uploaded successfully');
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

    const watchedVideos = watch('projectVideos')?.split('\n').filter(Boolean) || [];
    const watchedGallery = watch('galleryImages')?.split('\n').filter(Boolean) || [];

    if (loading) return <div className="flex justify-center py-10"><div className="w-10 h-10 border-4 border-t-secondary rounded-full animate-spin"></div></div>;

    const categories = ['Civil Pool', 'FRP Pool', 'Fountain', 'Waterfall', 'Rain Dance', 'Other'];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-primary">Manage Projects</h1>
                <button onClick={() => openModal()} className="btn-primary flex items-center px-4 py-2">
                    <FiPlus className="mr-2" /> Add Project
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
                                <th className="p-4 font-semibold text-gray-600">Location</th>
                                <th className="p-4 font-semibold text-gray-600">Status</th>
                                <th className="p-4 font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {projects.map((project) => (
                                <tr key={project._id} className="hover:bg-gray-50">
                                    <td className="p-4">
                                        <img src={project.mainImage || 'https://via.placeholder.com/150'} alt={project.name} className="w-16 h-16 object-cover rounded" />
                                    </td>
                                    <td className="p-4 font-bold text-gray-800">{project.name}</td>
                                    <td className="p-4 text-sm text-gray-500">{project.category}</td>
                                    <td className="p-4 text-sm text-gray-500">{project.location}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${project.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {project.isPublished ? 'Published' : 'Draft'}
                                        </span>
                                        {project.isFeatured && (
                                            <span className="ml-2 px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">Featured</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex space-x-2">
                                            <button onClick={() => openModal(project)} className="text-blue-500 hover:bg-blue-50 p-2 rounded"><FiEdit /></button>
                                            <button onClick={() => handleDelete(project._id)} className="text-red-500 hover:bg-red-50 p-2 rounded"><FiTrash2 /></button>
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
                            <h2 className="text-2xl font-bold text-primary">{editingId ? 'Edit Project' : 'Add Project'}</h2>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 text-2xl"><FiX /></button>
                        </div>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
                                    <input type="text" {...register("name", { required: true })} className="w-full px-4 py-2 border rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                                    <select {...register("category", { required: true })} className="w-full px-4 py-2 border rounded-md">
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                                    <input type="text" {...register("location", { required: true })} className="w-full px-4 py-2 border rounded-md" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Main Image *</label>
                                <div className="flex items-center space-x-4">
                                    {getValues("mainImage") && (
                                        <div className="w-20 h-20 rounded overflow-hidden shadow-sm border border-gray-200">
                                            {getValues("mainImage").match(/\.(mp4|mov|avi|mkv)$/i) || getValues("mainImage").includes('/video/upload/') ? (
                                                <video src={getValues("mainImage")} className="w-full h-full object-cover" muted />
                                            ) : (
                                                <img src={getValues("mainImage")} className="w-full h-full object-cover" alt="Preview" />
                                            )}
                                        </div>
                                    )}
                                    <input type="hidden" {...register("mainImage", { required: true })} />
                                    <label className="cursor-pointer bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center shadow-sm transition-colors shrink-0">
                                        <FiUploadCloud className="mr-2" />
                                        {uploadingImage ? 'Uploading...' : 'Upload Image/Video'}
                                        <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'mainImage')} accept="image/*,video/*" disabled={uploadingImage} />
                                    </label>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                                <textarea {...register("description", { required: true })} rows="4" className="w-full px-4 py-2 border rounded-md"></textarea>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Scope of Work (One per line)</label>
                                    <textarea {...register("scopeOfWork")} rows="4" className="w-full px-4 py-2 border rounded-md"></textarea>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="block text-sm font-medium text-gray-700">Project Videos (One URL per line)</label>
                                        <label className="cursor-pointer text-xs bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-2 py-1 rounded flex items-center transition-colors">
                                            <FiUploadCloud className="mr-1" />
                                            Upload & Append
                                            <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'projectVideos')} accept="video/*" disabled={uploadingImage} />
                                        </label>
                                    </div>
                                    <textarea {...register("projectVideos")} rows="3" className="w-full px-4 py-2 border rounded-md"></textarea>
                                    
                                    {/* Video Previews */}
                                    {watchedVideos.length > 0 && (
                                        <div className="mt-2 flex gap-2 overflow-x-auto custom-scrollbar pb-2">
                                            {watchedVideos.map((url, i) => (
                                                <div key={i} className="relative w-20 h-20 rounded border border-gray-200 shrink-0 group">
                                                    <video src={url} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                                                        {i > 0 && <button type="button" onClick={() => moveItem('projectVideos', i, -1)} className="text-white hover:text-primary"><FiArrowLeft size={14}/></button>}
                                                        <button type="button" onClick={() => removeItem('projectVideos', i)} className="text-white hover:text-red-500"><FiTrash2 size={14}/></button>
                                                        {i < watchedVideos.length - 1 && <button type="button" onClick={() => moveItem('projectVideos', i, 1)} className="text-white hover:text-primary"><FiArrowRight size={14}/></button>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
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
                                    <textarea {...register("galleryImages")} rows="3" className="w-full px-4 py-2 border rounded-md"></textarea>
                                    
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
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Related Services (Ctrl+Click to select multiple)</label>
                                <select multiple {...register("relatedServices")} className="w-full px-4 py-2 border rounded-md h-32">
                                    {services.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                                </select>
                            </div>
                            
                            <div className="flex space-x-6">
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" {...register("isPublished")} className="rounded text-secondary" />
                                    <span>Published</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" {...register("isFeatured")} className="rounded text-secondary" />
                                    <span>Featured Project</span>
                                </label>
                            </div>
                            
                            <div className="flex justify-end pt-4 border-t border-gray-100">
                                <button type="button" onClick={closeModal} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 mr-4">Cancel</button>
                                <button type="submit" disabled={isSubmitting} className="btn-primary px-8 py-2">
                                    {isSubmitting ? 'Saving...' : 'Save Project'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProjects;

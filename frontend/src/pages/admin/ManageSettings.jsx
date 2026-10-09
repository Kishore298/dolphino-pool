import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import api from '../../utils/api';

const ManageSettings = () => {
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await api.get('/settings');
                reset(data);
            } catch (error) {
                toast.error('Failed to fetch settings');
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, [reset]);

    const onSubmit = async (data) => {
        setIsSaving(true);
        try {
            await api.put('/settings', data);
            toast.success('Settings updated successfully');
        } catch (error) {
            toast.error('Failed to update settings');
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center py-10"><div className="w-10 h-10 border-4 border-t-secondary rounded-full animate-spin"></div></div>;
    }

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-primary mb-8">Site Settings</h1>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    
                    {/* General Info */}
                    <div>
                        <h3 className="text-xl font-bold text-primary mb-4 border-b pb-2">General Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                                <input type="text" {...register("businessName")} className="w-full px-4 py-2 border rounded-md" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold text-primary mb-4 border-b pb-2">Contact Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input type="text" {...register("phone")} className="w-full px-4 py-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number (incl country code)</label>
                                <input type="text" {...register("whatsapp")} className="w-full px-4 py-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" {...register("email")} className="w-full px-4 py-2 border rounded-md" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input type="text" {...register("address")} className="w-full px-4 py-2 border rounded-md" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Embed URL</label>
                                <input type="text" {...register("googleMapsUrl")} className="w-full px-4 py-2 border rounded-md" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Social Media */}
                    <div>
                        <h3 className="text-xl font-bold text-primary mb-4 border-b pb-2">Social Media Links</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
                                <input type="text" {...register("instagramUrl")} className="w-full px-4 py-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                                <input type="text" {...register("facebookUrl")} className="w-full px-4 py-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
                                <input type="text" {...register("youtubeUrl")} className="w-full px-4 py-2 border rounded-md" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Content Overrides */}
                    <div>
                        <h3 className="text-xl font-bold text-primary mb-4 border-b pb-2">Content Customization</h3>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Heading</label>
                                <input type="text" {...register("heroHeading")} className="w-full px-4 py-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subheading</label>
                                <input type="text" {...register("heroSubheading")} className="w-full px-4 py-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hero CTA Text</label>
                                <input type="text" {...register("ctaText")} className="w-full px-4 py-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">About Section Content</label>
                                <textarea rows="4" {...register("aboutContent")} className="w-full px-4 py-2 border rounded-md"></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Footer Content</label>
                                <textarea rows="2" {...register("footerContent")} className="w-full px-4 py-2 border rounded-md"></textarea>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-end pt-4">
                        <button 
                            type="submit" 
                            disabled={isSaving}
                            className="btn-primary py-3 px-8 flex items-center"
                        >
                            {isSaving ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManageSettings;

export const optimizeCloudinaryUrl = (url, type = 'image', width = 800) => {
    if (!url || !url.includes('cloudinary.com')) return url;
    
    // Check if the URL already has some transformations, to avoid stacking them
    if (url.includes('/upload/q_auto') || url.includes('/upload/w_')) {
        return url;
    }

    let transformations = `q_auto,f_auto,w_${width}`;
    
    // For videos, we can also use video codec auto
    if (type === 'video') {
        transformations += ',vc_auto';
    }

    return url.replace('/upload/', `/upload/${transformations}/`);
};

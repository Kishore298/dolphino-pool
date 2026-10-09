const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
    businessName: { type: String, default: 'Dolphino Swimming Pool Construction' },
    phone: { type: String },
    whatsapp: { type: String },
    email: { type: String },
    address: { type: String },
    googleMapsUrl: { type: String },
    instagramUrl: { type: String },
    facebookUrl: { type: String },
    youtubeUrl: { type: String },
    
    heroHeading: { type: String, default: 'Swimming Pools & Water Features Designed for Your Space' },
    heroSubheading: { type: String, default: 'Professional swimming pool construction and water-feature solutions across Tamil Nadu.' },
    ctaText: { type: String, default: 'Get a Free Quote' },
    
    aboutContent: { type: String },
    serviceAreas: { type: String },
    footerContent: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);

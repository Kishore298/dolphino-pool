const mongoose = require('mongoose');
const dns = require("node:dns");

// Force Node.js to use public DNS servers to resolve MongoDB SRV records
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
const SiteSettings = require('./models/SiteSettings');
const Service = require('./models/Service');
const Project = require('./models/Project');
const Testimonial = require('./models/Testimonial');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dolphino');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        await connectDB();

        await Admin.deleteMany();
        const admin = new Admin({
            username: 'Dolphino',
            password: 'Dolphino@2026'
        });
        await admin.save();

        await SiteSettings.deleteMany();
        await SiteSettings.create({
            businessName: 'Dolphino Swimming Pool Construction',
            phone: '+91 98765 43210',
            whatsapp: '919876543210',
            email: 'info@dolphino.in',
            address: 'Chennai, Tamil Nadu, India'
        });

        // Delete existing data
        await Service.deleteMany();
        await Project.deleteMany();
        await Testimonial.deleteMany();

        // 1. Services
        const servicesData = [
            {
                name: 'Fiber swimming pool - FRP readymade swimming pool',
                slug: 'fiber-swimming-pool-frp',
                category: 'Swimming Pools',
                shortDescription: 'Quick-installation fiberglass pools with smooth finishes.',
                detailedDescription: 'Fiberglass Reinforced Plastic (FRP) pools are pre-molded shells installed directly into the ground. They offer quick installation, lower maintenance, and a smooth, non-porous surface that resists algae.',
                features: ['Quick installation', 'Smooth finish', 'Low maintenance'],
                benefits: ['Algae-resistant', 'Less chemical usage', 'Gentle on skin'],
                mainImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
                displayOrder: 1,
                isPublished: true
            },
            {
                name: 'Civil type swimming pool',
                slug: 'civil-type-swimming-pool',
                category: 'Swimming Pools',
                shortDescription: 'Custom-designed concrete swimming pools built to last.',
                detailedDescription: 'Our civil swimming pools are built using the highest quality concrete and reinforcement materials, offering unmatched durability and completely customizable shapes and sizes. Perfect for both residential and commercial applications.',
                features: ['Custom shapes and sizes', 'High durability', 'Premium tile finishing options'],
                benefits: ['Long lifespan', 'Increases property value', 'Completely tailored to your space'],
                mainImage: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800',
                galleryImages: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'],
                displayOrder: 2,
                isPublished: true
            },
            {
                name: 'Fountains - cascade water fall',
                slug: 'fountains-cascade-waterfall',
                category: 'Water Features',
                shortDescription: 'Elegant and dynamic cascading fountains.',
                detailedDescription: 'We design and construct beautiful cascading water fountains that enhance the aesthetic appeal of any landscape.',
                features: ['Recirculating water systems', 'Elegant cascade design', 'LED lighting integration'],
                mainImage: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800',
                displayOrder: 3,
                isPublished: true
            },
            {
                name: 'Ring fountain',
                slug: 'ring-fountain',
                category: 'Water Features',
                shortDescription: 'Stunning circular ring fountain installations.',
                detailedDescription: 'Circular ring fountains providing a breathtaking 360-degree water display, perfect for driveways and centerpieces.',
                features: ['360-degree display', 'Programmable jets'],
                mainImage: 'https://images.unsplash.com/photo-1519451996163-e5e54bb3f13f?w=800',
                displayOrder: 4,
                isPublished: true
            },
            {
                name: 'Glass fountain',
                slug: 'glass-fountain',
                category: 'Water Features',
                shortDescription: 'Modern glass water features.',
                detailedDescription: 'Sleek and modern glass fountains where water elegantly flows over a transparent or textured glass surface.',
                features: ['Modern aesthetic', 'Smooth water flow'],
                mainImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
                displayOrder: 5,
                isPublished: true
            },
            {
                name: 'Granite fountain',
                slug: 'granite-fountain',
                category: 'Water Features',
                shortDescription: 'Durable and classic granite stone fountains.',
                detailedDescription: 'Classic and heavy-duty granite fountains, offering a natural stone look and incredible durability for outdoor spaces.',
                features: ['Natural stone finish', 'High durability'],
                mainImage: 'https://plus.unsplash.com/premium_photo-1664188031535-c393bc3dc53f?w=800',
                displayOrder: 6,
                isPublished: true
            },
            {
                name: 'Readymade waterfall',
                slug: 'readymade-waterfall',
                category: 'Water Features',
                shortDescription: 'Pre-fabricated waterfall setups for quick installation.',
                detailedDescription: 'Quickly transform your garden or indoor space with our readymade waterfall units that require minimal installation time.',
                features: ['Quick setup', 'Self-contained system'],
                mainImage: 'https://images.unsplash.com/photo-1579290076231-645ee106fbe9?w=800',
                displayOrder: 7,
                isPublished: true
            },
            {
                name: 'Rain dance',
                slug: 'rain-dance',
                category: 'Recreational Water Features',
                shortDescription: 'Exciting rain dance setups for resorts and events.',
                detailedDescription: 'Our rain dance systems provide an exhilarating experience for resorts, clubs, and private farmhouses. We integrate high-pressure overhead nozzles with dynamic lighting and sound systems.',
                features: ['High-volume nozzles', 'Integrated drainage', 'Safe slip-resistant flooring options'],
                mainImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
                displayOrder: 8,
                isPublished: true
            }
        ];
        const createdServices = await Service.insertMany(servicesData);

        // 2. Projects
        const projectsData = [
            {
                name: 'Luxury Villa Pool',
                slug: 'luxury-villa-pool',
                category: 'Civil Pool',
                location: 'ECR, Chennai',
                description: 'A stunning infinity edge civil pool designed for a luxury sea-facing villa in ECR. Features imported glass mosaic tiles and underwater LED lighting.',
                scopeOfWork: ['Excavation & Civil Structure', 'Waterproofing', 'Filtration System Setup', 'Tile Finishing'],
                mainImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
                isFeatured: true,
                isPublished: true,
                relatedServices: [createdServices[0]._id]
            },
            {
                name: 'Grand Resort Fountain',
                slug: 'grand-resort-fountain',
                category: 'Fountain',
                location: 'Mahabalipuram',
                description: 'A massive multi-tiered cascading fountain at the entrance of a 5-star resort, complete with synchronized DMX lighting.',
                mainImage: 'https://images.unsplash.com/photo-1519451996163-e5e54bb3f13f?w=800',
                isFeatured: true,
                isPublished: true,
                relatedServices: [createdServices[2]._id]
            },
            {
                name: 'Farmhouse FRP Pool',
                slug: 'farmhouse-frp-pool',
                category: 'FRP Pool',
                location: 'Coimbatore',
                description: 'A beautifully integrated FRP pool installed in just 7 days at a private farmhouse, surrounded by natural stone decking.',
                mainImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
                isFeatured: false,
                isPublished: true,
                relatedServices: [createdServices[1]._id]
            }
        ];
        await Project.insertMany(projectsData);

        // 3. Testimonials
        const testimonialsData = [
            {
                customerName: 'Rajesh Kumar',
                location: 'Chennai',
                rating: 5,
                review: 'Dolphino transformed our backyard with a beautiful civil pool. The quality of workmanship and their professionalism was outstanding. Highly recommended!',
                isPublished: true
            },
            {
                customerName: 'Anita Desai',
                location: 'Coimbatore',
                rating: 5,
                review: 'We opted for an FRP pool for our farmhouse. The Dolphino team installed it perfectly within a week. Great finish and excellent service.',
                isPublished: true
            },
            {
                customerName: 'Karthik S.',
                location: 'Madurai',
                rating: 4,
                review: 'The rain dance setup at our resort is a huge hit among guests! The pressure and layout are just perfect. Thank you Dolphino.',
                isPublished: true
            }
        ];
        await Testimonial.insertMany(testimonialsData);

        console.log('Dummy Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}

seedData();

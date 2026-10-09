import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';

// Sections
import Hero from '../components/home/Hero';
import AboutPreview from '../components/home/AboutPreview';
import ServicesSection from '../components/home/ServicesSection';
import FeaturedProjects from '../components/home/FeaturedProjects';
import WhyChooseUs from '../components/home/WhyChooseUs';
import HowWeWork from '../components/home/HowWeWork';
import ProjectTypes from '../components/home/ProjectTypes';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CtaSection from '../components/home/CtaSection';
import SEO from '../components/SEO';

const Home = () => {
    const [settings, setSettings] = useState(null);
    const [services, setServices] = useState([]);
    const [projects, setProjects] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const [settingsRes, servicesRes, projectsRes, testimonialsRes] = await Promise.all([
                    api.get('/settings'),
                    api.get('/services'),
                    api.get('/projects?featured=true&limit=3'),
                    api.get('/testimonials')
                ]);

                setSettings(settingsRes.data);
                setServices(servicesRes.data);
                setProjects(projectsRes.data);
                setTestimonials(testimonialsRes.data);
            } catch (error) {
                console.error('Error fetching home data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHomeData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-secondary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <SEO title="Home" description={settings?.heroSubheading} />
            <Hero settings={settings} />
            <AboutPreview settings={settings} />
            <ServicesSection services={services} />
            <FeaturedProjects projects={projects} />
            <WhyChooseUs />
            <HowWeWork />
            <ProjectTypes />
            <TestimonialsSection testimonials={testimonials} />
            <CtaSection settings={settings} />
        </motion.div>
    );
};

export default Home;

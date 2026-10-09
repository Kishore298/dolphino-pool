import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';

// Layouts
import MainLayout from './components/MainLayout';
import AdminLayout from './components/admin/AdminLayout';
import ScrollToTop from './components/ScrollToTop';

// Public Pages
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import ManageProjects from './pages/admin/ManageProjects';
import ManageServices from './pages/admin/ManageServices';
import ManageGallery from './pages/admin/ManageGallery';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import ManageEnquiries from './pages/admin/ManageEnquiries';
import ManageSettings from './pages/admin/ManageSettings';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <ToastContainer position="top-right" autoClose={3000} />
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="services" element={<Services />} />
              <Route path="services/:slug" element={<ServiceDetails />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:slug" element={<ProjectDetails />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="projects" element={<ManageProjects />} />
              <Route path="services" element={<ManageServices />} />
              <Route path="gallery" element={<ManageGallery />} />
              <Route path="testimonials" element={<ManageTestimonials />} />
              <Route path="enquiries" element={<ManageEnquiries />} />
              <Route path="settings" element={<ManageSettings />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </Router>
    </HelmetProvider>
  );
}

export default App;

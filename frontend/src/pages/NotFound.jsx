import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center bg-gray-50 pt-24 px-4"
        >
            <div className="text-center max-w-lg">
                <h1 className="text-9xl font-bold text-secondary mb-4 drop-shadow-md">404</h1>
                <h2 className="text-3xl font-bold text-primary mb-6">Page Not Found</h2>
                <p className="text-gray-600 mb-8 text-lg">
                    Oops! The page you are looking for does not exist or has been moved. It might be lost in the depths of our pools.
                </p>
                <Link to="/" className="btn-primary inline-block">
                    Return to Homepage
                </Link>
            </div>
        </motion.div>
    );
};

export default NotFound;

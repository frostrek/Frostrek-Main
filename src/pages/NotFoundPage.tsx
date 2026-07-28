import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import SEO from '../components/seo/SEO';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center justify-center px-4 pt-20 relative overflow-hidden font-body">
            <SEO 
                title="Page Not Found | Frostrek AI"
                description="The page you are looking for does not exist."
                path="/404"
                noindex={true}
            />
            
            {/* Ambient Background Elements */}
            <style>{`
                #footer-careers-cta { display: none !important; }
            `}</style>
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-gradient-to-tr from-[#2D6A4F]/10 to-transparent rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-gradient-to-tl from-[#52B788]/10 to-transparent rounded-full blur-[100px]" />
            </div>

            <div className="max-w-3xl w-full text-center relative z-10">
                {/* 404 Typography */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, type: 'spring', bounce: 0.4 }}
                    className="relative inline-block"
                >
                    <h1 className="text-[120px] sm:text-[180px] md:text-[220px] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#2D6A4F] to-[#74C69D] leading-none select-none drop-shadow-sm font-serif mb-4">
                        404
                    </h1>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
                        Page Not Found
                    </h2>
                    <p className="text-base sm:text-lg text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
                        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/"
                            className="group flex items-center justify-center gap-2.5 bg-[#2D6A4F] text-white px-8 py-4 rounded-[1.25rem] font-semibold shadow-[0_8px_20px_rgba(45,106,79,0.2)] hover:bg-[#1B4332] hover:shadow-[0_12px_25px_rgba(45,106,79,0.3)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
                        >
                            <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                            Go back to Home
                        </Link>
                        
                        <button
                            onClick={() => navigate(-1)}
                            className="group flex items-center justify-center gap-2.5 bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-[1.25rem] font-semibold shadow-sm hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 hover:shadow hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1.5 transition-transform duration-300" />
                            Previous Page
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFoundPage;

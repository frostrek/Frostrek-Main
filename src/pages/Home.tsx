import HeroSection from '../components/home/HeroSection';
import AISolutionsShowcase from '../components/home/AISolutionsShowcase';
import OurServicesSection from '../components/home/OurServicesSection';
import TrustedBySection from '../components/home/TrustedBySection';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/home/FAQSection';
import CTASection from '../components/home/CTASection';

const Home = () => {
    return (
        <div className="min-h-screen relative bg-black">
            <HeroSection />
            <OurServicesSection />
            <AISolutionsShowcase />
            <TrustedBySection />
            <FeaturesSection />
            {/* <TestimonialsSection /> */}
            <FAQSection />
            <CTASection />
        </div>
    );
};

export default Home;

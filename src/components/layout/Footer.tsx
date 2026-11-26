import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, MapPin, ExternalLink, Phone, Mail, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../../utils/constants';
import FlipText from '../ui/FlipText';

const PRODUCTS_LINKS = [
  { name: 'Frosty Agent', href: '/products/frosty-agent' },
  { name: 'VettEdge', href: '/products/vettedge' },
  { name: 'Vedashi Herbals', href: '/products/vedashi-ecommerce' },
  { name: 'Hiring', href: '/products/hiyring' },
];

const SOLUTIONS_LINKS = [
  { name: 'AI Agents', href: '/solutions/ai-agents' },
  { name: 'AI Consulting & Roadmap', href: '/solutions/ai-consulting' },
  { name: 'Custom Software & AI', href: '/solutions/custom-software-ai-integration' },
  { name: 'Website Design & Development', href: '/solutions/website-development' },
  { name: 'Fintech & Custom Wallets', href: '/solutions/fintech-custom-wallets' },
  { name: 'Manufacturing Intelligence', href: '/solutions/manufacturing-intelligence' },
  { name: 'Voice AI', href: '/solutions/voice-ai' },
  { name: 'LLM Model Training', href: '/solutions/llm-model-training' },
  { name: 'LLM Evaluation & RLHF', href: '/solutions/llm-evaluation-rlhf' },
  { name: 'Managed AI Workforce', href: '/solutions/managed-ai-workforce' },
  { name: 'AI Visibility (SEO, AEO & GEO)', href: '/solutions/ai-visibility' },
];

const COMPANY_LINKS = [
  { name: 'About Us', href: '/about' },
  { name: 'Experience', href: '/experience' },
  { name: 'Case Studies', href: '/resources/case-studies' },
  { name: 'Blog', href: '/resources/blog' },
  { name: 'FAQ', href: '/resources/faq' },
  { name: 'Schedule Demo', href: '/schedule-demo' },
  { name: 'Contact', href: '/contact' },
];

const Footer = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  const footerRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for footer reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const handleLocationClick = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(COMPANY_INFO.address), '_blank');
  };

  return (
    <>
      <style>{`
        @keyframes footerReveal { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .footer-revealed { animation: footerReveal 300ms ease-out forwards; }
        
        .careers-card { transition: all 300ms ease-out; }
        .careers-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(45,106,79,0.06); }
        .careers-card:active { transform: translateY(2px); }
        .careers-icon { transition: opacity 200ms ease-out; }
        .careers-card:hover .careers-icon { opacity: 1; }
        @keyframes networkPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
        .network-node { animation: networkPulse 3s ease-in-out infinite; }
        .network-node:nth-child(1) { animation-delay: 0s; }
        .network-node:nth-child(2) { animation-delay: 0.6s; }
        .network-node:nth-child(3) { animation-delay: 1.2s; }
        .network-node:nth-child(4) { animation-delay: 1.8s; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* Careers Card - Hide on contact and AI Visibility solution pages */}
      {!['/contact', '/solutions/ai-visibility'].includes(location.pathname.replace(/\/$/, '')) && (
        <div id="footer-careers-cta" className="pt-4 pb-12 bg-brand-light-bg transition-colors duration-300 font-sans">
          <div className="container mx-auto px-4 md:px-6">
            <Link to="/contact" className="block max-w-4xl mx-auto">
              <div className="careers-card border-2 rounded-[2rem] p-8 md:p-10 cursor-pointer bg-white border-[#BAE6FD] hover:border-[#7DD3FC]/40">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left">
                  <div className="flex-shrink-0">
                    <svg className="careers-icon w-16 h-16 opacity-90 text-[#2D6A4F]" viewBox="0 0 64 64" fill="none">
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" />
                      <circle cx="32" cy="16" r="4" fill="currentColor" className="network-node" />
                      <circle cx="16" cy="32" r="4" fill="currentColor" className="network-node" />
                      <circle cx="48" cy="32" r="4" fill="currentColor" className="network-node" />
                      <circle cx="32" cy="48" r="4" fill="currentColor" className="network-node" />
                      <line x1="32" y1="20" x2="32" y2="28" stroke="currentColor" strokeWidth="2" />
                      <line x1="20" y1="32" x2="28" y2="32" stroke="currentColor" strokeWidth="2" />
                      <line x1="36" y1="32" x2="44" y2="32" stroke="currentColor" strokeWidth="2" />
                      <line x1="32" y1="36" x2="32" y2="44" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-serif font-bold mb-2 flex items-center justify-center md:justify-start gap-2 text-[#2D6A4F]">
                      Build the Future of AI at Frostrek
                      <Sparkles className="w-5 h-5 text-[#336B55]" />
                    </h3>
                    <p className="text-base text-gray-500 font-medium">
                      Join our team of innovators solving real-world problems.
                    </p>
                  </div>
                  <div className="flex-shrink-0 mt-4 md:mt-0">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-brand-badge-bg text-[#2D6A4F] font-bold text-2xl border border-[#c4e0d4]/50 shadow-sm">
                      &rarr;
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Main Footer Container */}
      <footer
        ref={footerRef}
        className={`border-t border-[#E6EFE6] bg-white transition-opacity duration-300 font-sans ${isVisible ? 'footer-revealed' : 'opacity-0'}`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-10 lg:pt-12 pb-5 lg:pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-0">
            
            {/* ─── Column 1: Brand & Contact Info (3/12 cols) ─── */}
            <div className="lg:col-span-3 lg:pr-8 lg:border-r border-gray-200/80 flex flex-col space-y-4">
              <div>
                {/* Brand Logo */}
                <Link to="/" className="inline-flex items-center gap-1.5 group mb-1.5">
                  <img
                    src="/logonew.png"
                    alt="Frostrek AI Logo"
                    className="h-8 sm:h-9 w-auto transition-transform group-hover:scale-105"
                    loading="lazy"
                    width={512}
                    height={512}
                  />
                  <FlipText className="text-[1.35rem] sm:text-[1.45rem] font-bold font-sans text-gray-900 tracking-tight">
                    frostrek
                  </FlipText>
                </Link>

                {/* Subtitle Tagline */}
                <p className="text-[12px] sm:text-[12.5px] font-medium text-gray-500 tracking-tight mb-4">
                  AI Data &bull; AI Agents &bull; Automation
                </p>

                {/* Contact List */}
                <div className="space-y-2.5 text-[12.5px] text-gray-600 leading-snug">
                  {/* Address */}
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                    <span>
                      4th Floor, JMD Empire, 455, Golf Course Ext Rd, Sector 62, Gurugram, Haryana 122098, India
                    </span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                    <a href="tel:+916399999955" className="hover:text-[#2D6A4F] transition-colors font-medium">
                      +91 6399999955
                    </a>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                    <a href={`mailto:${COMPANY_INFO.contact}`} className="hover:text-[#2D6A4F] transition-colors font-medium">
                      {COMPANY_INFO.contact}
                    </a>
                  </div>
                </div>

                {/* Social Icons (Brought close to contact@frostrek.com) */}
                <div className="flex items-center gap-2.5 pt-4">
                  <a
                    href={COMPANY_INFO.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our LinkedIn page"
                    className="w-9 h-9 rounded-lg border border-gray-200 bg-white hover:border-[#2D6A4F]/50 hover:bg-[#F4F9F6] flex items-center justify-center transition-all hover:-translate-y-0.5 shadow-2xs"
                  >
                    <img src="/linkedin.png" alt="LinkedIn" className="w-4 h-4 object-contain" loading="lazy" width={32} height={32} />
                  </a>

                  <a
                    href={COMPANY_INFO.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our Instagram page"
                    className="w-9 h-9 rounded-lg border border-gray-200 bg-white hover:border-[#2D6A4F]/50 hover:bg-[#F4F9F6] flex items-center justify-center transition-all hover:-translate-y-0.5 shadow-2xs"
                  >
                    <img src="/instagram.png" alt="Instagram" className="w-4 h-4 object-contain" loading="lazy" width={32} height={32} />
                  </a>

                  <a
                    href={COMPANY_INFO.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our YouTube channel"
                    className="w-9 h-9 rounded-lg border border-gray-200 bg-white hover:border-[#2D6A4F]/50 hover:bg-[#F4F9F6] flex items-center justify-center transition-all hover:-translate-y-0.5 shadow-2xs"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" fill="#FF0000" />
                      <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FFF" />
                    </svg>
                  </a>

                  <a
                    href={COMPANY_INFO.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our Facebook page"
                    className="w-9 h-9 rounded-lg border border-gray-200 bg-white hover:border-[#2D6A4F]/50 hover:bg-[#F4F9F6] flex items-center justify-center transition-all hover:-translate-y-0.5 shadow-2xs"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2" />
                      <path d="M16.671 15.542l.532-3.469h-3.328v-2.25c0-.949.465-1.874 1.956-1.874h1.514V5.006s-1.375-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.633H7.078v3.469h3.047v8.385a12.09 12.09 0 003.75 0v-8.385h2.796z" fill="#FFF" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* ─── Column 2: Products (2/12 cols) ─── */}
            <div className="lg:col-span-2 lg:px-8 lg:border-r border-gray-200/80">
              <div>
                <h3 className="font-bold text-[15px] sm:text-base text-[#2D6A4F] tracking-tight">
                  Products
                </h3>
                <div className="w-8 h-[2.5px] bg-[#2D6A4F] mt-1.5 mb-5 rounded-full" />
              </div>
              <ul className="space-y-2.5">
                {PRODUCTS_LINKS.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-[13px] sm:text-[13.5px] font-medium text-gray-600 hover:text-[#2D6A4F] transition-colors leading-relaxed block"
                    >
                      <FlipText>{item.name}</FlipText>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ─── Column 3: Solutions (3/12 cols) ─── */}
            <div className="lg:col-span-3 lg:px-8 lg:border-r border-gray-200/80">
              <div>
                <h3 className="font-bold text-[15px] sm:text-base text-[#2D6A4F] tracking-tight">
                  Solutions
                </h3>
                <div className="w-8 h-[2.5px] bg-[#2D6A4F] mt-1.5 mb-5 rounded-full" />
              </div>
              <ul className="space-y-2.5">
                {SOLUTIONS_LINKS.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-[13px] sm:text-[13.5px] font-medium text-gray-600 hover:text-[#2D6A4F] transition-colors leading-relaxed block"
                    >
                      <FlipText>{item.name}</FlipText>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ─── Column 4: Company (2/12 cols) ─── */}
            <div className="lg:col-span-2 lg:px-8 lg:border-r border-gray-200/80">
              <div>
                <h3 className="font-bold text-[15px] sm:text-base text-[#2D6A4F] tracking-tight">
                  Company
                </h3>
                <div className="w-8 h-[2.5px] bg-[#2D6A4F] mt-1.5 mb-5 rounded-full" />
              </div>
              <ul className="space-y-2.5">
                {COMPANY_LINKS.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-[13px] sm:text-[13.5px] font-medium text-gray-600 hover:text-[#2D6A4F] transition-colors leading-relaxed block"
                    >
                      <FlipText>{item.name}</FlipText>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ─── Column 5: Location (2/12 cols) ─── */}
            <div className="lg:col-span-2 lg:pl-8">
              <div>
                <h3 className="font-bold text-[15px] sm:text-base text-[#2D6A4F] tracking-tight">
                  Location
                </h3>
                <div className="w-8 h-[2.5px] bg-[#2D6A4F] mt-1.5 mb-5 rounded-full" />
              </div>

              {/* Interactive Static Map Preview */}
              <div
                ref={locationRef}
                onClick={handleLocationClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleLocationClick(); }}
                aria-label="Open Frostrek AI office location in Google Maps"
                className="relative w-full h-40 md:h-48 rounded-2xl overflow-hidden shadow-sm border border-[#E6EFE6] bg-[#F4F8F6] hover:shadow-md cursor-pointer transition-all duration-300 group hover:border-[#2D6A4F]/30 select-none"
              >
                {/* Stylized Vector Map Background */}
                <svg className="absolute inset-0 w-full h-full object-cover opacity-65 group-hover:opacity-85 transition-opacity duration-300" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                  {/* Area shading */}
                  <rect width="400" height="200" fill="#EDF5F0" />
                  <path d="M-20 60 C80 90, 160 30, 240 70 C320 110, 380 40, 420 80 L420 220 L-20 220 Z" fill="#E2EEE6" />

                  {/* Road Network Lines */}
                  <path d="M-10 40 L410 160" stroke="#CBDED4" strokeWidth="6" strokeLinecap="round" />
                  <path d="M120 -10 L190 210" stroke="#CBDED4" strokeWidth="8" strokeLinecap="round" />
                  <path d="M-10 130 L410 70" stroke="#DAEAE1" strokeWidth="4" />
                  <path d="M280 -10 L250 210" stroke="#DAEAE1" strokeWidth="5" />
                  <path d="M70 -10 L330 210" stroke="#E6F2EB" strokeWidth="3" />
                  <path d="M-10 95 L410 115" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="4 4" />
                  <path d="M185 -10 L185 210" stroke="#FFFFFF" strokeWidth="2" />
                  <path d="M-10 160 Q 150 140 280 180 T 410 130" stroke="#CBDED4" strokeWidth="5" fill="none" />

                  {/* Landmark building blocks */}
                  <rect x="140" y="70" width="35" height="25" rx="3" fill="#B7D9C7" fillOpacity="0.6" />
                  <rect x="210" y="55" width="28" height="40" rx="3" fill="#B7D9C7" fillOpacity="0.6" />
                  <rect x="150" y="110" width="45" height="30" rx="3" fill="#B7D9C7" fillOpacity="0.5" />
                </svg>

                {/* Pulsing Pin Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                  <span className="absolute w-12 h-12 rounded-full bg-[#2D6A4F]/20 animate-ping" />
                  <span className="absolute w-7 h-7 rounded-full bg-[#2D6A4F]/30" />
                  <div className="relative z-10 w-9 h-9 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center shadow-lg shadow-[#2D6A4F]/40 transform group-hover:scale-110 transition-transform duration-300">
                    <MapPin size={18} className="text-white fill-white" />
                  </div>
                </div>

                {/* Hover "Open in Maps" overlay indicator */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-[#2D6A4F] px-2 py-1 rounded-md shadow-md">
                    Open Map <ExternalLink size={10} />
                  </span>
                </div>

                {/* Address Badge */}
                <div className="absolute bottom-3 left-3 z-[400]">
                  <div className="px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-md bg-white/95 border border-[#E6EFE6] text-[#2D6A4F] flex flex-col gap-0.5 group-hover:border-[#2D6A4F]/30 transition-colors">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-[#336B55]" />
                      <span className="text-[11px] font-bold">JMD Empire, Sector 62</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ─── Frostrek Green Bottom Strip ─── */}
        <div className="bg-[#2D6A4F] text-white text-xs md:text-[13px] font-medium py-3.5 px-4 md:px-8 border-t border-[#235840]">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-center md:text-left">
            
            {/* Left: Enterprise Trust Markings */}
            <div className="flex items-center justify-center md:justify-start gap-3 md:w-1/3">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span className="font-semibold text-white tracking-wide">SOC 2 Ready Architecture</span>
              </div>
            </div>

            {/* Center: Copyright */}
            <div className="text-white md:w-1/3 text-center font-medium">
              &copy; {currentYear} Frostrek AI. All rights reserved.
            </div>

            {/* Right: Legal Links */}
            <div className="flex items-center justify-center md:justify-end gap-3 text-white md:w-1/3 font-medium">
              <Link to="/privacy-policy" className="text-white hover:underline transition-all">
                Privacy Policy
              </Link>
              <span className="text-white/40">|</span>
              <Link to="/terms-and-conditions" className="text-white hover:underline transition-all">
                Terms &amp; Conditions
              </Link>
            </div>

          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
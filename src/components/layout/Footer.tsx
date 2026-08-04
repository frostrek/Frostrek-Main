import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, MapPin, ExternalLink } from 'lucide-react';
import { NAV_ITEMS, COMPANY_INFO } from '../../utils/constants';
import FlipText from '../ui/FlipText';



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
        @keyframes underlineExpand { from { width: 0; } to { width: 100%; } }
        @keyframes linkFadeIn { from { opacity: 0; transform: translateX(-4px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes networkPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }

        .footer-revealed { animation: footerReveal 300ms ease-out forwards; }
        .section-title { position: relative; display: inline-block; }
        .section-title::after { content: ''; position: absolute; bottom: -4px; left: 0; height: 2px; background: #2D6A4F; width: 0; }
        .footer-revealed .section-title::after { animation: underlineExpand 400ms ease-out 150ms forwards; }
        .footer-link { position: relative; display: inline-block; transition: color 150ms ease-out; }
        .footer-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 100%; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: left; transition: transform 200ms ease-out; }
        .footer-link:hover::after { transform: scaleX(1); }
        .footer-revealed .footer-link { animation: linkFadeIn 300ms ease-out forwards; }
        
        .careers-card { transition: all 300ms ease-out; }
        .careers-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(45,106,79,0.06); }
        .careers-card:active { transform: translateY(2px); }
        .careers-icon { transition: opacity 200ms ease-out; }
        .careers-card:hover .careers-icon { opacity: 1; }
        .network-node { animation: networkPulse 3s ease-in-out infinite; }
        .network-node:nth-child(1) { animation-delay: 0s; }
        .network-node:nth-child(2) { animation-delay: 0.6s; }
        .network-node:nth-child(3) { animation-delay: 1.2s; }
        .network-node:nth-child(4) { animation-delay: 1.8s; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* Careers Card - Hide on contact page */}
      {location.pathname !== '/contact' && (
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
                      →
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        ref={footerRef}
        className={`border-t pt-8 pb-4 transition-colors duration-300 font-sans ${isVisible ? 'footer-revealed' : 'opacity-0'} bg-[#F8FAF9] border-[#E6EFE6]`}
      >
        <div className="container mx-auto px-4 md:px-6 max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-6">
            {/* Brand & Info (Left - Uses 3/12 cols) */}
            <div className="lg:col-span-3 space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3 group">
                  <Link to="/" className="flex items-center gap-1">
                    <img src="/logonew.png"
                      alt="Frostrek AI Logo"
                      className="h-9 w-auto transition-transform group-hover:scale-110" loading="lazy" width={512} height={512} />
                    <FlipText className="text-[1.35rem] font-black font-sans font-bold text-black">
                      frostrek
                    </FlipText>
                  </Link>
                </div>



                <div className="pt-0 flex flex-col gap-2 text-[13px] text-gray-500 font-medium" itemScope itemType="https://schema.org/LocalBusiness">
                  <span itemProp="name" className="sr-only">Frostrek AI</span>
                  <div className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                    <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                      <span itemProp="streetAddress">4th Floor, Jmd Empire, 455, Golf Course Ext Rd, Sector 62</span>,<br />
                      <span itemProp="addressLocality">Gurugram</span>, <span itemProp="addressRegion">Haryana</span> <span itemProp="postalCode">122102</span>, <span itemProp="addressCountry">India</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    <span itemProp="telephone">+91 6399999955</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                    <a href={`mailto:${COMPANY_INFO.contact}`} className="hover:text-[#2D6A4F] transition-colors">{COMPANY_INFO.contact}</a>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full max-w-[340px] space-y-8">
                {/* Social Icons */}
                <div className="flex items-center justify-between w-full">
                  <a href={COMPANY_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Visit our LinkedIn page" className="w-10 h-10 rounded-full flex items-center justify-center transition-all text-[#2D6A4F] hover:-translate-y-1"><img src="/linkedin.png" alt="Linkedin" className="w-6 h-6 object-contain transition-all hover:scale-110" loading="lazy" width={512} height={512} /></a>
                  <a href={COMPANY_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram page" className="w-10 h-10 rounded-full flex items-center justify-center transition-all text-[#2D6A4F] hover:-translate-y-1"><img src="/instagram.png" alt="Instagram" className="w-6 h-6 object-contain transition-all hover:scale-110" loading="lazy" width={512} height={512} /></a>
                  <a href={COMPANY_INFO.socials.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp" className="w-10 h-10 rounded-full flex items-center justify-center transition-all text-[#2D6A4F] hover:-translate-y-1"><img src="/whatsapp.png" alt="WhatsApp" className="w-6 h-6 object-contain transition-all hover:scale-110" loading="lazy" width={512} height={512} /></a>
                  <a href={`mailto:${COMPANY_INFO.contact}`} aria-label="Send us an email" className="w-10 h-10 rounded-full flex items-center justify-center transition-all text-[#2D6A4F] hover:-translate-y-1"><img src="/gmail.png" alt="Gmail" className="w-8 h-8 object-contain transition-all hover:scale-110" loading="lazy" width={512} height={512} /></a>
                  <a href={COMPANY_INFO.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page" className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:-translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" className="transition-all hover:scale-110">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2" />
                      <path d="M16.671 15.542l.532-3.469h-3.328v-2.25c0-.949.465-1.874 1.956-1.874h1.514V5.006s-1.375-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.633H7.078v3.469h3.047v8.385a12.09 12.09 0 003.75 0v-8.385h2.796z" fill="#FFF" />
                    </svg>
                  </a>
                  <a href={COMPANY_INFO.socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="Visit our YouTube channel" className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:-translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" className="transition-all hover:scale-110">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" fill="#FF0000" />
                      <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FFF" />
                    </svg>
                  </a>
                </div>

                {/* Certifications and Compliance Logos */}
                <div className="flex items-center justify-between w-full">
                  <img src="/images/ISO 27001.png" alt="ISO 27001:2022 certified — information security management" className="h-[38px] w-auto object-contain mix-blend-multiply drop-shadow-sm hover:scale-105 transition-transform" loading="lazy" />
                  <img src="/images/gdpr logo.jpg" alt="GDPR compliant — European data protection standards" className="h-[34px] w-auto object-contain mix-blend-multiply drop-shadow-sm hover:scale-105 transition-transform" loading="lazy" />
                  <img src="/images/ISO_9001-2015.svg.webp" alt="ISO 9001:2015 certified — quality management systems" className="h-[34px] w-auto object-contain mix-blend-multiply drop-shadow-sm hover:scale-105 transition-transform" loading="lazy" />
                  <img src="/optimized/hipaa-compliance-logo-health-insurance-260nw-1647036358.webp" alt="HIPAA compliant — health information privacy" className="h-[36px] w-auto object-contain mix-blend-multiply drop-shadow-sm hover:scale-105 transition-transform bg-white rounded-md" loading="lazy" />
                  <img src="/optimized/soc-2-compliant-certificate-badge-icon-clean-modern-design-symbolizing-verified-data.webp" alt="SOC 2 Type II compliant — data security and privacy" className="h-[38px] w-auto object-contain mix-blend-multiply drop-shadow-sm hover:scale-105 transition-transform bg-white rounded-md" loading="lazy" />
                </div>
              </div>
            </div>

            {/* Links (Right - Uses 9/12 cols) */}
            <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Products */}
              <div className="space-y-4">
                <h3 className="section-title font-bold text-xs uppercase tracking-widest text-[#2D6A4F]">Products</h3>
                <ul className="space-y-1.5">
                  {NAV_ITEMS.find(n => n.label === 'Products')?.megaMenu?.flatMap(s => s.items).slice(0, 7).map(item => (
                    <li key={item.name}>
                      <Link to={item.href} className="footer-link text-[13px] font-medium text-gray-500 hover:text-[#2D6A4F] group">
                        <FlipText>{item.name}</FlipText>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div className="space-y-4">
                <h3 className="section-title font-bold text-xs uppercase tracking-widest text-[#2D6A4F]">Solutions</h3>
                <ul className="space-y-1.5">
                  {NAV_ITEMS.find(n => n.label === 'Solutions')?.megaMenu?.flatMap(s => s.items).map(item => (
                    <li key={item.name}>
                      <Link to={item.href} className="footer-link text-[13px] font-medium text-gray-500 hover:text-[#2D6A4F] group">
                        <FlipText>{item.name}</FlipText>
                      </Link>
                    </li>
                  ))}

                </ul>
              </div>

              {/* Company */}
              <div className="space-y-4">
                <h3 className="section-title font-bold text-xs uppercase tracking-widest text-[#2D6A4F]">Company</h3>
                <ul className="space-y-1.5">
                  <li><Link to="/about" className="footer-link text-[13px] font-medium text-gray-500 hover:text-[#2D6A4F] group"><FlipText>About Us</FlipText></Link></li>
                  <li><Link to="/experience" className="footer-link text-[13px] font-medium text-gray-500 hover:text-[#2D6A4F] group"><FlipText>Experience</FlipText></Link></li>
                  <li><Link to="/resources/case-studies" className="footer-link text-[13px] font-medium text-gray-500 hover:text-[#2D6A4F] group"><FlipText>Case Studies</FlipText></Link></li>
                  <li><Link to="/resources/blog" className="footer-link text-[13px] font-medium text-gray-500 hover:text-[#2D6A4F] group"><FlipText>Blog</FlipText></Link></li>
                  <li><Link to="/resources/faq" className="footer-link text-[13px] font-medium text-gray-500 hover:text-[#2D6A4F] group"><FlipText>FAQ</FlipText></Link></li>
                  <li><Link to="/schedule-demo" className="footer-link text-[13px] font-medium text-gray-500 hover:text-[#2D6A4F] group"><FlipText>Schedule Demo</FlipText></Link></li>
                  <li><Link to="/contact" className="footer-link text-[13px] font-medium text-gray-500 hover:text-[#2D6A4F] group"><FlipText>Contact</FlipText></Link></li>
                </ul>
              </div>

              {/* Connect (Map only) */}
              <div className="space-y-4">
                <h3 className="font-bold text-xs uppercase tracking-widest text-[#2D6A4F]">Location</h3>

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

          <div className="text-center pt-4 border-t border-[#E6EFE6] text-sm font-medium text-gray-400">
            &copy; {currentYear} {COMPANY_INFO.name}. All rights reserved.
          </div>
        </div>
      </footer >
    </>
  );
};

export default Footer;
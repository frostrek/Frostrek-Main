import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, MapPin } from 'lucide-react';
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
        <div className="py-12 bg-brand-light-bg transition-colors duration-300 font-sans">
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
                  <Link to="/" className="flex items-center gap-3">
                    <img src="/logonew.png"
                      alt="Frostrek AI Logo"
                      className="h-9 w-auto transition-transform group-hover:scale-110" loading="lazy" width={512} height={512} />
                    <FlipText className="text-[1.35rem] font-black font-sans font-bold text-[#2D6A4F]">
                      frostrek
                    </FlipText>
                  </Link>
                  {/* ISO Badges */}
                  <div className="flex items-center gap-2">
                    <div className="iso-badge px-2.5 py-1 border rounded bg-white border-[#E6EFE6] text-[10px] font-bold tracking-wide text-[#2D6A4F] shadow-sm">
                      ISO 27001
                    </div>
                    <div className="iso-badge px-2.5 py-1 border rounded bg-white border-[#E6EFE6] text-[10px] font-bold tracking-wide text-[#2D6A4F] shadow-sm">
                      ISO 9001
                    </div>
                  </div>
                </div>

                <p className="text-[13px] leading-relaxed max-w-sm text-gray-500 font-medium">
                  Empowering industries through AI, automation, and innovation - one intelligent solution at a time.
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-3 flex-wrap">
                <a href={COMPANY_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white border border-[#E6EFE6] text-[#2D6A4F] shadow-sm hover:shadow-md hover:-translate-y-1"><img src="/linkedin.png" alt="Linkedin" className="w-6 h-6 object-contain transition-all hover:scale-110" loading="lazy" width={512} height={512} /></a>
                <a href={COMPANY_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white border border-[#E6EFE6] text-[#2D6A4F] shadow-sm hover:shadow-md hover:-translate-y-1"><img src="/instagram.png" alt="Instagram" className="w-6 h-6 object-contain transition-all hover:scale-110" loading="lazy" width={512} height={512} /></a>
                <a href="https://wa.me/17574722491" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white border border-[#E6EFE6] text-[#2D6A4F] shadow-sm hover:shadow-md hover:-translate-y-1"><img src="/whatsapp.png" alt="WhatsApp" className="w-6 h-6 object-contain transition-all hover:scale-110" loading="lazy" width={512} height={512} /></a>
                <a href="mailto:contact@frostrek.ai" className="w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white border border-[#E6EFE6] text-[#2D6A4F] shadow-sm hover:shadow-md hover:-translate-y-1"><img src="/gmail.png" alt="Gmail" className="w-8 h-8 object-contain transition-all hover:scale-110" loading="lazy" width={512} height={512} /></a>
              </div>
            </div>

            {/* Links (Right - Uses 9/12 cols) */}
            <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Products */}
              <div className="space-y-4">
                <h4 className="section-title font-bold text-xs uppercase tracking-widest text-[#2D6A4F]">Products</h4>
                <ul className="space-y-1.5">
                  {NAV_ITEMS.find(n => n.label === 'Products')?.megaMenu?.flatMap(s => s.items).slice(0, 5).map(item => (
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
                <h4 className="section-title font-bold text-xs uppercase tracking-widest text-[#2D6A4F]">Solutions</h4>
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
                <h4 className="section-title font-bold text-xs uppercase tracking-widest text-[#2D6A4F]">Company</h4>
                <ul className="space-y-1.5">
                  <li><Link to="/about" className="footer-link text-[13px] font-medium text-gray-500 hover:text-[#2D6A4F] group"><FlipText>About Us</FlipText></Link></li>
                  <li><Link to="/experience" className="footer-link text-[13px] font-medium text-gray-500 hover:text-[#2D6A4F] group"><FlipText>Experience</FlipText></Link></li>
                  <li><Link to="/resources" className="footer-link text-[13px] font-medium text-gray-500 hover:text-[#2D6A4F] group"><FlipText>Resources</FlipText></Link></li>
                  <li><Link to="/blog" className="footer-link text-[13px] font-medium text-gray-500 hover:text-[#2D6A4F] group"><FlipText>Blog</FlipText></Link></li>
                  <li><Link to="/faq" className="footer-link text-[13px] font-medium text-gray-500 hover:text-[#2D6A4F] group"><FlipText>FAQ</FlipText></Link></li>
                  <li><Link to="/schedule-demo" className="footer-link text-[13px] font-medium text-gray-500 hover:text-[#2D6A4F] group"><FlipText>Schedule Demo</FlipText></Link></li>
                  <li><Link to="/contact" className="footer-link text-[13px] font-medium text-gray-500 hover:text-[#2D6A4F] group"><FlipText>Contact</FlipText></Link></li>
                </ul>
              </div>

              {/* Connect (Map only) */}
              <div className="space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-widest text-[#2D6A4F]">Location</h4>

                {/* Embedded Map */}
                <div ref={locationRef} onClick={handleLocationClick} className="relative w-full h-40 md:h-48 rounded-2xl overflow-hidden shadow-sm border border-[#E6EFE6] bg-gray-50 hover:shadow-md cursor-pointer transition-all duration-300 group hover:border-[#2D6A4F]/20">
                  <iframe
                    title="Office Location"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    src="https://www.openstreetmap.org/export/embed.html?bbox=77.0%2C28.4%2C77.1%2C28.5&amp;layer=mapnik&amp;marker=28.4595%2C77.0266"
                    className="transition-opacity duration-300 pointer-events-none group-hover:opacity-90"
                  ></iframe>

                  {/* Address Badge */}
                  <div className="absolute bottom-3 left-3 z-[400]">
                    <div className="px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-md bg-white/95 border border-[#E6EFE6] text-[#2D6A4F] flex flex-col gap-0.5 group-hover:border-[#2D6A4F]/20 transition-colors">
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
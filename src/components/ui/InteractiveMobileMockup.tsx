"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.23, 1, 0.32, 1] as const;
const PURPLE = '#4422AE';

// --- DATA ---
const NESTORA_DATA = {
  id: 'nestora', name: 'Real Estate', url: 'www.nestora.com', brand: 'Nestora', tagline: 'Verified Urban Residences', brandColor: '#CA8A04',
  chat: { q: 'Show me 2BHK apartments.', a: 'We have the Sunlit 2 BHK Garden Flat in Indiranagar listed at ₹48 lakh, featuring 1,240 sq ft, east-facing balconies, and pool amenities.' }
};

// --- COMPONENTS ---
function NestoraLayout() {
  const properties = [
    { title: 'Modern 3 BHK Apartment', location: 'Gurgaon, Sector 54', price: '₹1.85 Cr', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80' },
    { title: 'Sunlit 2 BHK Garden Flat', location: 'Indiranagar, Bangalore', price: '₹48 Lakh', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=500&q=80' },
    { title: 'Luxury 4 BHK Skyline Villa', location: 'Whitefield Gated Enclave', price: '₹1.45 Cr', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80' },
  ];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FAFAFA', fontSize: 11, fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#18181B', color: '#FFF', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ fontWeight: 800, fontSize: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ color: '#EAB308' }}>⌂</span> Nestora
        </div>
        <div>☰</div>
      </div>
      {/* Hero Banner */}
      <div style={{ background: 'linear-gradient(135deg, #18181B 0%, #27272A 100%)', color: '#FFF', padding: '12px 16px', flexShrink: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 800 }}>Find a place that feels like home.</div>
        <div style={{ fontSize: 10, color: '#A1A1AA', marginTop: 4 }}>Verified luxury residences · Zero Brokerage</div>
      </div>
      {/* Property List */}
      <div style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
        {properties.map((p) => (
          <div key={p.title} style={{ background: '#FFFFFF', borderRadius: 8, display: 'flex', height: 90, border: '1px solid #E4E4E7', overflow: 'hidden' }}>
            <img src={p.image} alt={p.title} style={{ width: 100, height: '100%', objectFit: 'cover' }} />
            <div style={{ padding: '8px 10px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#18181B' }}>{p.title}</div>
              <div style={{ fontSize: 10, color: '#71717A', marginTop: 2 }}>{p.location}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#CA8A04', marginTop: 'auto' }}>{p.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DirectCursor({ pos, isClicking, isVisible }: { pos: { x: string | number; y: string | number }; isClicking: boolean; isVisible: boolean }) {
  return (
    <motion.div animate={{ left: pos.x, top: pos.y, opacity: isVisible ? 1 : 0 }} transition={{ left: { duration: 0.85, ease: EASE }, top: { duration: 0.85, ease: EASE }, opacity: { duration: 0.2 } }} style={{ position: 'absolute', zIndex: 150, pointerEvents: 'none', width: 24, height: 24, transform: 'translate(-12px, -12px)' }}>
      <motion.svg width="22" height="22" viewBox="0 0 24 24" fill="none" animate={{ scale: isClicking ? 0.76 : 1 }} transition={{ duration: 0.12 }}>
        <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L5.85 2.36a.5.5 0 0 0-.35.85z" fill="#0F172A" stroke="#FFFFFF" strokeWidth="1.8" />
      </motion.svg>
      <AnimatePresence>
        {isClicking && (
          <motion.div key="click-pulse" initial={{ scale: 0, opacity: 0.7 }} animate={{ scale: 3.2, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }} style={{ position: 'absolute', top: 2, left: 2, width: 14, height: 14, borderRadius: '50%', background: 'rgba(68, 34, 174, 0.45)' }} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function StreamedText({ content, onWordTick }: { content: string; onWordTick: () => void }) {
  const [renderedWords, setRenderedWords] = useState<string[]>([]);
  const words = content.split(' ');
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setRenderedWords(words.slice(0, index));
      onWordTick();
      if (index >= words.length) clearInterval(interval);
    }, 38 + Math.random() * 18);
    return () => clearInterval(interval);
  }, [content, onWordTick]);
  return <span>{renderedWords.join(' ')}</span>;
}

// --- SERP COMPONENT ---
function SerpLayout({ scrollY, highlightType, searchQuery, showResults }: { scrollY: number; highlightType: 'bottom' | 'top' | 'none', searchQuery: string, showResults: boolean }) {
  const targetQuery = "best IVF center near me";
  
  return (
    <div style={{ height: '100%', background: '#FFF', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #E2E8F0', display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ color: '#4285F4', fontWeight: 800, fontSize: 16 }}>G</div>
        <div style={{ flex: 1, background: '#F1F3F5', borderRadius: 20, padding: '8px 12px', fontSize: 12, color: '#1E293B', display: 'flex', alignItems: 'center' }}>
          {searchQuery || <span style={{ color: '#94A3B8' }}>Search Google...</span>}
          {searchQuery.length > 0 && searchQuery.length < targetQuery.length && (
            <span style={{ borderRight: '2px solid #0F172A', marginLeft: 2, height: 12, animation: 'blink 1s infinite' }}></span>
          )}
        </div>
      </div>
      
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {showResults && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: -scrollY }} 
            transition={{ y: { duration: scrollY > 0 ? 3 : 0, ease: "linear" }, opacity: { duration: 0.3 } }}
            style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 100 }}
          >
            {/* AFTER STATE: Highlighted at TOP */}
            {highlightType === 'top' && (
              <div style={{ background: '#F0FDFA', border: '1px solid #2DD4BF', borderRadius: 12, padding: 16, boxShadow: '0 4px 12px rgba(45, 212, 191, 0.15)' }}>
                <div style={{ fontSize: 10, color: '#0F766E', fontWeight: 700, marginBottom: 4 }}>✨ AI OVERVIEW & TOP RATED</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#1A0B2E' }}>CareIVF Center</div>
                <div style={{ fontSize: 12, color: '#64748B', margin: '4px 0' }}>careivf.com</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
                  <span style={{ color: '#F59E0B', fontSize: 12 }}>★★★★★</span>
                  <span style={{ fontSize: 11, color: '#475569' }}>4.9 (428 reviews)</span>
                </div>
                <div style={{ fontSize: 12, color: '#334155', lineHeight: 1.4 }}>
                  Based on extensive local reviews and success rates, <strong>CareIVF</strong> is the highly recommended fertility center in your area.
                </div>
              </div>
            )}

            {/* GENERIC RESULTS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 11, color: '#64748B' }}>genericfertility.com</div>
              <div style={{ fontSize: 14, color: '#1A0B2E', fontWeight: 600 }}>City Fertility & IVF Clinic</div>
              <div style={{ fontSize: 11, color: '#475569' }}>Standard IVF treatments available. Book a consultation today...</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 11, color: '#64748B' }}>familyivf.net</div>
              <div style={{ fontSize: 14, color: '#1A0B2E', fontWeight: 600 }}>Family Planning IVF Center</div>
              <div style={{ fontSize: 11, color: '#475569' }}>Comprehensive care for families. View our pricing and services...</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 11, color: '#64748B' }}>nationalivf.org</div>
              <div style={{ fontSize: 14, color: '#1A0B2E', fontWeight: 600 }}>National Fertility Associates</div>
              <div style={{ fontSize: 11, color: '#475569' }}>Network of clinics across the country. Find a local branch...</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 11, color: '#64748B' }}>metro-ivf.co.in</div>
              <div style={{ fontSize: 14, color: '#1A0B2E', fontWeight: 600 }}>Metro IVF & Surrogacy</div>
              <div style={{ fontSize: 11, color: '#475569' }}>Specialists in high-risk pregnancies and IVF protocols...</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 11, color: '#64748B' }}>hopefertility.com</div>
              <div style={{ fontSize: 14, color: '#1A0B2E', fontWeight: 600 }}>Hope Fertility Care</div>
              <div style={{ fontSize: 11, color: '#475569' }}>Bringing hope to families since 2005. Contact us for details...</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 11, color: '#64748B' }}>genesis-ivf.in</div>
              <div style={{ fontSize: 14, color: '#1A0B2E', fontWeight: 600 }}>Genesis IVF Hospital</div>
              <div style={{ fontSize: 11, color: '#475569' }}>State of the art equipment and experienced doctors...</div>
            </div>

            {/* BEFORE STATE: Highlighted at BOTTOM */}
            {highlightType === 'bottom' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 8, background: '#FFF7ED', border: '1px dashed #FDBA74', borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: '#64748B' }}>careivf.com</div>
                <div style={{ fontSize: 14, color: '#EA580C', fontWeight: 600 }}>CareIVF Center (Page 3)</div>
                <div style={{ fontSize: 11, color: '#475569' }}>Hard to find, but we are here...</div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

// --- MAIN COMPONENT ---
type GlobalPhase = 'frosty' | 'transition_white' | 'splash1' | 'seo_before' | 'splash2' | 'seo_after';

export function InteractiveMobileMockup() {
  const [globalPhase, setGlobalPhase] = useState<GlobalPhase>('frosty');
  const [loopKey, setLoopKey] = useState(0);

  // Common UI State
  const [isUrlTyping, setIsUrlTyping] = useState(false);
  const [typedUrl, setTypedUrl] = useState('');
  const [isSiteLoaded, setIsSiteLoaded] = useState(false);
  const [browserPhase, setBrowserPhase] = useState(0); // 0=blank, 1=typing, 2=loading, 3=loaded
  
  // Cursor State
  const [cursorPos, setCursorPos] = useState({ x: 150, y: 300 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [clicking, setClicking] = useState(false);

  // Frosty State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatPhase, setChatPhase] = useState(0);
  const [inputFieldText, setInputFieldText] = useState('');

  // SEO State
  const [serpScrollY, setSerpScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSerpResults, setShowSerpResults] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const timerPool = useRef<ReturnType<typeof setTimeout>[]>([]);

  const strictlyScrollInternalChat = useCallback(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, []);

  const clearAllTimers = useCallback(() => {
    timerPool.current.forEach(clearTimeout);
    timerPool.current = [];
  }, []);

  const queueTimer = useCallback((fn: () => void, ms: number) => {
    timerPool.current.push(setTimeout(fn, ms));
  }, []);

  const runPhaseSequence = useCallback(() => {
    clearAllTimers();

    if (globalPhase === 'frosty') {
      // RESET FROSTY
      setBrowserPhase(0); setIsUrlTyping(false); setTypedUrl(''); setIsSiteLoaded(false); 
      setChatOpen(false); setChatPhase(0); setInputFieldText(''); setCursorVisible(false); setClicking(false);
      setCursorPos({ x: 150, y: 550 });

      // 1. URL
      queueTimer(() => { setCursorVisible(true); setCursorPos({ x: 150, y: 80 }); }, 300);
      queueTimer(() => setClicking(true), 850);
      queueTimer(() => { 
        setClicking(false); setIsUrlTyping(true); setBrowserPhase(1);
        let charIdx = 0;
        const t = setInterval(() => {
          charIdx++;
          setTypedUrl(NESTORA_DATA.url.slice(0, charIdx));
          if (charIdx >= NESTORA_DATA.url.length) {
            clearInterval(t);
            queueTimer(() => { setBrowserPhase(2); queueTimer(() => { setIsSiteLoaded(true); setBrowserPhase(3); }, 500); }, 200);
          }
        }, 50);
        timerPool.current.push(t);
      }, 1000);

      // 2. Open Chat
      queueTimer(() => setCursorPos({ x: 260, y: 570 }), 2800);
      queueTimer(() => setClicking(true), 3500);
      queueTimer(() => { setClicking(false); setChatOpen(true); }, 3650);

      // 3. Type Chat
      queueTimer(() => setCursorPos({ x: 150, y: 550 }), 4100);
      queueTimer(() => setClicking(true), 4600);
      queueTimer(() => { 
        setClicking(false); setChatPhase(1);
        let charIdx = 0;
        const t = setInterval(() => {
          charIdx++;
          setInputFieldText(NESTORA_DATA.chat.q.slice(0, charIdx));
          if (charIdx >= NESTORA_DATA.chat.q.length) {
            clearInterval(t);
            queueTimer(() => {
              setInputFieldText(''); setChatPhase(2); strictlyScrollInternalChat();
              queueTimer(() => { setChatPhase(3); strictlyScrollInternalChat(); }, 600);
              queueTimer(() => { setChatPhase(4); strictlyScrollInternalChat(); }, 1400);
            }, 300);
          }
        }, 40);
        timerPool.current.push(t);
      }, 4750);

      // 4. End & Transition to white separator then Splash 1
      queueTimer(() => { setChatOpen(false); setCursorVisible(false); }, 9000);
      queueTimer(() => { setGlobalPhase('transition_white'); }, 9500);

    } else if (globalPhase === 'transition_white') {
      queueTimer(() => setGlobalPhase('splash1'), 800); // short white flash/pause

    } else if (globalPhase === 'splash1') {
      queueTimer(() => setGlobalPhase('seo_before'), 2500);

    } else if (globalPhase === 'seo_before') {
      // RESET SEO — Google already open
      setTypedUrl('google.com'); setBrowserPhase(3); setIsSiteLoaded(true); setIsUrlTyping(false);
      setCursorVisible(false); setSerpScrollY(0); setCursorPos({ x: 150, y: 300 });
      setSearchQuery(''); setShowSerpResults(false);

      // 1. Cursor moves directly to Google search bar
      queueTimer(() => { setCursorVisible(true); setCursorPos({ x: 150, y: 140 }); }, 300);
      queueTimer(() => setClicking(true), 900);
      
      // 2. Type search query
      queueTimer(() => { 
        setClicking(false); 
        let charIdx = 0;
        const target = "best IVF center near me";
        const t = setInterval(() => {
          charIdx++;
          setSearchQuery(target.slice(0, charIdx));
          if (charIdx >= target.length) {
            clearInterval(t);
            queueTimer(() => { setShowSerpResults(true); }, 400);
          }
        }, 50);
        timerPool.current.push(t);
      }, 1050);

      // 3. Scroll Down highly populated results
      queueTimer(() => {
        setCursorPos({ x: 150, y: 400 });
        setSerpScrollY(350);
      }, 3500);

      // 4. Transition to Splash 2
      queueTimer(() => setGlobalPhase('splash2'), 7500);

    } else if (globalPhase === 'splash2') {
      queueTimer(() => setGlobalPhase('seo_after'), 2500);

    } else if (globalPhase === 'seo_after') {
      // RESET SEO — Google already open
      setTypedUrl('google.com'); setBrowserPhase(3); setIsSiteLoaded(true); setIsUrlTyping(false);
      setCursorVisible(false); setSerpScrollY(0); setCursorPos({ x: 150, y: 300 });
      setSearchQuery(''); setShowSerpResults(false);

      // 1. Cursor moves directly to Google search bar
      queueTimer(() => { setCursorVisible(true); setCursorPos({ x: 150, y: 140 }); }, 300);
      queueTimer(() => setClicking(true), 900);
      
      // 2. Type search query
      queueTimer(() => { 
        setClicking(false); 
        let charIdx = 0;
        const target = "best IVF center near me";
        const t = setInterval(() => {
          charIdx++;
          setSearchQuery(target.slice(0, charIdx));
          if (charIdx >= target.length) {
            clearInterval(t);
            queueTimer(() => { setShowSerpResults(true); }, 400);
          }
        }, 50);
        timerPool.current.push(t);
      }, 1050);

      // 3. Loop back to start
      queueTimer(() => { setLoopKey(k => k + 1); setGlobalPhase('frosty'); }, 6500);
    }

  }, [clearAllTimers, globalPhase, queueTimer, strictlyScrollInternalChat]);

  useEffect(() => {
    runPhaseSequence();
    return clearAllTimers;
  }, [loopKey, globalPhase, runPhaseSequence, clearAllTimers]);

  return (
    <div className="relative mx-auto" style={{ width: 280, height: 580, zIndex: 20 }}>
      {/* Phone Hardware Frame */}
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: 40,
        background: '#000',
        padding: 8,
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
      }}>
        {/* Screen */}
        <div style={{
          position: 'relative', width: '100%', height: '100%',
          borderRadius: 32,
          background: '#FFF',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column'
        }}>
          {/* Dynamic Island / Notch */}
          <div style={{
            position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
            width: 90, height: 26, borderRadius: 14,
            background: '#000', zIndex: 200
          }} />

          {/* SPLASH SCREENS */}
          <AnimatePresence>
            {globalPhase === 'transition_white' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', inset: 0, background: '#FFFFFF', zIndex: 85 }} />
            )}
            {globalPhase === 'splash1' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', inset: 0, background: '#FFFFFF', zIndex: 80 }}>
                <img src="/splash-sad-robot.png" alt="Without us, your ranking isn't great" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
              </motion.div>
            )}
            {globalPhase === 'splash2' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', inset: 0, background: '#FFFFFF', zIndex: 80 }}>
                <img src="/splash-happy-robot.png" alt="Rank higher, get found everywhere." style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* BROWSER INTERFACE */}
          <div style={{ background: '#F1F3F5', padding: '40px 12px 10px 12px', display: 'flex', justifyContent: 'center', zIndex: 10 }}>
            <div style={{ background: isUrlTyping || isSiteLoaded ? '#E2E5E9' : '#FFFFFF', borderRadius: 12, padding: '8px 16px', fontSize: 13, width: '100%', textAlign: 'center', color: '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden' }}>
              {isUrlTyping || isSiteLoaded ? typedUrl || 'Search or enter URL' : 'New Tab'}
              {isUrlTyping && globalPhase === 'frosty' && typedUrl.length < NESTORA_DATA.url.length && <span style={{ borderRight: '2px solid #000', marginLeft: 2, animation: 'blink 1s infinite' }}></span>}
            </div>
          </div>

          {/* VIEWPORT */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            {browserPhase < 2 && <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>Start Search...</div>}
            {browserPhase === 2 && !isSiteLoaded && <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}
            {isSiteLoaded && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%' }}>
                {globalPhase === 'frosty' && <NestoraLayout />}
                {globalPhase === 'seo_before' && <SerpLayout scrollY={serpScrollY} highlightType="bottom" searchQuery={searchQuery} showResults={showSerpResults} />}
                {globalPhase === 'seo_after' && <SerpLayout scrollY={0} highlightType="top" searchQuery={searchQuery} showResults={showSerpResults} />}
              </motion.div>
            )}
          </div>

          {/* Bottom Sheet Chat Modal */}
          <AnimatePresence>
            {chatOpen && globalPhase === 'frosty' && (
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '75%',
                  background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)',
                  borderRadius: '24px 24px 0 0', borderTop: '1px solid rgba(0,0,0,0.1)',
                  boxShadow: '0 -10px 40px rgba(0,0,0,0.15)',
                  zIndex: 100, display: 'flex', flexDirection: 'column'
                }}
              >
                <div style={{ width: 40, height: 4, background: '#CBD5E1', borderRadius: 2, margin: '8px auto' }} />
                
                <div style={{ background: `linear-gradient(135deg, ${PURPLE} 0%, #5F23C8 100%)`, color: '#FFF', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 32 }}><img src="/chatbot.webp" alt="Frosty Bot" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>Frosty Agent</div>
                    <div style={{ fontSize: 10, opacity: 0.9 }}>Synced with {NESTORA_DATA.brand}</div>
                  </div>
                </div>

                <div ref={scrollRef} style={{ flex: 1, padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ alignSelf: 'flex-start', maxWidth: '85%', padding: '10px 14px', borderRadius: '16px 16px 16px 4px', background: '#F1F5F9', color: '#1E293B', fontSize: 12 }}>
                    Hi! 👋 I'm Frosty. Ask me anything about {NESTORA_DATA.brand}!
                  </motion.div>
                  {chatPhase >= 2 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ alignSelf: 'flex-end', maxWidth: '85%', padding: '10px 14px', borderRadius: '16px 16px 4px 16px', background: PURPLE, color: '#FFF', fontSize: 12 }}>
                      {NESTORA_DATA.chat.q}
                    </motion.div>
                  )}
                  {chatPhase === 3 && (
                    <div style={{ alignSelf: 'flex-start', padding: '10px 14px', borderRadius: '16px 16px 16px 4px', background: '#F1F5F9', display: 'flex', gap: 4 }}>
                      <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0 }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#94A3B8' }} />
                      <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#94A3B8' }} />
                      <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#94A3B8' }} />
                    </div>
                  )}
                  {chatPhase >= 4 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ alignSelf: 'flex-start', maxWidth: '85%', padding: '10px 14px', borderRadius: '16px 16px 16px 4px', background: '#F1F5F9', color: '#1E293B', fontSize: 12 }}>
                      <StreamedText content={NESTORA_DATA.chat.a} onWordTick={strictlyScrollInternalChat} />
                    </motion.div>
                  )}
                </div>

                <div style={{ padding: '12px 16px', borderTop: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, background: '#F8FAFC', borderRadius: 20, padding: '10px 16px', fontSize: 12, color: '#0F172A', border: '1px solid #E2E8F0' }}>
                    {inputFieldText || 'Ask Frosty...'}
                    {inputFieldText && <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} style={{ borderRight: '2px solid #000', marginLeft: 2 }} />}
                  </div>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: PURPLE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Action Button (Only in Frosty phase) */}
          <AnimatePresence>
            {globalPhase === 'frosty' && !chatOpen && isSiteLoaded && (
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1, boxShadow: [`0 4px 18px ${PURPLE}35, 0 0 0 0px ${PURPLE}20`, `0 4px 18px ${PURPLE}35, 0 0 0 7px ${PURPLE}06`, `0 4px 18px ${PURPLE}35, 0 0 0 0px ${PURPLE}20`] }} exit={{ scale: 0 }}
                transition={{ scale: { duration: 0.3 }, boxShadow: { duration: 2.5, repeat: Infinity } }}
                style={{ position: 'absolute', bottom: 20, right: 20, width: 48, height: 48, borderRadius: '50%', background: `linear-gradient(135deg, ${PURPLE} 0%, #5F23C8 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 90 }}
              >
                <div style={{ width: 28, height: 28 }}><img src="/chatbot.webp" alt="Frosty Bot" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {globalPhase !== 'transition_white' && globalPhase !== 'splash1' && globalPhase !== 'splash2' && <DirectCursor pos={cursorPos} isClicking={clicking} isVisible={cursorVisible} />}
        </div>
      </div>
    </div>
  );
}

import { motion, useScroll, useTransform, useMotionValue, AnimatePresence } from 'framer-motion';
import { Award, Shield, Globe, ArrowRight, Code, Brain, Sparkles, CheckCircle2, Trophy, Star, BadgeCheck, Lock, ShieldCheck, Linkedin, Twitter, Cloud, ChevronDown, Bot, PhoneCall, type LucideIcon } from 'lucide-react';
import CuteBackground from '../components/ui/CuteBackground';
import { useRef, useState, useEffect, useMemo, memo } from 'react';
import { TIMELINE_DATA } from '../utils/aboutData';
import InnovationProcess from '../components/about/InnovationProcess';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import FlipText from '../components/ui/FlipText';
import SplitTextReveal from '../components/ui/SplitTextReveal';
import { cn } from '../utils/cn';

const HEADLINE_WORDS = ['Accelerate', 'growth', 'at', 'the', 'new', 'speed', 'of', 'business'];

// ============ TEAM DATA ============
const TEAM_DATA = [
    {
        name: 'Dr. Sarah Chen',
        role: 'CEO & Co-Founder',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
        bio: 'Former Google AI researcher with 15+ years in machine learning. PhD from Stanford in Computer Science. Passionate about making AI accessible to enterprises worldwide.',
        linkedin: '#',
        twitter: '#',
    },
    {
        name: 'Marcus Rodriguez',
        role: 'CTO',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        bio: 'Ex-Meta engineering lead. Built distributed systems serving billions of users. Expert in scalable AI infrastructure and real-time processing systems.',
        linkedin: '#',
        twitter: '#',
        github: '#',
    },
    {
        name: 'Emily Watson',
        role: 'VP of Product',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
        bio: 'Product visionary with experience at Salesforce and Microsoft. Specializes in enterprise SaaS products and AI-driven solutions that users love.',
        linkedin: '#',
        twitter: '#',
    },
    {
        name: 'David Kim',
        role: 'Head of AI Research',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        bio: 'Published 50+ papers in top AI conferences. Former DeepMind researcher. Leading our efforts in autonomous agent development and LLM optimization.',
        linkedin: '#',
        github: '#',
    },
    {
        name: 'Priya Sharma',
        role: 'VP of Engineering',
        image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop&crop=face',
        bio: 'Engineering leader with 12+ years at Amazon and Netflix. Expert in building high-performance, fault-tolerant systems at scale.',
        linkedin: '#',
        twitter: '#',
    },
    {
        name: 'James Mitchell',
        role: 'Chief Security Officer',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
        bio: 'Former NSA cybersecurity expert. Led security at Fortune 100 companies. Ensures Frostrek meets the highest security standards globally.',
        linkedin: '#',
    },
];

// ============ CERTIFICATIONS DATA ============
const CERTIFICATIONS_DATA = [
    {
        name: 'ISO 27001',
        icon: ShieldCheck,
        description: 'International standard for information security management systems (ISMS)',
        color: 'from-[#2D6A4F] to-[#2D6A4F]/80',
    },
    {
        name: 'SOC 2 Type II',
        icon: Lock,
        description: 'Audited security, availability, and confidentiality controls',
        color: 'from-[#2D6A4F]/90 to-[#2D6A4F]/70',
    },
    {
        name: 'GDPR Compliant',
        icon: Shield,
        description: 'Full compliance with EU General Data Protection Regulation',
        color: 'from-[#2D6A4F]/80 to-[#2D6A4F]/60',
    },
    {
        name: 'HIPAA Ready',
        icon: BadgeCheck,
        description: 'Healthcare data protection and privacy standards',
        color: 'from-[#2D6A4F]/70 to-[#2D6A4F]/50',
    },
];

// ============ AWARDS DATA ============
const AWARDS_DATA = [
    {
        title: 'Best AI Platform',
        issuer: 'TechCrunch Disrupt',
        year: '2024',
        icon: Trophy,
        color: 'from-[#2D6A4F] to-[#2D6A4F]/80',
    },
    {
        title: 'Innovation Leader',
        issuer: 'Gartner Magic Quadrant',
        year: '2024',
        icon: Star,
        color: 'from-[#2D6A4F]/90 to-[#2D6A4F]/70',
    },
    {
        title: 'Top 50 AI Startups',
        issuer: 'Forbes',
        year: '2023',
        icon: Award,
        color: 'from-[#2D6A4F]/80 to-[#2D6A4F]/60',
    },
    {
        title: 'Enterprise Excellence',
        issuer: 'Enterprise Tech Awards',
        year: '2023',
        icon: Trophy,
        color: 'from-[#2D6A4F]/70 to-[#2D6A4F]/50',
    },
];

// ============ TECH STACK DATA ============
const TECH_CATEGORIES = [
    {
        name: 'AI & Machine Learning',
        icon: Brain,
        color: 'from-[#2D6A4F] to-[#2D6A4F]/80',
        technologies: [
            { name: 'PyTorch', desc: 'Deep learning framework for research and production' },
            { name: 'TensorFlow', desc: 'End-to-end ML platform for scalable deployments' },
            { name: 'LangChain', desc: 'LLM orchestration and agent development' },
            { name: 'Transformers', desc: 'State-of-the-art NLP models and fine-tuning' },
        ],
    },
    {
        name: 'Infrastructure',
        icon: Cloud,
        color: 'from-[#2D6A4F]/90 to-[#2D6A4F]/70',
        technologies: [
            { name: 'Kubernetes', desc: 'Container orchestration at enterprise scale' },
            { name: 'AWS/GCP/Azure', desc: 'Multi-cloud deployment flexibility' },
            { name: 'Terraform', desc: 'Infrastructure as code automation' },
            { name: 'Redis', desc: 'High-performance caching and real-time data' },
        ],
    },
    {
        name: 'Security',
        icon: ShieldCheck,
        color: 'from-[#2D6A4F]/80 to-[#2D6A4F]/60',
        technologies: [
            { name: 'Zero Trust', desc: 'Never trust, always verify architecture' },
            { name: 'E2E Encryption', desc: 'AES-256 encryption for data at rest and transit' },
            { name: 'OAuth 2.0/OIDC', desc: 'Enterprise SSO and identity management' },
            { name: 'Vault', desc: 'Secrets management and data protection' },
        ],
    },
    {
        name: 'Development',
        icon: Code,
        color: 'from-[#2D6A4F]/70 to-[#2D6A4F]/50',
        technologies: [
            { name: 'TypeScript', desc: 'Type-safe development for robust applications' },
            { name: 'Python', desc: 'Core language for AI/ML development' },
            { name: 'Go', desc: 'High-performance microservices' },
            { name: 'GraphQL', desc: 'Flexible API layer for data access' },
        ],
    },
];

// ============ STUNNING TYPEWRITER ============
const TypewriterText = memo(({ texts }: { texts: string[] }) => {
    const [index, setIndex] = useState(0);
    const [text, setText] = useState(texts[0]);
    const [phase, setPhase] = useState<'show' | 'delete' | 'type'>('show');

    useEffect(() => {
        if (phase === 'show') {
            const t = setTimeout(() => setPhase('delete'), 2500);
            return () => clearTimeout(t);
        }
        if (phase === 'delete') {
            if (text.length > 0) {
                const t = setTimeout(() => setText(text.slice(0, -1)), 80);
                return () => clearTimeout(t);
            }
            setIndex(i => (i + 1) % texts.length);
            setPhase('type');
        }
        if (phase === 'type') {
            const target = texts[index];
            if (text.length < target.length) {
                const t = setTimeout(() => setText(target.slice(0, text.length + 1)), 120);
                return () => clearTimeout(t);
            }
            setPhase('show');
        }
    }, [text, phase, index, texts]);

    return (
        <span className="relative font-serif">
            {text}
            <span className="inline-block w-[3px] h-[0.85em] bg-[#2D6A4F] ml-1 align-middle rounded-full animate-pulse" />
        </span>
    );
});

// ============ INTERACTIVE BUTTON (NO MAGNETIC EFFECT) ============
const MagneticButton = memo(({ children, className, onClick, variant = 'primary' }: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'cta'
}) => {
    const baseStyles = variant === 'primary'
        ? 'bg-[#2D6A4F] hover:bg-[#204F3B] text-white shadow-lg shadow-[#2D6A4F]/25'
        : variant === 'cta'
            ? 'bg-white hover:bg-gray-50 text-[#2D6A4F] shadow-xl'
            : 'bg-white/95 border border-gray-200 hover:border-[#2D6A4F] text-gray-800';

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`group relative overflow-hidden rounded-xl font-medium transition-all font-body ${baseStyles} ${className} px-6 py-3.5`}
        >
            <FlipText hoverColor={variant === 'primary' ? 'text-white' : 'text-[#2D6A4F]'}>{children}</FlipText>
        </motion.button>
    );
});

// ============ 3D TILT CARD ============
const TiltCard = memo(({ children, className, hoverBg = 'bg-white', hoverBorder = 'border-gray-100', normalBorder = 'border-gray-100', glowColor = '#2D6A4F' }: {
    children: React.ReactNode;
    className?: string;
    hoverBg?: string;
    hoverBorder?: string;
    normalBorder?: string;
    glowColor?: string;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [hover, setHover] = useState(false);
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    const handleMouse = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        rotateX.set((e.clientY - centerY) / 15);
        rotateY.set((centerX - e.clientX) / 15);
    };

    const reset = () => { rotateX.set(0); rotateY.set(0); setHover(false); };

    const getGlowRgba = (color: string) => {
        switch (color) {
            case '#F97316':
            case '#EA580C': return 'rgba(249, 115, 22, 0.08)';
            case '#0284C7': return 'rgba(2, 132, 199, 0.08)';
            case '#E11D48': return 'rgba(225, 29, 72, 0.08)';
            case '#2D6A4F':
            default: return 'rgba(45, 106, 79, 0.08)';
        }
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={reset}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className={`relative cursor-pointer ${className}`}
            animate={{
                y: hover ? -6 : 0,
                boxShadow: hover ? `0 20px 40px -15px ${getGlowRgba(glowColor)}` : '0 4px 20px -5px rgba(0,0,0,0.05)'
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <div
                className={cn(
                    "relative rounded-2xl h-full border transition-all duration-300",
                    hover ? `${hoverBg} ${hoverBorder}` : `bg-white ${normalBorder}`
                )}
                style={{ transform: 'translateZ(10px)' }}
            >
                {children}
            </div>
        </motion.div>
    );
});

// ============ ANIMATED COUNTER ============
const Counter = memo(({ value, suffix = '' }: { value: number; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !started) {
                setStarted(true);
                let n = 0;
                const step = value / 40;
                const loop = () => {
                    n += step;
                    if (n >= value) setCount(value);
                    else { setCount(Math.floor(n)); requestAnimationFrame(loop); }
                };
                requestAnimationFrame(loop);
            }
        }, { threshold: 0.5 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [value, started]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
});

// ============ FLOATING ICON ============
const FloatingIcon = memo(({ icon: Icon, delay, x, y }: { icon: LucideIcon; delay: number; x: string; y: string }) => (
    <div
        className="absolute w-10 h-10 bg-white backdrop-blur rounded-xl shadow-lg flex items-center justify-center border border-[#2D6A4F]/20 animate-bounce-slow"
        style={{ left: x, top: y, animationDelay: `${delay}s` }}
    >
        <Icon className="w-5 h-5 text-[#2D6A4F]" />
    </div>
));

// ============ INTERACTIVE GLOBE ============
const InteractiveGlobe = memo(() => {
    const [hoveredCity, setHoveredCity] = useState<number | null>(null);
    const [isGlobeHovered, setIsGlobeHovered] = useState(false);

    const cities = useMemo(() => [
        { x: '18%', y: '28%', name: 'San Francisco', flag: '🇺🇸' },
        { x: '70%', y: '22%', name: 'London', flag: '🇬🇧' },
        { x: '82%', y: '55%', name: 'Singapore', flag: '🇸🇬' },
        { x: '15%', y: '62%', name: 'Dubai', flag: '🇦🇪' },
        { x: '52%', y: '12%', name: 'Berlin', flag: '🇩🇪' },
        { x: '75%', y: '42%', name: 'Bangalore', flag: '🇮🇳' },
    ], []);

    return (
        <div className="relative w-full h-80 flex items-center justify-center bg-gray-50/50 rounded-2xl border border-gray-100 overflow-hidden">
            <div className="absolute w-56 h-56 border border-dashed border-[#2D6A4F]/20 rounded-full animate-spin-slow" />
            <div className="absolute w-44 h-44 border border-dashed border-[#2D6A4F]/15 rounded-full animate-spin-slow-reverse" />

            <motion.div
                className="relative w-24 h-24 bg-gradient-to-br from-[#2D6A4F] via-[#2D6A4F]/80 to-[#2D6A4F]/60 rounded-full flex items-center justify-center shadow-2xl cursor-pointer z-10"
                onMouseEnter={() => setIsGlobeHovered(true)}
                onMouseLeave={() => setIsGlobeHovered(false)}
                animate={{
                    scale: isGlobeHovered ? 1.08 : 1,
                    boxShadow: isGlobeHovered
                        ? '0 0 40px 5px rgba(45,106,79,0.25)'
                        : '0 10px 30px -10px rgba(45,106,79,0.2)'
                }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <Globe className="w-10 h-10 text-white animate-pulse" />
                <div className="absolute inset-0 rounded-full border-2 border-[#2D6A4F]/50 animate-ping" />
            </motion.div>

            {cities.map((city, i) => (
                <motion.div
                    key={i}
                    className="absolute z-20"
                    style={{ left: city.x, top: city.y }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.05, type: 'spring' }}
                    onMouseEnter={() => setHoveredCity(i)}
                    onMouseLeave={() => setHoveredCity(null)}
                >
                    <motion.div
                        className="relative cursor-pointer"
                        animate={{ scale: hoveredCity === i ? 1.3 : 1 }}
                    >
                        <div className="w-3.5 h-3.5 bg-[#2D6A4F] rounded-full shadow-lg border border-white" />
                        <div className="absolute inset-0 rounded-full bg-[#2D6A4F] animate-ping" style={{ animationDelay: `${i * 0.3}s` }} />
                    </motion.div>
                    <AnimatePresence>
                        {hoveredCity === i && (
                            <motion.div
                                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                className="absolute top-6 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-xl text-white text-xs whitespace-nowrap shadow-xl z-30 flex items-center gap-1.5"
                            >
                                <span className="text-sm">{city.flag}</span>
                                <span className="font-semibold font-body">{city.name}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    );
});

// ============ CHECK ITEM WITH ANIMATION ============
const CheckItem = memo(({ text, delay }: { text: string; delay: number }) => (
    <motion.div
        initial={{ opacity: 0, x: -15 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.4 }}
        className="flex items-center gap-3 group"
    >
        <motion.div
            className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2D6A4F] to-[#2D6A4F]/70 flex items-center justify-center"
            whileHover={{ scale: 1.15, rotate: 10 }}
        >
            <CheckCircle2 className="w-4 h-4 text-white" />
        </motion.div>
        <span className="text-gray-700 font-body group-hover:text-gray-950 transition-colors">{text}</span>
    </motion.div>
));

// ============ TECH STACK ICON ============
const TechIcon = memo(({
    icon,
    label,
    hoverBg,
    hoverBorder,
    hoverText,
    delay,
    isGlow = false
}: {
    icon: string;
    label: string;
    hoverBg: string;
    hoverBorder: string;
    hoverText: string;
    delay: number;
    isGlow?: boolean
}) => {
    const [hover, setHover] = useState(false);
    const active = hover || isGlow;

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
            className="relative flex flex-col items-center"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div
                className={cn(
                    "w-16 h-16 rounded-2xl border flex items-center justify-center shadow-md cursor-pointer transition-all duration-300 transform-gpu",
                    active
                        ? `${hoverBg} ${hoverBorder} -translate-y-1.5 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.08)]`
                        : "bg-white border-gray-200 shadow-sm"
                )}
            >
                <img src={icon} alt={label} className="w-8 h-8 object-contain" loading="lazy" width={512} height={512} />
            </div>
            <AnimatePresence>
                {active && (
                    <motion.span
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className={cn("absolute -bottom-6 text-[11px] font-bold whitespace-nowrap font-body", hoverText)}
                    >
                        {label}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    );
});

// ============ TEAM FLIP CARD ============
const TeamFlipCard = memo(({ member, delay }: { member: typeof TEAM_DATA[0]; delay: number }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="perspective-1000 w-full max-w-[380px] mx-auto h-[380px]"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <motion.div
                className="relative w-full h-full preserve-3d cursor-pointer"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-lg border border-gray-100"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div className="relative w-full h-full">
                        <img src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            loading="lazy" width={512} height={512} />
                        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                <h3 className="text-xl font-serif font-bold text-white mb-1">{member.name}</h3>
                                <p className="text-[#34A853] font-body font-semibold">{member.role}</p>
                            </div>
                        </div>
                        <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm rounded-full px-3 py-1.5 text-[10px] text-white border border-white/15 animate-pulse font-body">
                            Hover for bio
                        </div>
                    </div>
                </div>

                {/* Back Face - Legibility Fixed (White/light bg with deep slate text) */}
                <div
                    className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-lg border border-gray-200"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <div className="w-full h-full bg-white p-6 flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <img src={member.image}
                                    alt={member.name}
                                    className="w-14 h-14 rounded-xl object-cover border border-[#2D6A4F]/30" loading="lazy" width={512} height={512} />
                                <div>
                                    <h3 className="text-lg font-serif font-bold text-gray-900">{member.name}</h3>
                                    <p className="text-[#2D6A4F] text-xs font-semibold font-body">{member.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-body">
                                {member.bio}
                            </p>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-gray-100">
                            {member.linkedin && (
                                <motion.a
                                    href={member.linkedin}
                                    className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#2D6A4F]/15 hover:text-[#2D6A4F] transition-colors"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Linkedin className="w-4.5 h-4.5" />
                                </motion.a>
                            )}
                            {member.twitter && (
                                <motion.a
                                    href={member.twitter}
                                    className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#2D6A4F]/15 hover:text-[#2D6A4F] transition-colors"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Twitter className="w-4.5 h-4.5" />
                                </motion.a>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
});

// ============ CERTIFICATION BADGE ============
const CertificationBadge = memo(({ cert, delay }: { cert: typeof CERTIFICATIONS_DATA[0]; delay: number }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay, type: 'spring', stiffness: 200 }}
                className={`px-6 py-4 rounded-2xl bg-gradient-to-br ${cert.color} cursor-pointer overflow-hidden shadow-md`}
                whileHover={{ scale: 1.04, y: -3 }}
            >
                <div className="relative flex items-center gap-3 z-10">
                    <cert.icon className="w-5 h-5 text-white" />
                    <span className="text-white font-bold text-sm font-body">{cert.name}</span>
                </div>
            </motion.div>

            {/* Tooltip Legibility Fixed (Dark backdrop with white text) */}
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2.5 bg-gray-900 text-white text-xs rounded-xl shadow-xl z-50 w-52 text-center border border-gray-800"
                    >
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45 border-b border-r border-gray-800" />
                        <p className="relative z-10 font-body">{cert.description}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});

// ============ AWARD CARD ============
const AwardCard = memo(({ award, delay }: { award: typeof AWARDS_DATA[0]; delay: number }) => {
    const [hover, setHover] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="relative"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <motion.div
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md overflow-hidden cursor-pointer h-full min-h-[180px]"
                animate={{
                    y: hover ? -6 : 0,
                    borderColor: hover ? '#2D6A4F' : 'rgb(243, 244, 246)',
                    boxShadow: hover ? '0 20px 40px -15px rgba(45,106,79,0.12)' : '0 4px 15px -5px rgba(0,0,0,0.03)',
                }}
            >
                <div className="relative">
                    <motion.div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${award.color} flex items-center justify-center mb-4 shadow-sm`}
                        animate={{ rotate: hover ? [0, -8, 8, 0] : 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <award.icon className="w-5 h-5 text-white" />
                    </motion.div>

                    <h3 className="text-base font-serif font-bold text-gray-900 mb-1 leading-snug">{award.title}</h3>
                    <p className="text-gray-500 text-xs font-body mb-2">{award.issuer}</p>
                    <span className="inline-block px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-full text-[10px] font-bold text-gray-600 font-body">
                        {award.year}
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
});

// ============ EXPANDABLE TECH CATEGORY ============
const ExpandableTechCategory = memo(({ category, delay }: { category: typeof TECH_CATEGORIES[0]; delay: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="relative font-body"
        >
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
                <div
                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center gap-4">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-md`}>
                            <category.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-base font-serif font-bold text-gray-900">{category.name}</h3>
                            <p className="text-xs text-gray-500 font-medium">{category.technologies.length} technologies</p>
                        </div>
                    </div>
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden border-t border-gray-50"
                        >
                            <div className="px-5 pb-5 pt-3 space-y-2">
                                {category.technologies.map((tech, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100/50"
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${category.color} mt-1.5 shrink-0`} />
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-sm">{tech.name}</h3>
                                            <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{tech.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
});

// ============ TECH ECOSYSTEM DIAGRAM ============
const TechEcosystemDiagram = memo(() => {
    return (
        <div className="relative w-full max-w-[320px] aspect-square mx-auto flex items-center justify-center">
            <div className="absolute inset-8 border border-dashed border-[#2D6A4F]/20 rounded-full animate-spin-slow" />
            <div className="absolute inset-16 border border-dashed border-[#2D6A4F]/10 rounded-full animate-spin-slow-reverse" />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-[#2D6A4F] to-[#2D6A4F]/80 rounded-2xl flex items-center justify-center shadow-xl z-10 animate-pulse">
                <span className="text-white font-serif font-bold text-2xl">F</span>
            </div>

            {/* Simulated Calling Agents */}
            <motion.div
                className="absolute w-8 h-8 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center top-4 left-1/4"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
                <Bot size={14} className="text-[#2D6A4F]" />
            </motion.div>
            <motion.div
                className="absolute w-8 h-8 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center bottom-6 right-1/4"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
                <PhoneCall size={13} className="text-[#2D6A4F]" />
            </motion.div>
        </div>
    );
});

// ============ STAGGER ANIMATIONS ============
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

// ============ MAIN COMPONENT ============
const About = () => {
    const navigate = useNavigate();
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
    const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

    const [flippedCard, setFlippedCard] = useState<number | null>(null);
    const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
    const [activeTechIndex, setActiveTechIndex] = useState<number>(0);
    const [isHoveringTech, setIsHoveringTech] = useState<boolean>(false);

    useEffect(() => {
        if (isHoveringTech) return;
        const interval = setInterval(() => {
            setActiveTechIndex((prev) => (prev + 1) % 6);
        }, 2500);
        return () => clearInterval(interval);
    }, [isHoveringTech]);

    const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        dotsRef.current.forEach((dot, index) => {
            if (!dot) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveImageIndex(index);
                    }
                },
                {
                    root: null,
                    rootMargin: "-45% 0px -45% 0px",
                    threshold: 0
                }
            );
            observer.observe(dot);
            observers.push(observer);
        });
        return () => {
            observers.forEach(obs => obs.disconnect());
        };
    }, []);

    const texts = useMemo(() => ['Intelligent Systems', 'Agentic AI', 'Machine Learning', 'Neural Networks'], []);

    const values = useMemo(() => [
        {
            icon: '/optimized/innovation.webp',
            title: 'Innovation',
            desc: 'Cutting-edge AI solutions',
            glowColor: '#0284C7',
            hoverBg: 'bg-[#F0F9FF]',
            hoverBorder: 'border-[#0284C7]/40',
            normalBorder: 'border-[#0284C7]/15',
            iconBg: 'bg-[#E0F2FE]',
            iconBorder: 'border-[#BAE6FD]',
            iconColor: 'text-[#0284C7]'
        },
        {
            icon: '/optimized/lightning.webp',
            title: 'Excellence',
            desc: 'ISO certified quality',
            glowColor: '#2D6A4F',
            hoverBg: 'bg-[#F0FDF4]',
            hoverBorder: 'border-[#2D6A4F]/40',
            normalBorder: 'border-[#2D6A4F]/15',
            iconBg: 'bg-[#E8F5EE]',
            iconBorder: 'border-[#C8E6DA]',
            iconColor: 'text-[#2D6A4F]'
        },
        {
            icon: '/icons/shield.png',
            title: 'Trust',
            desc: 'Enterprise security',
            glowColor: '#E11D48',
            hoverBg: 'bg-[#FFF1F2]',
            hoverBorder: 'border-[#E11D48]/40',
            normalBorder: 'border-[#E11D48]/15',
            iconBg: 'bg-[#FFF1F2]',
            iconBorder: 'border-[#FFE4E6]',
            iconColor: 'text-[#E11D48]'
        },
        {
            icon: '/icons/collaboration.png',
            title: 'Collaboration',
            desc: 'Partnership focused',
            glowColor: '#F97316',
            hoverBg: 'bg-[#FFF7ED]',
            hoverBorder: 'border-[#F97316]/40',
            normalBorder: 'border-[#F97316]/15',
            iconBg: 'bg-[#FFF7ED]',
            iconBorder: 'border-[#FFEDD5]',
            iconColor: 'text-[#F97316]'
        },
    ], []);

    const features = useMemo(() => [
        {
            num: '01',
            title: 'Trusted Expertise',
            desc: 'World-class AI research team with proven track record in enterprise AI deployments. Our experts bring decades of experience ensuring robust solutions.',
            stat: '5000+ Sessions',
            details: 'Former researchers from Google, Meta, and DeepMind with 15+ years in AI/ML. Successfully deployed solutions serving millions worldwide.',
            highlights: ['PhD-level researchers', '200+ published papers', 'Enterprise solutions'],
            normalBorder: 'border-[#0284C7]/15',
            hoverBorder: 'hover:border-[#0284C7]/40',
            hoverBg: 'hover:bg-[#F0F9FF]',
            iconBg: 'bg-[#E0F2FE]',
            iconBorder: 'border-[#BAE6FD]',
            textColor: 'text-[#0284C7]',
            bulletBg: 'bg-[#0284C7]',
            hoverText: 'hover:text-[#0284C7]',
            hoverShadow: 'hover:shadow-[0_20px_40px_-15px_rgba(2,132,199,0.08)]'
        },
        {
            num: '02',
            title: 'Innovation-Driven',
            desc: 'Pushing technology boundaries with cutting-edge research in LLMs and autonomous agents. We invest heavily in R&D to deliver next-gen AI capabilities.',
            stat: 'Cutting-Edge',
            details: 'We invest 30% of resources in R&D, staying ahead with latest advancements in LLMs, autonomous agents, and neural networks.',
            highlights: ['Latest LLM technology', 'Real-time processing', 'Custom model training'],
            normalBorder: 'border-[#2D6A4F]/15',
            hoverBorder: 'hover:border-[#2D6A4F]/40',
            hoverBg: 'hover:bg-[#F0FDF4]',
            iconBg: 'bg-[#E8F5EE]',
            iconBorder: 'border-[#C8E6DA]',
            textColor: 'text-[#2D6A4F]',
            bulletBg: 'bg-[#2D6A4F]',
            hoverText: 'hover:text-[#2D6A4F]',
            hoverShadow: 'hover:shadow-[0_20px_40px_-15px_rgba(45,106,79,0.08)]'
        },
        {
            num: '03',
            title: 'Client-Centered',
            desc: 'Your success is our priority with dedicated support and customized solutions. We deliver tailored AI systems that integrate seamlessly with workflows.',
            stat: 'Tailored',
            details: 'Every solution customized to your unique needs. Dedicated support ensures 99.9% uptime with 24/7 monitoring and assistance.',
            highlights: ['24/7 dedicated support', '99.9% uptime SLA', 'Custom integrations'],
            normalBorder: 'border-[#E11D48]/15',
            hoverBorder: 'hover:border-[#E11D48]/40',
            hoverBg: 'hover:bg-[#FFF1F2]',
            iconBg: 'bg-[#FFF1F2]',
            iconBorder: 'border-[#FFE4E6]',
            textColor: 'text-[#E11D48]',
            bulletBg: 'bg-[#E11D48]',
            hoverText: 'hover:text-[#E11D48]',
            hoverShadow: 'hover:shadow-[0_20px_40px_-15px_rgba(225,29,72,0.08)]'
        },
        {
            num: '04',
            title: 'Production-Ready',
            desc: 'Scale without limits on cloud-native infrastructure handling billions of requests. Battle-tested architecture ensures zero downtime and automatic scaling.',
            stat: 'Enterprise',
            details: 'Cloud-native architecture handling billions of requests. Infrastructure scales automatically to meet growing demands with zero downtime.',
            highlights: ['Auto-scaling infrastructure', 'Billions of requests', 'Zero-downtime deploys'],
            normalBorder: 'border-[#EA580C]/15',
            hoverBorder: 'hover:border-[#EA580C]/40',
            hoverBg: 'hover:bg-[#FFF7ED]',
            iconBg: 'bg-[#FFF7ED]',
            iconBorder: 'border-[#FFEDD5]',
            textColor: 'text-[#EA580C]',
            bulletBg: 'bg-[#EA580C]',
            hoverText: 'hover:text-[#EA580C]',
            hoverShadow: 'hover:shadow-[0_20px_40px_-15px_rgba(234,88,12,0.08)]'
        },
    ], []);

    const offices = useMemo(() => [
        {
            name: 'India',
            city: 'Gurugram',
            country: 'India',
            flagImg: 'https://flagcdn.com/w40/in.png',
            image: '/CompanyOffice.webp',
            companyName: 'India Office',
            address: '4th Floor, Unit No. 455 JMD Empire, Sector 62, Gurugram',
            mapUrl: 'https://www.google.com/maps/search/?api=1&query=4th Floor, Unit No. 455 JMD Empire, Sector 62, Gurugram'
        },
        {
            name: 'USA',
            city: 'Austin',
            country: 'United States',
            flagImg: 'https://flagcdn.com/w40/us.png',
            image: '/701 Tillery St 12 3227, Austin, TX 78702, USA.jpg',
            companyName: 'USA Office',
            address: '701 Tillery Street Unit 12-3227, Austin, Texas 78702, United States',
            mapUrl: undefined
        },
        {
            name: 'UK',
            city: 'London',
            country: 'United Kingdom',
            flagImg: 'https://flagcdn.com/w40/gb.png',
            image: '/24-26-Arcadia-Ave-London-Primary-Photo-1-LargeHighDefinition.jpg',
            companyName: 'UK Office',
            address: '24-26 Arcadia Avenue, Fin009/8701, London, United Kingdom, N3 2JU',
            mapUrl: undefined
        },
    ], []);

    const tech = useMemo(() => [
        {
            icon: '/optimized/machine-learning.webp',
            label: 'AI/ML',
            hoverBg: 'bg-[#F0FDF4]',
            hoverBorder: 'border-[#2D6A4F]/40',
            hoverText: 'text-[#2D6A4F]'
        },
        {
            icon: '/optimized/custom-dev.webp',
            label: 'Development',
            hoverBg: 'bg-[#FFF7ED]',
            hoverBorder: 'border-[#EA580C]/40',
            hoverText: 'text-[#EA580C]'
        },
        {
            icon: '/optimized/lightning.webp',
            label: 'Processing',
            hoverBg: 'bg-[#f0fbfeff]',
            hoverBorder: 'border-[#0284C7]/40',
            hoverText: 'text-[#0284C7]'
        },
        {
            icon: '/optimized/data-analytics.webp',
            label: 'Big Data',
            hoverBg: 'bg-[#FDF2F8]',
            hoverBorder: 'border-[#DB2777]/40',
            hoverText: 'text-[#DB2777]'
        },
        {
            icon: '/optimized/architecture.webp',
            label: 'Architecture',
            hoverBg: 'bg-[#FEF3C7]',
            hoverBorder: 'border-[#D97706]/40',
            hoverText: 'text-[#D97706]'
        },
        {
            icon: '/optimized/innovation.webp',
            label: 'Innovation',
            hoverBg: 'bg-[#F0FDFA]',
            hoverBorder: 'border-[#0D9488]/40',
            hoverText: 'text-[#0D9488]'
        },
    ], []);

    return (
        <div ref={ref} className="min-h-screen relative overflow-hidden bg-white text-gray-900">
            <SEO
                title="About Us | Frostrek AI - Pioneering Enterprise AI"
                description="Learn about Frostrek AI's mission to make enterprise-grade AI accessible, our team of experts in India, USA, and UK, and our commitment to security and innovation."
                path="/about"
            />
            <CuteBackground />

            {/* ===== HERO ===== */}
            <motion.section style={{ y: bgY, opacity }} className="relative min-h-[50vh] md:min-h-[85vh] flex items-center py-10 md:py-20 pt-24 md:pt-36">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-4xl mx-auto text-center space-y-6"
                    >
                        {/* Live Calling Agent Decorative Badge */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5EE] border border-[#2D6A4F]/25 text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mx-auto shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse" />
                            <Bot size={13} className="inline" /> Calling Enterprise Agents Active
                        </div>

                        <div className="flex flex-col items-center">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#2D6A4F] leading-[1.05] tracking-tight flex flex-col items-center">
                                <SplitTextReveal as="span" type="chars" stagger={0.03} once={false} trigger="load">
                                    Revolutionizing AI with
                                </SplitTextReveal>
                                <span className="relative inline-block text-[#2D6A4F] mt-1">
                                    <TypewriterText texts={texts} />
                                    <motion.span
                                        className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-[#2D6A4F] to-[#2D6A4F]/40 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: '100%' }}
                                        transition={{ delay: 0.5, duration: 0.8 }}
                                    />
                                </span>
                            </h1>
                        </div>

                        <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-body">
                            We specialize in custom enterprise AI training, multi-agent orchestrations, and full-stack software systems built to redefine human-to-AI operational capacity.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center pt-4">
                            <MagneticButton
                                variant="primary"
                                className="px-8 py-4 text-sm"
                                onClick={() => navigate('/contact')}
                            >
                                <span className="flex items-center gap-2 font-body font-bold">
                                    Get Started <ArrowRight className="w-5 h-5" />
                                </span>
                            </MagneticButton>
                            <MagneticButton variant="secondary" className="px-8 py-4 text-sm" onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}>
                                <span className="font-body font-bold">Learn More</span>
                            </MagneticButton>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ===== TECH STACK ===== */}
            <section className="relative py-6 z-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
                        {tech.map((t, i) => (
                            <div
                                key={i}
                                onMouseEnter={() => {
                                    setIsHoveringTech(true);
                                    setActiveTechIndex(i);
                                }}
                                onMouseLeave={() => setIsHoveringTech(false)}
                            >
                                <TechIcon
                                    icon={t.icon}
                                    label={t.label}
                                    hoverBg={t.hoverBg}
                                    hoverBorder={t.hoverBorder}
                                    hoverText={t.hoverText}
                                    delay={i * 0.08}
                                    isGlow={activeTechIndex === i}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== STATS ===== */}
            <section id="stats" className="py-12 md:py-20 relative z-10">
                <div className="container mx-auto px-4">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-4xl mx-auto space-y-12">
                        <motion.p variants={fadeUp} className="text-center text-slate-600 text-lg md:text-xl font-body max-w-2xl mx-auto leading-relaxed">
                            Pioneering enterprise AI software built for compliance, scale, and high-performance outcomes.
                        </motion.p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                            {[
                                { value: 5000, suffix: '+', label: 'Training Sessions', textColor: 'text-[#0284C7]', glowColor: '#0284C7', hoverBg: 'bg-[#F0F9FF]', hoverBorder: 'border-[#0284C7]/40', normalBorder: 'border-[#0284C7]/15' },
                                { value: 200, suffix: '+', label: 'AI Specialists', textColor: 'text-[#2D6A4F]', glowColor: '#2D6A4F', hoverBg: 'bg-[#F0FDF4]', hoverBorder: 'border-[#2D6A4F]/40', normalBorder: 'border-[#2D6A4F]/15' },
                                { value: 99, suffix: '%', label: 'Accuracy Rate', textColor: 'text-[#E11D48]', glowColor: '#E11D48', hoverBg: 'bg-[#FFF1F2]', hoverBorder: 'border-[#E11D48]/40', normalBorder: 'border-[#E11D48]/15' },
                                { value: 50, suffix: '+', label: 'Enterprise Clients', textColor: 'text-[#EA580C]', glowColor: '#EA580C', hoverBg: 'bg-[#FFF7ED]', hoverBorder: 'border-[#EA580C]/40', normalBorder: 'border-[#EA580C]/15' },
                            ].map((s, i) => (
                                <motion.div key={i} variants={fadeUp}>
                                    <TiltCard hoverBg={s.hoverBg} hoverBorder={s.hoverBorder} normalBorder={s.normalBorder} glowColor={s.glowColor}>
                                        <div className="p-6 text-center space-y-1 font-body">
                                            <div className={cn("text-3xl md:text-4xl font-serif font-bold transition-colors duration-300", s.textColor)}>
                                                <Counter value={s.value} suffix={s.suffix} />
                                            </div>
                                            <div className="text-sm font-semibold text-slate-500">{s.label}</div>
                                        </div>
                                    </TiltCard>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===== PURPOSE / GROWTH SECTION ===== */}
            <section className="py-16 md:py-24 overflow-hidden relative z-10">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
                        {/* Left Content */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                            }}
                            className="space-y-6"
                        >
                            <h2 className="text-4xl md:text-5xl font-serif leading-[1.1] text-[#2D6A4F]">
                                {HEADLINE_WORDS.map((word, i) => (
                                    <span key={i} className="inline-block whitespace-pre">
                                        <motion.span
                                            className="inline-block"
                                            variants={{
                                                hidden: { opacity: 0, y: 15 },
                                                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                                            }}
                                        >
                                            {word}
                                        </motion.span>
                                        {' '}
                                    </span>
                                ))}
                            </h2>

                            <motion.p
                                variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
                                className="text-sm sm:text-base leading-relaxed font-body text-slate-600"
                            >
                                We partner with leading organizations to build next-generation agentic solutions, automating complex workflows with unmatched speed, accuracy, and security filters.
                            </motion.p>

                            <motion.p
                                variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
                                className="text-sm sm:text-base leading-relaxed font-body text-slate-600"
                            >
                                From planning workflows to orchestrating hundreds of parallel agents, our systems scale seamlessly on auto-scaling clusters, ensuring you stay ahead of the curve in a hyper-competitive AI landscape.
                            </motion.p>

                            <motion.div
                                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                                className="relative pl-6 border-l border-dashed border-gray-300 space-y-4 pt-2"
                            >
                                <div className="flex flex-wrap gap-4">
                                    <MagneticButton variant="primary" onClick={() => navigate("/experience")} className="px-6 py-3.5 text-xs font-bold tracking-wider uppercase bg-[#2D6A4F] text-white">
                                        VIEW OUR AGENT PLATFORM
                                    </MagneticButton>
                                    <MagneticButton variant="secondary" onClick={() => navigate("/contact")} className="px-6 py-3.5 text-xs font-bold tracking-wider uppercase border border-gray-200">
                                        CONTACT US
                                    </MagneticButton>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Side - Premium Gallery Collage */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="relative"
                        >
                            {/* Background blurs for depth */}
                            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#2D6A4F]/6 rounded-full blur-3xl -z-10" />
                            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#2D6A4F]/5 rounded-full blur-3xl -z-10" />

                            {/* 4-Image Masonry Gallery — 2 CSS columns, natural image heights */}
                            <div className="columns-2 gap-3 space-y-0">

                                {/* Col 1, top */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative rounded-2xl overflow-hidden group shadow-lg mb-3 break-inside-avoid"
                                >
                                    <img src="/optimized/office1.webp"
                                        alt="Frostrek Office"
                                        className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy" width={512} height={512} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                    {/* Team Frostrek badge */}
                                    <motion.div
                                        className="absolute bottom-3.5 left-4"
                                        initial={{ y: 10, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.55 }}
                                    >
                                        <div className="bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-lg border border-white/50">
                                            <span className="text-sm font-serif font-bold text-gray-900">
                                                Team <span className="text-[#2D6A4F]">Frostrek</span>
                                            </span>
                                        </div>
                                    </motion.div>
                                </motion.div>

                                {/* Col 1, bottom */}
                                <motion.div
                                    initial={{ opacity: 0, x: -16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative rounded-2xl overflow-hidden group shadow-md break-inside-avoid"
                                >
                                    <img src="/optimized/office2.webp"
                                        alt="Frostrek Workspace"
                                        className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy" width={512} height={512} />
                                    <div className="absolute inset-0 bg-[#2D6A4F]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </motion.div>

                                {/* Col 2, top */}
                                <motion.div
                                    initial={{ opacity: 0, x: 16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative rounded-2xl overflow-hidden group shadow-lg mb-3 break-inside-avoid"
                                >
                                    <img src="/optimized/FrostrekTeam2.webp"
                                        alt="Frostrek Team"
                                        className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy" width={512} height={512} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </motion.div>

                                {/* Col 2, bottom */}
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative rounded-2xl overflow-hidden group shadow-md break-inside-avoid"
                                >
                                    <img src="/optimized/office5.webp"
                                        alt="Frostrek Culture"
                                        className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy" width={512} height={512} />
                                    <div className="absolute inset-0 bg-[#2D6A4F]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </motion.div>
                            </div>


                            {/* Decorative "Our People" floating chip */}
                            <motion.div
                                className="absolute -top-3 -right-3 z-10 hidden sm:block"
                                initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 6 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, duration: 0.5, type: 'spring', stiffness: 200 }}
                            >
                                <div className="bg-[#2D6A4F] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                                    Our People ✦
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== TIMELINE SECTION ===== */}
            <section className="py-10 md:py-24 relative overflow-hidden z-10">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10 md:mb-16 space-y-2 md:space-y-3">
                        <SplitTextReveal
                            as="h2"
                            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2D6A4F]"
                            type="chars"
                            stagger={0.03}
                            once={false}
                        >
                            Our Journey
                        </SplitTextReveal>
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-body"
                        >
                            From a core R&D initiative to a global trailblazer in Multi-Agent Enterprise systems.
                        </motion.p>
                    </div>

                    <div className="relative max-w-6xl mx-auto">
                        {/* Vertical line with exact green gradient */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2D6A4F]/0 via-[#2D6A4F]/40 to-[#2D6A4F]/0 md:-translate-x-1/2" />

                        {TIMELINE_DATA.map((item, i) => {
                            const isActive = activeImageIndex === i;

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ delay: i * 0.08, duration: 0.5 }}
                                    className={`relative flex items-center gap-3 md:gap-8 mb-8 md:mb-16 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:min-h-[320px]`}
                                >
                                    {/* Timeline Dot */}
                                    <div
                                        ref={(el) => {
                                            if (el) dotsRef.current[i] = el;
                                        }}
                                        className="absolute left-4 md:left-1/2 w-4.5 h-4.5 rounded-full bg-[#2D6A4F] border-4 border-white shadow-md z-10 md:-translate-x-1/2 translate-x-[-10px] md:translate-x-[-9px]"
                                    >
                                        {isActive && (
                                            <motion.div
                                                className="absolute inset-0 bg-[#2D6A4F] rounded-full"
                                                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            />
                                        )}
                                    </div>

                                    {/* Content Card with perfect contrast */}
                                    <div className={`ml-10 md:ml-0 flex-1 min-w-0 ${i % 2 === 0 ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}>
                                        <motion.div
                                            className="bg-white rounded-xl md:rounded-2xl border border-gray-100 shadow-md p-4 md:p-6 cursor-pointer"
                                            whileHover={{ y: -3, boxShadow: '0 12px 30px rgba(45,106,79,0.08)' }}
                                        >
                                            <div className={`flex flex-col gap-1.5 md:gap-2 ${i % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-[#E8F5EE] border border-[#2D6A4F]/20 text-[#2D6A4F] font-body">
                                                        {item.year}
                                                    </span>
                                                    <item.icon className="w-4 h-4 text-[#2D6A4F]" />
                                                </div>
                                                <h3 className="text-base md:text-xl font-serif font-semibold text-gray-900">{item.title}</h3>
                                                <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-body">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Milestone visual block */}
                                    <div className={`hidden md:flex flex-1 min-w-0 items-center ${i % 2 === 0 ? 'md:pl-12 justify-start' : 'md:pr-12 justify-end'}`}>
                                        <AnimatePresence mode="wait">
                                            {isActive && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ duration: 0.4 }}
                                                    className="w-[500px] h-[280px] flex items-center justify-center"
                                                >
                                                    <div className={`relative rounded-2xl shadow-lg border ${item.color.border} ${item.color.bg} p-4 flex items-center justify-center`}>
                                                        <img src={item.image}
                                                            alt={item.title}
                                                            className="max-w-[468px] max-h-[248px] rounded-xl"
                                                            style={{ width: 'auto', height: 'auto' }}
                                                            loading="lazy" width={512} height={512} />
                                                        <div className="absolute inset-0 bg-[#2D6A4F]/5 pointer-events-none rounded-2xl" />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== INNOVATION ENGINE ===== */}
            <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50/50 via-white to-white border-y border-gray-100 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 space-y-3">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E8F5EE] text-[#2D6A4F] border border-[#2D6A4F]/15 font-body uppercase tracking-wider">
                            <Sparkles size={12} /> Execution Strategy
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2D6A4F]">
                            Our Innovation Engine
                        </h2>
                        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-body">
                            Our robust, multi-phase testing and orchestration blueprint ensures seamless, risk-free enterprise AI deployment.
                        </p>
                    </div>

                    <InnovationProcess />
                </div>
            </section>

            {/* ===== CORE VALUES ===== */}
            <section className="py-16 md:py-24 relative z-10 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 space-y-2">
                        <h2 className="text-3xl sm:text-4xl font-serif text-[#2D6A4F]">Core Values</h2>
                        <p className="text-slate-600 font-body font-semibold">The foundations powering our platform</p>
                    </div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
                        {values.map((v, i) => (
                            <motion.div key={i} variants={fadeUp}>
                                <TiltCard className="group" hoverBg={v.hoverBg} hoverBorder={v.hoverBorder} normalBorder={v.normalBorder} glowColor={v.glowColor}>
                                    <div className="p-6 text-center space-y-4">
                                        <motion.div
                                            className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mx-auto border shadow-sm transition-all duration-300", v.iconBg, v.iconBorder)}
                                            whileHover={{ rotate: 8, scale: 1.05 }}
                                        >
                                            <img src={v.icon}
                                                alt={v.title}
                                                className="w-6 h-6 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" loading="lazy" width={512} height={512} />
                                        </motion.div>
                                        <div className="space-y-1 font-body">
                                            <h3 className="font-serif font-semibold text-gray-900 text-lg">{v.title}</h3>
                                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{v.desc}</p>
                                        </div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ===== WHY CHOOSE ===== */}
            <section className="py-16 md:py-24 relative z-10 bg-gray-50/40 border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 space-y-2">
                        <h2 className="text-3xl sm:text-4xl font-serif text-[#2D6A4F]">Why Frostrek?</h2>
                        <p className="text-slate-600 font-body">Our unique platform advantages</p>
                    </div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
                        {features.map((f, i) => (
                            <motion.div key={i} variants={fadeUp} className="perspective-1000 h-[300px] sm:h-[280px]">
                                <div
                                    className="relative w-full h-full cursor-pointer"
                                    style={{ transformStyle: 'preserve-3d' }}
                                    onClick={() => setFlippedCard(flippedCard === i ? null : i)}
                                >
                                    <motion.div
                                        className="w-full h-full"
                                        animate={{ rotateY: flippedCard === i ? 180 : 0 }}
                                        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                                        style={{ transformStyle: 'preserve-3d' }}
                                    >
                                        {/* Front Side */}
                                        <div
                                            className={cn(
                                                "absolute inset-0 w-full h-full rounded-2xl shadow-md border bg-white p-6 pb-8 flex flex-col justify-between overflow-hidden transition-all duration-300",
                                                f.normalBorder,
                                                f.hoverBg,
                                                f.hoverBorder,
                                                f.hoverShadow
                                            )}
                                            style={{
                                                backfaceVisibility: 'hidden',
                                                WebkitBackfaceVisibility: 'hidden'
                                            }}
                                        >
                                            <div className="space-y-4">
                                                <div className="flex items-start gap-4">
                                                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center font-serif font-bold text-lg shrink-0 border transition-all duration-300", f.iconBg, f.iconBorder, f.textColor)}>
                                                        {f.num}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h3 className="font-serif font-bold text-base text-gray-900 leading-tight">{f.title}</h3>
                                                        <div className={cn("h-1 w-10 rounded-full transition-colors duration-300", f.bulletBg)} />
                                                    </div>
                                                </div>
                                                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-body">
                                                    {f.desc}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between border-t border-gray-50 pt-4 font-body">
                                                <span className={cn("text-xs font-bold transition-colors duration-300", f.textColor)}>
                                                    {f.stat}
                                                </span>
                                                <span className={cn("text-xs font-bold text-gray-400 flex items-center gap-1 transition-all duration-300", f.hoverText)}>
                                                    Flip for details ↻
                                                </span>
                                            </div>
                                        </div>

                                        {/* Back Side - Fixed Text Contrast (Light bg, dark text) */}
                                        <div
                                            className={cn(
                                                "absolute inset-0 w-full h-full rounded-2xl shadow-md border p-6 flex flex-col justify-between overflow-hidden bg-white transition-all duration-300",
                                                f.normalBorder,
                                                f.hoverBg,
                                                f.hoverBorder,
                                                f.hoverShadow
                                            )}
                                            style={{
                                                backfaceVisibility: 'hidden',
                                                WebkitBackfaceVisibility: 'hidden',
                                                transform: 'rotateY(180deg)'
                                            }}
                                        >
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                                    <h3 className="font-serif font-bold text-sm sm:text-base text-gray-900">{f.title}</h3>
                                                    <span className={cn("text-sm font-bold transition-colors duration-300", f.textColor)}>{f.num}</span>
                                                </div>
                                                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-body">
                                                    {f.details}
                                                </p>
                                                <div className="space-y-1.5 pt-1">
                                                    {f.highlights.map((highlight, idx) => (
                                                        <div key={idx} className="flex items-center gap-2">
                                                            <CheckCircle2 size={13} className={cn("shrink-0 transition-colors duration-300", f.textColor)} />
                                                            <span className="text-xs text-gray-700 font-body font-semibold">{highlight}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className={cn("text-center text-[11px] font-bold pt-2 border-t border-gray-100 font-body transition-colors duration-300", f.textColor)}>
                                                Click to flip back ↻
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ===== GLOBAL PRESENCE ===== */}
            <section className="py-16 md:py-24 relative overflow-hidden z-10 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 space-y-3">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E8F5EE] text-[#2D6A4F] border border-[#2D6A4F]/15 font-body uppercase tracking-wider font-semibold">
                            <Globe size={12} /> Global Presence
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2D6A4F]">
                            Our Global Offices
                        </h2>
                        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-body">
                            Serving fast-growing enterprises across three global hubs.
                        </p>
                    </div>

                    <div className="max-w-[1200px] mx-auto">
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                            {offices.map((o, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="group bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden flex flex-col justify-between h-[400px] sm:h-[450px]"
                                >
                                    {/* Image block with hover directions */}
                                    <div className="h-[60%] overflow-hidden relative group">
                                        <img src={o.image}
                                            alt={o.city}
                                            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                                            loading="lazy" width={512} height={512} />
                                        <div className="absolute inset-0 bg-black/15 group-hover:bg-black/45 transition-colors duration-300" />

                                        {/* Hover map overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="bg-white/95 backdrop-blur px-4 py-3 rounded-2xl shadow-xl max-w-[85%] border border-gray-100 text-center space-y-3">
                                                <p className="text-xs text-gray-700 font-body font-semibold leading-relaxed">
                                                    {o.address}
                                                </p>
                                                {o.mapUrl && (
                                                    <a
                                                        href={o.mapUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-block px-4 py-1.5 rounded-lg bg-[#2D6A4F] hover:bg-[#204F3B] text-white font-body font-bold text-xs shadow-md transition-colors"
                                                    >
                                                        Get Directions
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer details */}
                                    <div className="h-[40%] p-5 flex flex-col justify-between">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-1.5">
                                                <img src={o.flagImg} alt="flag" className="w-5 h-3.5 rounded border border-gray-100 object-cover" loading="lazy" width={512} height={512} />
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D6A4F] font-body">
                                                    {o.name}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-serif font-semibold text-gray-900">{o.city}</h3>
                                            <p className="text-xs sm:text-sm text-gray-500 font-body">{o.country}</p>
                                        </div>

                                        {/* Mobile directions link */}
                                        <div className="lg:hidden">
                                            <a
                                                href={o.mapUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block w-full text-center py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-700 font-body"
                                            >
                                                Get Directions
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default About;

export { FloatingIcon, InteractiveGlobe, CheckItem, CertificationBadge, AwardCard, ExpandableTechCategory, TechEcosystemDiagram, TeamFlipCard };

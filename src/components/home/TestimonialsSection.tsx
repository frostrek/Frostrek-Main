import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Quote } from 'lucide-react';
import SplitTextReveal from '../ui/SplitTextReveal';

type ColorPaletteKey = 'blue' | 'orange' | 'pink' | 'green' | 'purple' | 'teal';

interface ColorTheme {
  cardBorder: string;
  cardHoverBorder: string;
  cardHoverShadow: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  quoteColor: string;
  avatarBg: string;
  avatarBorder: string;
}

const COLOR_THEMES: Record<ColorPaletteKey, ColorTheme> = {
  blue: {
    cardBorder: 'border-[#BAE6FD]',
    cardHoverBorder: 'hover:border-[#0EA5E9]',
    cardHoverShadow: 'hover:shadow-[0_20px_45px_rgba(14,165,233,0.12)]',
    badgeBg: 'bg-[#F0F9FF]',
    badgeText: 'text-[#0284C7]',
    badgeBorder: 'border-[#BAE6FD]',
    quoteColor: 'text-[#0EA5E9]',
    avatarBg: 'bg-[#F0F9FF]',
    avatarBorder: 'border-[#BAE6FD]',
  },
  orange: {
    cardBorder: 'border-[#FFEDD5]',
    cardHoverBorder: 'hover:border-[#F97316]',
    cardHoverShadow: 'hover:shadow-[0_20px_45px_rgba(249,115,22,0.12)]',
    badgeBg: 'bg-[#FFF7ED]',
    badgeText: 'text-[#C2410C]',
    badgeBorder: 'border-[#FFEDD5]',
    quoteColor: 'text-[#F97316]',
    avatarBg: 'bg-[#FFF7ED]',
    avatarBorder: 'border-[#FFEDD5]',
  },
  pink: {
    cardBorder: 'border-[#FFE4E6]',
    cardHoverBorder: 'hover:border-[#FB7185]',
    cardHoverShadow: 'hover:shadow-[0_20px_45px_rgba(251,113,133,0.12)]',
    badgeBg: 'bg-[#FFF1F2]',
    badgeText: 'text-[#E11D48]',
    badgeBorder: 'border-[#FFE4E6]',
    quoteColor: 'text-[#FB7185]',
    avatarBg: 'bg-[#FFF1F2]',
    avatarBorder: 'border-[#FFE4E6]',
  },
  green: {
    cardBorder: 'border-[#BBF7D0]',
    cardHoverBorder: 'hover:border-[#047857]',
    cardHoverShadow: 'hover:shadow-[0_20px_45px_rgba(4,120,87,0.12)]',
    badgeBg: 'bg-[#F0FDF4]',
    badgeText: 'text-[#047857]',
    badgeBorder: 'border-[#BBF7D0]',
    quoteColor: 'text-[#047857]',
    avatarBg: 'bg-[#F0FDF4]',
    avatarBorder: 'border-[#BBF7D0]',
  },
  purple: {
    cardBorder: 'border-[#E9D5FF]',
    cardHoverBorder: 'hover:border-[#A855F7]',
    cardHoverShadow: 'hover:shadow-[0_20px_45px_rgba(168,85,247,0.12)]',
    badgeBg: 'bg-[#FAF5FF]',
    badgeText: 'text-[#7E22CE]',
    badgeBorder: 'border-[#E9D5FF]',
    quoteColor: 'text-[#A855F7]',
    avatarBg: 'bg-[#FAF5FF]',
    avatarBorder: 'border-[#E9D5FF]',
  },
  teal: {
    cardBorder: 'border-[#99F6E4]',
    cardHoverBorder: 'hover:border-[#0D9488]',
    cardHoverShadow: 'hover:shadow-[0_20px_45px_rgba(13,148,136,0.12)]',
    badgeBg: 'bg-[#F0FDFA]',
    badgeText: 'text-[#0D9488]',
    badgeBorder: 'border-[#99F6E4]',
    quoteColor: 'text-[#0D9488]',
    avatarBg: 'bg-[#F0FDFA]',
    avatarBorder: 'border-[#99F6E4]',
  },
};

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  colorKey: ColorPaletteKey;
  logo?: string;
  initials?: string;
  highlight: string;
  quote: string;
  desktopPosition: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    x?: string | number;
    rotate: number;
    zIndex: number;
  };
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'daniel',
    name: 'Daniel',
    role: 'Founder, AI Shield OS',
    company: 'AI Shield OS',
    colorKey: 'blue',
    logo: '/testimonials/aishield-logo.png',
    highlight: 'Zero-to-One SEO Visibility',
    quote:
      'Before Frostrek, AI Shield OS had virtually zero footprint on Google. Within two months, their SEO playbook pushed our core keywords to page one, turning organic search into our #1 pipeline for daily inbound leads.',
    desktopPosition: {
      top: '0%',
      left: '0%',
      rotate: -2.2,
      zIndex: 10,
    },
  },
  {
    id: 'deszinetalks',
    name: 'Manish Goyal',
    role: 'Founder, DeszineTalks',
    company: 'DeszineTalks',
    colorKey: 'orange',
    logo: '/testimonials/deszinetalks-logo.png',
    highlight: 'E-Commerce Growth & Transparency',
    quote:
      'Frostrek gave our e-commerce business an immediate revenue boost. What stood out most was their transparency—we were seamlessly looped in on every single deploy and iteration. It genuinely felt like having our own in-house tech team.',
    desktopPosition: {
      top: '2%',
      right: '0%',
      rotate: 2.4,
      zIndex: 11,
    },
  },
  {
    id: 'thabo',
    name: 'Thabo Mokoena',
    colorKey: 'teal',
    initials: 'TM',
    highlight: 'Manufacturing Line & IoT Advisory',
    quote:
      'Frostrek’s consultancy revolutionized our aquatic feed manufacturing line. Their engineering team eliminated critical bottlenecks, driving a multi-ton reduction in raw material wastage and a major leap in throughput—backed by reliable live telemetry across our entire facility.',
    desktopPosition: {
      top: '21%',
      left: '50%',
      x: '-50%',
      rotate: -1.0,
      zIndex: 20,
    },
  },
  {
    id: 'constantin',
    name: 'Constantin Etot',
    colorKey: 'purple',
    initials: 'CE',
    highlight: 'Blockchain & Fintech Advisory',
    quote:
      'Frostrek’s consultancy on our blockchain fintech platform was pivotal to our launch and scale. They brought deep architectural clarity and sleek, robust design patterns to a highly complex ecosystem. What truly set them apart was their delivery velocity—milestones were consistently shipped well ahead of schedule.',
    desktopPosition: {
      top: '42%',
      left: '0%',
      rotate: 1.8,
      zIndex: 30,
    },
  },
  {
    id: 'synnect',
    name: 'Manoj Sharma',
    role: 'Founder, Synnect',
    company: 'Synnect',
    colorKey: 'pink',
    logo: '/testimonials/synnect-logo.png',
    highlight: 'Playful & Minimal Platform',
    quote:
      'Frostrek immediately grasped our vision for a playful, ultra-minimal interface and built it to perfection. They struck the ideal balance between personality and simplicity—delivering a snappy, responsive frontend that our users absolutely love.',
    desktopPosition: {
      top: '44%',
      right: '0%',
      rotate: -2.0,
      zIndex: 31,
    },
  },
  {
    id: 'vedashi',
    name: 'Surendra',
    role: 'Founder, Vedashi Herbals',
    company: 'Vedashi Herbals',
    colorKey: 'green',
    logo: '/testimonials/vedashi-leaf-logo.jpg',
    highlight: 'Cross-Border Store for Russia',
    quote:
      'Building a custom storefront to sell premium Indian Ayurvedic and wellness products into the Russian market demanded complex multi-currency, localization, and shipping logistics. Frostrek engineered our custom store from the ground up, unlocking our international expansion.',
    desktopPosition: {
      top: '64%',
      left: '50%',
      x: '-48%',
      rotate: 1.2,
      zIndex: 40,
    },
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const isCardsInView = useInView(cardsContainerRef, { amount: 0.2, once: false });
  const [poppedCount, setPoppedCount] = useState<number>(0);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Sequential popping effect: cards pop out one by one with distinct, deliberate spring timing
  useEffect(() => {
    if (!isCardsInView) {
      setPoppedCount(0);
      return;
    }

    // Distinct sequential pops: Card 1 -> Card 2 -> Card 3 -> Card 4 -> Card 5 -> Card 6
    const t0 = setTimeout(() => setPoppedCount(1), 200);
    const t1 = setTimeout(() => setPoppedCount(2), 750);
    const t2 = setTimeout(() => setPoppedCount(3), 1300);
    const t3 = setTimeout(() => setPoppedCount(4), 1850);
    const t4 = setTimeout(() => setPoppedCount(5), 2400);
    const t5 = setTimeout(() => setPoppedCount(6), 2950);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [isCardsInView]);

  const renderCardContent = (testimonial: Testimonial) => {
    const theme = COLOR_THEMES[testimonial.colorKey];

    return (
      <>
        {/* Top Row: Avatar, Name, Role & Themed Quote Mark */}
        <div className="flex items-start gap-2.5 mb-2">
          <div
            className={`w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ${theme.avatarBg} border ${theme.avatarBorder} flex items-center justify-center p-0.5 shadow-xs`}
          >
            {testimonial.logo ? (
              <img
                src={testimonial.logo}
                alt={testimonial.name}
                className="w-full h-full object-contain"
                loading="lazy"
                width={32}
                height={32}
              />
            ) : (
              <span className={`text-[11px] font-bold font-serif ${theme.badgeText}`}>
                {testimonial.initials || 'CE'}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0 pr-2">
            <h3 className="font-serif font-bold text-xs sm:text-[13px] text-gray-900 tracking-tight leading-tight">
              {testimonial.name}
            </h3>
            {testimonial.role && (
              <p className="text-[10px] text-gray-400 font-medium leading-tight mt-0.5 truncate">
                {testimonial.role}
              </p>
            )}
          </div>

          <Quote
            className={`w-3.5 h-3.5 flex-shrink-0 ${theme.quoteColor} opacity-75`}
          />
        </div>

        {/* Highlight Badge */}
        <div className="mb-1.5">
          <span
            className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border inline-block ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}
          >
            {testimonial.highlight}
          </span>
        </div>

        {/* Authentic Quote Text */}
        <p className="text-[11px] sm:text-[11.5px] leading-relaxed text-gray-600 font-sans">
          {testimonial.quote}
        </p>
      </>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 relative overflow-hidden bg-brand-light-bg font-sans border-b border-gray-100/60"
    >
      {/* Background Soft Lighting Gradients */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#2D6A4F]/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#2EE1C7]/5 rounded-full blur-3xl pointer-events-none translate-x-1/3" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-[1340px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ──────────────── Left Column: H2 & Subtext ──────────────── */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2F0] border border-[#2D6A4F]/20 mb-4 w-fit"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span className="text-[#2D6A4F] text-xs font-bold uppercase tracking-wider">
                Client Testimonials
              </span>
            </motion.div>

            {/* H2 Title: "what our customers says." */}
            <div className="mb-3.5">
              <SplitTextReveal
                as="h2"
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] text-[#2D6A4F] leading-[1.12] tracking-[-0.025em]"
                type="chars"
                stagger={0.02}
                once={false}
              >
                what our customers says.
              </SplitTextReveal>
            </div>

            {/* Subtext: "Here our some of our testimonials." */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base text-gray-600 font-sans leading-relaxed"
            >
              Here our some of our testimonials. From high-growth e-commerce storefronts and custom minimal platforms to game-changing search visibility and strategic enterprise consultations.
            </motion.p>
          </div>

          {/* ──────────────── Right Column: Wireframe Interlocking Scattered Canvas ──────────────── */}
          <div ref={cardsContainerRef} className="lg:col-span-7 relative">
            {/* Mobile View: Snug Single-Column Overlapping Deck (< 640px) */}
            <div className="sm:hidden flex flex-col -space-y-4 max-w-[340px] mx-auto">
              {TESTIMONIALS.map((testimonial, idx) => {
                const theme = COLOR_THEMES[testimonial.colorKey];
                const isPopped = idx < poppedCount;
                return (
                  <motion.div
                    key={testimonial.id}
                    initial={{ scale: 0.2, opacity: 0, y: 24 }}
                    animate={
                      isPopped
                        ? { scale: 1, opacity: 1, y: 0 }
                        : { scale: 0.2, opacity: 0, y: 24 }
                    }
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 18,
                    }}
                    style={{
                      pointerEvents: isPopped ? 'auto' : 'none',
                      zIndex: 10 + idx * 5,
                    }}
                    className={`relative bg-white rounded-xl border ${theme.cardBorder} p-3.5 shadow-sm`}
                  >
                    {renderCardContent(testimonial)}
                  </motion.div>
                );
              })}
            </div>

            {/* Tablet & Desktop View: Exact Interlocking Geometric Scatter (>= 640px) */}
            <div className="hidden sm:block relative w-full h-[530px] sm:h-[550px] lg:h-[570px] max-w-[660px] mx-auto">
              {TESTIMONIALS.map((testimonial, idx) => {
                const theme = COLOR_THEMES[testimonial.colorKey];
                const isPopped = idx < poppedCount;
                const isHovered = hoveredCardId === testimonial.id;
                const pos = testimonial.desktopPosition;
                const posX = pos.x ?? 0;

                return (
                  <motion.div
                    key={testimonial.id}
                    initial={{ scale: 0, opacity: 0, y: 36, x: posX }}
                    animate={
                      isPopped
                        ? {
                            scale: isHovered ? 1.05 : 1,
                            opacity: 1,
                            y: isHovered ? -8 : 0,
                            x: posX,
                            rotate: isHovered ? 0 : pos.rotate,
                            zIndex: isHovered ? 50 : pos.zIndex,
                          }
                        : {
                            scale: 0,
                            opacity: 0,
                            y: 36,
                            x: posX,
                            rotate: 0,
                            zIndex: pos.zIndex,
                          }
                    }
                    transition={
                      isHovered
                        ? { type: 'spring', stiffness: 400, damping: 25 }
                        : { type: 'spring', stiffness: 320, damping: 18, mass: 0.85 }
                    }
                    onMouseEnter={() => setHoveredCardId(testimonial.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    style={{
                      position: 'absolute',
                      top: pos.top,
                      bottom: pos.bottom,
                      left: pos.left,
                      right: pos.right,
                      maxWidth: '282px',
                      pointerEvents: isPopped ? 'auto' : 'none',
                    }}
                    className={`cursor-pointer bg-white rounded-xl sm:rounded-2xl border ${theme.cardBorder} p-3 sm:p-3.5 shadow-[0_4px_18px_rgba(0,0,0,0.04)] ${theme.cardHoverBorder} ${theme.cardHoverShadow} transition-shadow duration-300`}
                  >
                    {renderCardContent(testimonial)}
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

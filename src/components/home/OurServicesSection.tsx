import { motion } from "framer-motion";
import { Bot, Brain, Code, Cpu, LineChart, Workflow, Server } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SpotlightCard from '../ui/SpotlightCard';

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
}

const services: Service[] = [
  {
    title: "AI Talent Acquisition & Deployment",
    description:
      "Identify and place experienced AI professionals who align precisely with your project goals, technical needs, and delivery schedules.",
    icon: Cpu,
    image: "/images/services/talent-acquisition.png",
  },
  {
    title: "AI Model Training & Optimization",
    description:
      "Improve AI model outcomes through expert-led training, fine-tuning, and real-world validation for consistent accuracy and impact.",
    icon: LineChart,
    image: "/images/services/model-training.png",
  },
  {
    title: "Tailored AI Development Solutions",
    description:
      "Create custom-built AI systems designed to solve complex business problems with scalable, dependable, and efficient architectures.",
    icon: Brain,
    image: "/images/services/ai-solutions.png",
  },
  {
    title: "AI Agents & Autonomous Systems",
    description:
      "Build intelligent AI agents capable of independent reasoning, decision-making, and task execution across operational workflows.",
    icon: Bot,
    image: "/images/services/ai-agents.png",
  },
  {
    title: "AI Platform Development",
    description:
      "Build production-ready applications and platforms that seamlessly embed AI into everyday business operations.",
    icon: Server,
    image: "/images/services/platform-dev.png",
  },
  {
    title: "Workflow Automation & Integration",
    description:
      "Integrate AI into organizational processes to automate workflows, enhance efficiency, and enable seamless coordination.",
    icon: Workflow,
    image: "/services/automation.png",
  },
  {
    title: "Manufacturing Intelligence",
    description:
      "Real-time visibility across your entire operation. AI scheduling that recovers lost production without replacing existing systems.",
    icon: Code,
    image: "/services/aitraining.png",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * index, duration: 0.5, ease: "easeOut" as const },
  }),
};

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      custom={index}
      variants={cardVariants}
      className="h-full"
    >
      <SpotlightCard
        className="group h-full flex flex-col overflow-hidden rounded-2xl border border-[#2EE1C7]/30 bg-zinc-950/80 transition-all duration-500 hover:border-[#2EE1C7]/60 hover:shadow-[0_0_30px_rgba(46,225,199,0.25)]"
        spotlightColor="rgba(46, 225, 199, 0.15)"
      >
        {/* Image Wrapper */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

          {/* Icon Badge Overlay */}
          <div className="absolute bottom-4 left-4 w-10 h-10 rounded-xl bg-black/60 backdrop-blur-md border border-[#2EE1C7]/30 flex items-center justify-center text-[#2EE1C7] group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-5 h-5" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-base font-bold text-white mb-3 group-hover:text-[#2EE1C7] transition-colors line-clamp-2">
            {service.title}
          </h3>
          <p className="text-xs leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors line-clamp-4">
            {service.description}
          </p>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

const OurServicesSection = () => {
  return (
    <section
      id="our-services"
      className="relative py-20 font-sans overflow-hidden bg-black"
    >
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2EE1C7]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2EE1C7]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2EE1C7]/30 bg-[#2EE1C7]/5 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2EE1C7] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2EE1C7]">
              Services
            </span>
          </div>
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our {" "}
            <span className="text-[#2EE1C7]">Services</span>
          </motion.h2>
          <motion.p
            className="text-base text-slate-400 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Cutting-edge AI services engineered for scale, reliability, and real-world impact.
          </motion.p>
        </div>

        {/* Services Grid - 5 columns on laptop */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServicesSection;

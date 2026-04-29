import { motion } from "framer-motion";
import { Bot, Brain, Code, Cpu, LineChart, Workflow, Server } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

const services: Service[] = [
  {
    title: "AI Talent Acquisition & Deployment",
    description:
      "Identify and place experienced AI professionals who align precisely with your project goals, technical needs, and delivery schedules.",
    icon: Cpu,
  },
  {
    title: "AI Model Training & Performance Optimization",
    description:
      "Improve AI model outcomes through expert-led training, fine-tuning, and real-world validation for consistent accuracy and impact.",
    icon: LineChart,
  },
  {
    title: "Tailored AI Development Solutions",
    description:
      "Create custom-built AI systems designed to solve complex business problems with scalable, dependable, and efficient architectures.",
    icon: Brain,
  },
  {
    title: "AI Agents & Autonomous Systems",
    description:
      "Build intelligent AI agents capable of independent reasoning, decision-making, and task execution across operational workflows.",
    icon: Bot,
  },
  {
    title: "AI-Powered Application & Platform Development",
    description:
      "Build production-ready web and mobile applications, internal tools, dashboards, and platforms that seamlessly embed AI into everyday business operations.",
    icon: Server,
  },
  {
    title: "Organizational Workflow Automation & Integration",
    description:
      "Integrate AI into organizational processes to automate workflows, enhance efficiency, and enable seamless coordination across systems and teams.",
    icon: Workflow,
  },
  {
    title: "ServiceNow Expertise",
    description:
      "Frostrek provides ServiceNow-focused implementation and managed services support through in-house certified professionals with CSA and CAD certifications.",
    icon: Code,
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

const OurServicesSection = () => {
  return (
    <section
      id="our-services"
      className="relative pt-6 pb-12 md:pt-10 md:pb-20 font-sans overflow-hidden bg-black"
    >
      {/* Content Container */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10 md:gap-12 px-4 sm:px-6 md:px-8">
        {/* Header Section */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-3 bg-zinc-900/50 border-[#2EE1C7]/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#2EE1C7]/60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2EE1C7]" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2EE1C7]">
              Services
            </span>
          </div>
          <motion.h2
            className="text-2xl md:text-4xl font-bold mb-3 text-slate-50"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our <span className="text-[#2EE1C7]">Services</span>
          </motion.h2>

          <motion.p
            className="text-base max-w-2xl mx-auto text-slate-300/90"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Cutting-edge AI services engineered for scale, reliability, and real-world impact.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:gap-7 md:gap-8 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                className="group relative flex flex-col h-full rounded-xl border border-[#2EE1C7]/40 bg-zinc-950/40 p-5 md:p-6 text-left transition-all duration-300 hover:border-[#2EE1C7]/60 hover:bg-zinc-900/50"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={index}
                variants={cardVariants}
              >
                {/* Header Row: Title and Icon */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-lg font-bold text-slate-50 leading-tight group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <div className="w-9 h-9 shrink-0 rounded-lg bg-[#2EE1C7]/10 flex items-center justify-center text-[#2EE1C7] border border-[#2EE1C7]/20 group-hover:bg-[#2EE1C7]/20 transition-colors">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors flex-grow">
                  {service.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurServicesSection;

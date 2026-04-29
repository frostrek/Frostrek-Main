import { motion } from "framer-motion";
import { Bot, Brain, Code, Cpu, LineChart, Workflow, Server } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  glowColor: string;
}

const services: Service[] = [
  {
    title: "AI Talent Acquisition & Deployment",
    description:
      "Identify and place experienced AI professionals who align precisely with your project goals, technical needs, and delivery schedules.",
    icon: Cpu,
    color: "from-cyan-500 to-blue-500",
    glowColor: "rgba(6, 182, 212, 0.4)",
  },
  {
    title: "AI Model Training & Performance Optimization",
    description:
      "Improve AI model outcomes through expert-led training, fine-tuning, and real-world validation for consistent accuracy and impact.",
    icon: LineChart,
    color: "from-purple-500 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.4)",
  },
  {
    title: "Tailored AI Development Solutions",
    description:
      "Create custom-built AI systems designed to solve complex business problems with scalable, dependable, and efficient architectures.",
    icon: Brain,
    color: "from-indigo-500 to-cyan-500",
    glowColor: "rgba(99, 102, 241, 0.4)",
  },
  {
    title: "AI Agents & Autonomous Systems",
    description:
      "Build intelligent AI agents capable of independent reasoning, decision-making, and task execution across operational workflows.",
    icon: Bot,
    color: "from-teal-500 to-green-500",
    glowColor: "rgba(20, 184, 166, 0.4)",
  },
  {
    title: "AI-Powered Application & Platform Development",
    description:
      "Build production-ready web and mobile applications, internal tools, dashboards, and platforms that seamlessly embed AI into everyday business operations.",
    icon: Server,
    color: "from-orange-500 to-amber-500",
    glowColor: "rgba(251, 146, 60, 0.4)",
  },
  {
    title: "Organizational Workflow Automation & Integration",
    description:
      "Integrate AI into organizational processes to automate workflows, enhance efficiency, and enable seamless coordination across systems and teams.",
    icon: Workflow,
    color: "from-emerald-500 to-lime-500",
    glowColor: "rgba(16, 185, 129, 0.4)",
  },
  {
    title: "ServiceNow Expertise",
    description:
      "Frostrek provides ServiceNow-focused implementation and managed services support through in-house certified professionals. Our team includes CSA (Certified System Administrator) and CAD (Certified Application Developer) certified resources, enabling us to support ITSM workflows, platform customization, integrations, and ongoing operations for enterprise clients and ServiceNow ecosystem partners.",
    icon: Code,
    color: "from-blue-500 to-indigo-500",
    glowColor: "rgba(59, 130, 246, 0.4)",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.1 * index, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] as const },
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
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Our <span className="text-[#2EE1C7]">Services</span>
          </motion.h2>

          <motion.p
            className="text-base max-w-2xl mx-auto text-slate-300/90"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Cutting-edge AI services engineered for scale, reliability, and real-world impact.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:gap-7 md:gap-8 lg:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                className="group relative flex flex-col h-full rounded-2xl md:rounded-3xl border border-[#2EE1C7]/30 bg-zinc-950/30 p-7 md:p-9 text-left backdrop-blur-3xl transition-all duration-500 overflow-hidden hover:shadow-2xl hover:shadow-[#2EE1C7]/10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={index}
                variants={cardVariants}
                whileHover={{
                  borderColor: "rgba(46, 225, 199, 0.6)",
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                {/* Tech grid pattern background */}
                <div className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.5)_1px,transparent_1px)] bg-[size:25px_25px] rounded-2xl md:rounded-3xl" />
                </div>

                {/* Gradient glow background */}
                <motion.div
                  className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  animate={{
                    background: [
                      `radial-gradient(circle at 0% 0%, ${service.glowColor} 0%, transparent 50%)`,
                      `radial-gradient(circle at 100% 100%, ${service.glowColor} 0%, transparent 50%)`,
                      `radial-gradient(circle at 0% 0%, ${service.glowColor} 0%, transparent 50%)`,
                    ],
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />

                {/* Border glow effect */}
                <motion.div
                  className="absolute -inset-0.5 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-25 pointer-events-none transition-opacity duration-500 blur-sm"
                  style={{
                    background: `linear-gradient(135deg, ${service.glowColor}, transparent)`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />

                {/* Content */}
                <div className="relative z-20 flex flex-col h-full">
                  {/* Icon and Number Header */}
                  <div className="flex items-center justify-between mb-5">
                    <motion.div
                      className={`p-3 rounded-xl bg-gradient-to-br ${service.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </motion.div>

                    <motion.span
                      className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-white/30 to-white/10 bg-clip-text text-transparent group-hover:from-cyan-400/40 group-hover:to-purple-400/20 transition-all duration-500"
                      animate={{ rotate: [0, 3, 0] }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </motion.span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-slate-50 leading-tight mb-4 group-hover:text-cyan-50 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base font-normal leading-relaxed text-slate-300/85 group-hover:text-slate-200/90 transition-colors duration-300 flex-grow">
                    {service.description}
                  </p>
                </div>

                {/* Corner accent */}
                <motion.div
                  className={`absolute bottom-0 right-0 h-32 w-32 bg-gradient-to-tl ${service.color} rounded-tl-3xl opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 pointer-events-none`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />

                {/* Tech indicators */}
                <div className="absolute top-5 right-5 flex gap-1.5 pointer-events-none">
                  <motion.div
                    className="h-1.5 w-1.5 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="h-1.5 w-1.5 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.3, repeat: Infinity, delay: 0.3 }}
                  />
                  <motion.div
                    className="h-1.5 w-1.5 rounded-full bg-pink-400 opacity-0 group-hover:opacity-100"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.6, repeat: Infinity, delay: 0.6 }}
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurServicesSection;

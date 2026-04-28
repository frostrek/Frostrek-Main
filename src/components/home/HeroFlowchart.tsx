import { 
  FileText, Filter, Network, BrainCircuit, 
  Zap, Brain, Settings, TrendingUp,
  Lock, Boxes, Activity, Link as LinkIcon
} from 'lucide-react';

const FlowBox = ({ icon: Icon, title, desc, step, side }: { icon: any, title: string, desc: string, step: number, side: 'left' | 'right' }) => (
  <div className="relative flex items-center gap-4 p-4 rounded-xl border border-[#2EE1C7]/30 bg-black/60 hover:bg-[#2EE1C7]/10 transition-colors backdrop-blur-md group h-[88px] shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10 w-full">
    {side === 'left' && (
      <div className="hidden lg:flex absolute -left-6 w-6 h-6 rounded-full border border-[#2EE1C7] items-center justify-center text-[10px] text-[#2EE1C7] bg-black shadow-[0_0_10px_rgba(46,225,199,0.3)]">
        {step}
      </div>
    )}
    <div className="w-12 h-12 flex-shrink-0 rounded-lg border border-[#2EE1C7]/50 bg-[#2EE1C7]/10 flex items-center justify-center text-[#2EE1C7] shadow-[inset_0_0_10px_rgba(46,225,199,0.2)]">
      <Icon size={22} />
    </div>
    <div className="flex-1">
      <h3 className="text-[13px] font-bold text-white mb-1 group-hover:text-[#2EE1C7] transition-colors leading-tight">{title}</h3>
      <p className="text-[11px] text-gray-400 leading-tight">{desc}</p>
    </div>
    {side === 'right' && (
      <div className="hidden lg:flex absolute -right-6 w-6 h-6 rounded-full border border-[#2EE1C7] items-center justify-center text-[10px] text-[#2EE1C7] bg-black shadow-[0_0_10px_rgba(46,225,199,0.3)]">
        {step}
      </div>
    )}
    
    {/* Connection points */}
    {side === 'left' && <div className="hidden lg:block absolute -right-1 w-2 h-2 rounded-full bg-[#2EE1C7] shadow-[0_0_10px_#2EE1C7]" />}
    {side === 'right' && <div className="hidden lg:block absolute -left-1 w-2 h-2 rounded-full bg-[#2EE1C7] shadow-[0_0_10px_#2EE1C7]" />}
  </div>
);

const HeroFlowchart = () => {
  return (
    <div className="w-full max-w-7xl mx-auto mt-0 relative z-20 px-4 mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_320px] xl:grid-cols-[350px_1fr_350px] gap-8 lg:gap-0 items-start relative w-full lg:h-[500px]">
        
        {/* SVG CONNECTING LINES (Only visible on LG+) */}
        {/* Spans the entire center column. width is 100%, viewBox handles scaling */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block z-0 lg:left-[320px] lg:right-[320px] xl:left-[350px] xl:right-[350px]">
             <svg width="100%" height="100%" viewBox="0 0 100 500" preserveAspectRatio="none" className="overflow-visible">
               <defs>
                 <linearGradient id="lineGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#2EE1C7" stopOpacity="0.8" />
                   <stop offset="100%" stopColor="#2EE1C7" stopOpacity="0.2" />
                 </linearGradient>
                 <linearGradient id="lineGradRight" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#2EE1C7" stopOpacity="0.2" />
                   <stop offset="100%" stopColor="#2EE1C7" stopOpacity="0.8" />
                 </linearGradient>
                 <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                   <feGaussianBlur stdDeviation="2" result="blur" />
                   <feComposite in="SourceGraphic" in2="blur" operator="over" />
                 </filter>
               </defs>
               
               {/* 
                 Y coordinates of left boxes centers:
                 Box 1: Top 60 + Half 44 = 104
                 Box 2: 104 + 88 + 16 (gap) = 208
                 Box 3: 208 + 104 = 312
                 Box 4: 312 + 104 = 416
                 
                 Hexagon center Y: 260
                 Hexagon center X: 50
               */}
               
               {/* Left lines */}
               <path d="M 0 104 C 30 104, 20 260, 50 260" fill="none" stroke="url(#lineGradLeft)" strokeWidth="1.5" strokeDasharray="4 4" filter="url(#glow)" className="animate-[dash_30s_linear_infinite]" />
               <path d="M 0 208 C 30 208, 20 260, 50 260" fill="none" stroke="url(#lineGradLeft)" strokeWidth="1.5" strokeDasharray="4 4" filter="url(#glow)" />
               <path d="M 0 312 C 30 312, 20 260, 50 260" fill="none" stroke="url(#lineGradLeft)" strokeWidth="1.5" strokeDasharray="4 4" filter="url(#glow)" />
               <path d="M 0 416 C 30 416, 20 260, 50 260" fill="none" stroke="url(#lineGradLeft)" strokeWidth="1.5" strokeDasharray="4 4" filter="url(#glow)" />

               {/* Right lines */}
               <path d="M 50 260 C 80 260, 70 104, 100 104" fill="none" stroke="url(#lineGradRight)" strokeWidth="1.5" strokeDasharray="4 4" filter="url(#glow)" />
               <path d="M 50 260 C 80 260, 70 208, 100 208" fill="none" stroke="url(#lineGradRight)" strokeWidth="1.5" strokeDasharray="4 4" filter="url(#glow)" />
               <path d="M 50 260 C 80 260, 70 312, 100 312" fill="none" stroke="url(#lineGradRight)" strokeWidth="1.5" strokeDasharray="4 4" filter="url(#glow)" />
               <path d="M 50 260 C 80 260, 70 416, 100 416" fill="none" stroke="url(#lineGradRight)" strokeWidth="1.5" strokeDasharray="4 4" filter="url(#glow)" />
             </svg>
        </div>

        {/* LEFT COLUMN: Training Pipeline */}
        <div className="relative w-full h-auto lg:h-[500px]">
          <div className="lg:absolute top-0 left-0 w-full text-center lg:text-left mb-6 lg:mb-0">
            <h2 className="text-[#2EE1C7] font-bold tracking-wider text-[11px] lg:text-xs xl:text-sm">LLM TRAINING PIPELINE</h2>
            <p className="text-gray-400 text-[10px] lg:text-xs mt-1">Train your AI with your data</p>
          </div>
          
          <div className="lg:absolute top-[60px] left-0 w-full flex flex-col gap-4">
            <FlowBox side="left" step={1} icon={FileText} title="RAW DATA" desc="Documents, PDFs, Databases, APIs, CRMs & more" />
            <FlowBox side="left" step={2} icon={Filter} title="DATA PROCESSING" desc="Clean, extract, chunk and structure data for training" />
            <FlowBox side="left" step={3} icon={Network} title="LLM TRAINING" desc="Train foundation models on your custom data" />
            <FlowBox side="left" step={4} icon={BrainCircuit} title="CUSTOM AI MODEL" desc="Fine-tune and optimize for domain specific intelligence" />
          </div>
        </div>

        {/* CENTER: AI Engine */}
        <div className="relative w-full h-auto lg:h-[500px] flex flex-col items-center justify-center lg:justify-start">
          {/* Glowing Hexagon - Vertically centered between the boxes -> Y=260 center -> top=260-120 = 140 */}
          <div className="lg:absolute lg:top-[140px] relative w-[240px] h-[240px] flex items-center justify-center rounded-full my-8 lg:my-0 z-20">
             {/* Glow */}
             <div className="absolute inset-0 rounded-full bg-[#2EE1C7]/20 blur-2xl mix-blend-screen"></div>
             
             {/* Hexagon shape */}
             <div className="relative w-[210px] h-[210px] bg-[#0a1a17] border-2 border-[#2EE1C7] flex flex-col items-center justify-center text-center p-4 shadow-[inset_0_0_20px_rgba(46,225,199,0.3),0_0_30px_rgba(46,225,199,0.4)] backdrop-blur-xl z-20" 
                  style={{ clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)' }}>
                <Brain className="w-12 h-12 text-[#2EE1C7] mb-2 drop-shadow-[0_0_10px_rgba(46,225,199,0.8)]" />
                <h2 className="text-lg font-bold text-white leading-tight drop-shadow-md">FROSTREK<br/>AI ENGINE</h2>
                <p className="text-[9px] text-[#2EE1C7] mt-1 tracking-widest uppercase font-semibold">Intelligence Core</p>
             </div>
             
             {/* Connection dots on hexagon */}
             <div className="hidden lg:block absolute left-1 w-2 h-2 rounded-full bg-[#2EE1C7] shadow-[0_0_10px_#2EE1C7] z-30" />
             <div className="hidden lg:block absolute right-1 w-2 h-2 rounded-full bg-[#2EE1C7] shadow-[0_0_10px_#2EE1C7] z-30" />
          </div>

          {/* Built for Scale & Trust Badges */}
          <div className="lg:absolute lg:bottom-[-20px] mt-4 text-center w-full max-w-[280px] relative z-20 bg-[#050d0a]/80 p-3 rounded-xl border border-[#2EE1C7]/30 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.8)] mx-auto">
            <h3 className="text-[9px] text-[#2EE1C7] tracking-widest mb-2 font-semibold uppercase">Built for Scale & Trust</h3>
            <div className="grid grid-cols-4 gap-1">
              <div className="flex flex-col items-center text-center">
                <Lock className="w-3.5 h-3.5 text-[#2EE1C7] mb-1 opacity-90" />
                <span className="text-[8px] text-white font-semibold">SECURE</span>
                <span className="text-[6px] text-gray-400 uppercase mt-0.5 leading-tight">End-to-End</span>
              </div>
              <div className="flex flex-col items-center text-center border-l border-white/10">
                <Boxes className="w-3.5 h-3.5 text-[#2EE1C7] mb-1 opacity-90" />
                <span className="text-[8px] text-white font-semibold">SCALABLE</span>
                <span className="text-[6px] text-gray-400 uppercase mt-0.5 leading-tight">Cloud Native</span>
              </div>
              <div className="flex flex-col items-center text-center border-l border-white/10">
                <Activity className="w-3.5 h-3.5 text-[#2EE1C7] mb-1 opacity-90" />
                <span className="text-[8px] text-white font-semibold">OBSERVE</span>
                <span className="text-[6px] text-gray-400 uppercase mt-0.5 leading-tight">Logs & Metrics</span>
              </div>
              <div className="flex flex-col items-center text-center border-l border-white/10">
                <LinkIcon className="w-3.5 h-3.5 text-[#2EE1C7] mb-1 opacity-90" />
                <span className="text-[8px] text-white font-semibold">INTEGRATE</span>
                <span className="text-[6px] text-gray-400 uppercase mt-0.5 leading-tight">APIs & Hooks</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Automation Workflow */}
        <div className="relative w-full h-auto lg:h-[500px]">
          <div className="lg:absolute top-0 right-0 w-full text-center lg:text-right mb-6 lg:mb-0">
            <h2 className="text-[#2EE1C7] font-bold tracking-wider text-[11px] lg:text-xs xl:text-sm">AUTOMATION WORKFLOW</h2>
            <p className="text-gray-400 text-[10px] lg:text-xs mt-1">Automate decisions in real-time</p>
          </div>
          
          <div className="lg:absolute top-[60px] left-0 w-full flex flex-col gap-4">
            <FlowBox side="right" step={1} icon={Zap} title="TRIGGER" desc="Email, Form, Webhook, Schedule, Event, or API Call" />
            <FlowBox side="right" step={2} icon={Brain} title="AI DECISION MAKING" desc="Understand, analyze and make intelligent decisions" />
            <FlowBox side="right" step={3} icon={Settings} title="AUTOMATION ENGINE" desc="Execute workflows, call tools, update systems, and more" />
            <FlowBox side="right" step={4} icon={TrendingUp} title="RESULTS / ACTIONS" desc="Dashboards, Reports, Notifications, Data updates & more" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroFlowchart;

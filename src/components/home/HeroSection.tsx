import { FluidBackground } from '../ui/FluidBackground';
import { InteractiveMobileMockup } from '../ui/InteractiveMobileMockup';




const HeroSection = () => {

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-start lg:justify-center bg-brand-light-bg text-[#1f3e30] pt-28 md:pt-32 lg:pt-20 pb-12 lg:pb-6 font-sans overflow-hidden">
      <FluidBackground />
      {/* Background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[70vw] h-[50vw] rounded-[100%] bg-gradient-to-r from-purple-50/40 via-red-50/40 to-blue-50/40 blur-[80px] opacity-70" />
      </div>


      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center flex-1 justify-center pointer-events-none">
        {/* Badge
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-brand-badge-bg text-brand-badge-text text-sm font-bold tracking-wide mb-8 border border-[#c4e0d4]/50"
        >
          <span className="text-lg leading-none"></span> ENTERPRISE AI · GURUGRAM, INDIA
        </motion.div> */}

        {/* Main Hero Content - Split Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12 lg:gap-8">
          {/* Left Side: Heading */}
          <div className="flex flex-col items-start text-left lg:w-[55%] shrink-0 hero-fade-in pointer-events-none">
            <h1 className="text-6xl sm:text-7xl md:text-[80px] lg:text-[75px] xl:text-[100px] leading-[0.95] drop-shadow-[0_4px_10px_rgba(255,255,255,1)] [text-shadow:_0_0_20px_#ffffff,_0_0_40px_#ffffff] uppercase tracking-tight text-black" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 500 }}>
              <span className="block relative z-10 mb-2">TIME IS MONEY.</span>
              <span className="block relative z-10" style={{ animationDelay: '0.1s' }}>SAVE BOTH.</span>
            </h1>

            <p className="mt-6 md:mt-8 text-gray-800 text-lg md:text-[22px] max-w-lg leading-relaxed relative z-10 font-medium [text-shadow:_0_0_10px_#ffffff,_0_0_20px_#ffffff]" style={{ animationDelay: '0.2s', fontFamily: "'Quicksand', sans-serif" }}>
              Your AI workforce never sleeps—handling repetitive tasks, accelerating operations, and reducing dependency on manual processes.
            </p>
          </div>

          {/* Right Side: Mobile Mockup */}
          <div className="lg:w-[45%] flex items-center justify-center lg:justify-end hero-fade-in shrink-0 z-20 relative" style={{ animationDelay: '0.2s' }}>
            <div className="lg:-translate-x-20 lg:translate-y-4">
              <InteractiveMobileMockup />
            </div>
          </div>
        </div>



      </div>




      {/* Frostrek Green Circle at very corner (1/4 visible) */}
      <div className="absolute -bottom-[450px] -right-[400px] w-[800px] h-[800px] lg:-bottom-[700px] lg:-right-[600px] lg:w-[1200px] lg:h-[1200px] rounded-full bg-[#347858] z-0" />

      <div className="absolute bottom-0 w-full h-[12vh] bg-gradient-to-t from-orange-600/90 via-red-500/50 to-transparent blur-3xl pointer-events-none -z-10" />
    </section>
  );
};

export default HeroSection;

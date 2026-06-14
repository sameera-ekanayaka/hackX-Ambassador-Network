"use client";

import { motion } from "framer-motion";

const memories = [
  "https://picsum.photos/seed/hackathon1/800/600",
  "https://picsum.photos/seed/coding2/800/600",
  "https://picsum.photos/seed/tech3/800/600",
  "https://picsum.photos/seed/team4/800/600",
  "https://picsum.photos/seed/presentation5/800/600",
];

export default function MemoriesSection() {
  return (
    <section id="memories" className="relative w-full bg-[#010814] py-32 overflow-hidden z-10">
      {/* Seamless top blend */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom, #010814, transparent)" }} />
      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#5BB8FF] mb-4 block">
            A Decade of Making Ideas Happen
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            Eleven Years. Hundreds of Teams. <br className="hidden md:block"/> One Stage That Changed Everything.
          </h2>
          <p className="text-lg text-white/60 font-light max-w-3xl mx-auto">
            From the very first edition to a Grand Finals night with the Minister of Science and Technology as Chief Guest, hackX has grown into the innovation platform that defines what Sri Lankan university students can build.
          </p>
        </motion.div>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden flex items-center bg-[#010814]">
        {/* Shadow overlays for smooth fade on edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#010814] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#010814] to-transparent z-20 pointer-events-none" />
        
        <motion.div 
          className="flex space-x-6 px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          style={{ width: "fit-content" }}
        >
          {/* Duplicate the array twice for seamless infinite scroll */}
          {[...memories, ...memories].map((src, idx) => {
            const editionNumber = (idx % memories.length) + 1;
            return (
              <div 
                key={idx} 
                className="relative w-[300px] h-[300px] md:w-[450px] md:h-[400px] rounded-3xl overflow-hidden shrink-0 border border-white/5 shadow-xl group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#010814] via-transparent to-transparent opacity-80 z-10 group-hover:opacity-40 transition-opacity duration-300" />
                
                {/* Using img for raw images instead of Next/Image to avoid config issues with external domains during prototyping */}
                <img 
                  src={src} 
                  alt={`hackX ${editionNumber}.0 Memory`} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />

                {/* Hover overlay details */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/70 backdrop-blur-[2px] translate-y-3 group-hover:translate-y-0">
                  <span className="text-xs font-bold tracking-widest text-[#5BB8FF] uppercase mb-1">Edition</span>
                  <h3 className="text-2xl font-black text-white mb-2">hackX {editionNumber}.0</h3>
                  <p className="text-white/70 text-xs md:text-sm font-light leading-relaxed">
                    A description of the breakthrough solutions and memories built during this landmark challenge.
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16 text-center relative z-10">
        <p className="text-xl text-white font-medium mb-8">
          Every name on that list started with one idea. What is yours?
        </p>
        <button className="btn-primary">
          Register Now
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>

    </section>
  );
}

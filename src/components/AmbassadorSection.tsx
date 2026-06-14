"use client";

export default function AmbassadorSection() {
  return (
    <section id="ambassadors" className="relative w-full bg-[#010814] py-32 overflow-hidden z-10">
      {/* Seamless top blend */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none" 
        style={{ background: "linear-gradient(to bottom, #010814, transparent)" }} 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left: Content & Integrated Description */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#5BB8FF] mb-4 block">
              Be The Movement
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
              Carry hackX <br /> to Your Campus.
            </h2>
            <div className="space-y-6 text-[1.05rem] text-white/60 font-light leading-relaxed mb-10 max-w-xl">
              <p>
                The hackX 11.0 Ambassador Program puts you at the centre of Sri Lanka&apos;s premier student innovation movement. As a Campus Ambassador, you act as the vital bridge between hackX and your university, earning points for every referred team as they advance from proposal submission all the way to the Grand Finals stage.
              </p>
              <p>
                This is a fully gamified island-wide competition. Top performing ambassadors on our leaderboard secure VIP invitations to the Grand Finals, exclusive custom merchandise, and prominent on-stage recognition in front of industry leaders and tech pioneers.
              </p>
              <p>
                More than just volunteering, this program serves as an official leadership credential. Every ambassador who successfully completes the program receives a certified digital leadership credential to elevate their CV.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[#1A6FD4] to-[#5BB8FF] text-white font-bold tracking-wide hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(91,184,255,0.3)] hover:shadow-[0_0_30px_rgba(91,184,255,0.5)]">
                Apply as an Ambassador
              </button>
              <span className="text-xs text-white/40 tracking-wide">Opens June 23</span>
            </div>
          </div>

          {/* Right: Ambassador Image with Hover Glow */}
          <div className="lg:col-span-6 flex items-center justify-center min-h-[400px] relative group">
            {/* Background glowing aura */}
            <div className="absolute w-[80%] h-[80%] bg-[#5BB8FF]/5 group-hover:bg-[#5BB8FF]/15 rounded-full blur-[80px] transition-colors duration-700 pointer-events-none" />
            
            <div className="relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl w-full max-w-[480px] aspect-[4/3] z-10 transition-all duration-500 group-hover:scale-[1.01] group-hover:border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/Ambassador image.png"
                alt="hackX Ambassador" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#010814]/30 to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

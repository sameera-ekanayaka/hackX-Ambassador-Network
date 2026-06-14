"use client";

import { motion } from "framer-motion";

const faqs = [
  { q: "Who can register for hackX 11.0?", a: "Any currently enrolled undergraduate from a Sri Lankan university or higher education institute. All team members must be from the same institution." },
  { q: "How many people can be in a team?", a: "Minimum two, maximum five members." },
  { q: "Is there a registration fee?", a: "No. hackX 11.0 is completely free to enter." },
  { q: "Do I need a finished product to register?", a: "No. You just need an idea at registration. A working prototype is required by the ideaX semi-finals stage." },
  { q: "What do I need to submit after registering?", a: "A structured startup proposal by July 31, along with a one to two minute product introduction video." },
  { q: "Can students from non-tech faculties participate?", a: "Absolutely. hackX welcomes innovation from any discipline. Healthcare, agriculture, finance, education, any field is fair game as long as there is a technology-driven solution behind it." },
  { q: "What can winners expect at the Grand Finals?", a: "Winners receive cash prizes, exclusive recognition on a national stage, and direct exposure to real investor opportunities through our partner network." },
  { q: "What is designX?", a: "An exclusive four-part workshop series for semi-finalists, covering business modelling, startup structuring, and market validation, delivered by industry professionals." },
  { q: "When do registrations close?", a: "Proposals must be submitted by July 31. Register early to give your team time to prepare a strong submission." }
];

const desktopLayout = [
  // Left 5
  { side: "left", ax: 350, ay: 120 },
  { side: "left", ax: 320, ay: 280 },
  { side: "left", ax: 290, ay: 440 },
  { side: "left", ax: 320, ay: 600 },
  { side: "left", ax: 350, ay: 760 },
  
  // Right 4
  { side: "right", ax: 850, ay: 180 },
  { side: "right", ax: 880, ay: 360 },
  { side: "right", ax: 900, ay: 540 },
  { side: "right", ax: 870, ay: 720 },
];

function FAQItem({ faq, className = "", style, align = "center" }: { faq: typeof faqs[0], className?: string, style?: React.CSSProperties, align?: "left" | "right" | "center" }) {
  const textAlignment = align === "left" ? "text-right pr-4" : align === "right" ? "text-left pl-4" : "text-center";
  const flexAlignment = align === "left" ? "items-end" : align === "right" ? "items-start" : "items-center";

  return (
    <div 
      className={`relative group cursor-pointer w-[280px] h-[120px] flex ${flexAlignment} justify-center flex-col mx-auto lg:mx-0 ${className}`}
      style={style}
    >
      {/* Question */}
      <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-0 group-hover:-translate-y-2 pointer-events-none z-10 will-change-transform ${flexAlignment}`}>
        <h3 className={`text-sm md:text-base font-bold text-white/80 tracking-wide leading-snug px-2 ${textAlignment}`}>
          {faq.q}
        </h3>
      </div>

      {/* Answer */}
      <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none will-change-transform ${flexAlignment}`}>
        <p className={`text-white/70 text-xs leading-relaxed font-light ${textAlignment}`}>
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const cx = 600;
  const cy = 400;

  return (
    <section className="relative w-full bg-[#010814] py-24 md:py-32 overflow-hidden z-10">
      
      {/* Background Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5BB8FF]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#5BB8FF] mb-4 block">
            Everything You Need To Know
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* ─── Desktop SVG & Orbital Layout ─── */}
        <div className="hidden lg:block relative w-[1200px] h-[900px] mx-auto">
          
          {/* Central Diver */}
          <div className="absolute left-[400px] top-[150px] w-[400px] z-30 pointer-events-none">
             <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full"
            >
              <img 
                src="/FAQ Image.webp" 
                alt="Diver" 
                className="w-full h-auto drop-shadow-[0_0_40px_rgba(91,184,255,0.15)] relative z-20"
              />
            </motion.div>
          </div>

          {/* SVG Connecting Lines and Locked Text Elements */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1200 900">
            {desktopLayout.map((layout, i) => {
              const { ax, ay } = layout;
              
              // Control points to make them bend towards center
              let cp1x, cp1y, cp2x, cp2y;
              if (ax < cx) {
                // Left side bending
                cp1x = ax + 100; cp1y = ay;
                cp2x = cx - 50;  cp2y = ay + (cy - ay) * 0.5;
              } else {
                // Right side bending
                cp1x = ax - 100; cp1y = ay;
                cp2x = cx + 50;  cp2y = ay + (cy - ay) * 0.5;
              }
              const pathData = `M ${ax} ${ay} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${cx} ${cy}`;
              
              return (
                <g key={`group-${i}`}>
                  {/* Faint background path */}
                  <path 
                    d={pathData} 
                    fill="none" 
                    stroke="rgba(255,255,255,0.05)" 
                    strokeWidth="1" 
                  />
                  
                  {/* Animated line fill filling towards diver */}
                  <path 
                    d={pathData} 
                    fill="none" 
                    stroke="#5BB8FF" 
                    strokeWidth="1.5"
                    pathLength="1"
                    strokeDasharray="0.15 1"
                    strokeDashoffset="1"
                    style={{ filter: "drop-shadow(0 0 4px #5BB8FF)" }}
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="1"
                      to="0"
                      dur={`${2.5 + (i % 3) * 0.5}s`}
                      repeatCount="indefinite"
                      calcMode="linear"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      keyTimes="0;0.1;0.8;1"
                      dur={`${2.5 + (i % 3) * 0.5}s`}
                      repeatCount="indefinite"
                    />
                  </path>
                </g>
              );
            })}

            {/* Embedded Text Items locked to SVG Coordinates */}
            {desktopLayout.map((layout, i) => {
              const isLeft = layout.side === "left";
              const width = 280;
              const height = 120;
              const xPos = isLeft ? layout.ax - width : layout.ax;
              const yPos = layout.ay - height / 2;
              
              return (
                <foreignObject 
                  key={`text-${i}`} 
                  x={xPos} 
                  y={yPos} 
                  width={width} 
                  height={height} 
                  className="pointer-events-auto overflow-visible"
                >
                  <FAQItem 
                    faq={faqs[i]} 
                    align={layout.side as "left" | "right"}
                    className="w-full h-full m-0"
                  />
                </foreignObject>
              );
            })}
          </svg>

        </div>

        {/* ─── Mobile Stacked Layout ─── */}
        <div className="lg:hidden flex flex-col items-center gap-12 relative z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-full max-w-[300px] mb-8 pointer-events-none"
          >
            <img 
              src="/FAQ Image.webp" 
              alt="Diver" 
              className="w-full h-auto drop-shadow-[0_0_20px_rgba(91,184,255,0.1)]"
            />
          </motion.div>

          <div className="flex flex-col gap-2 w-full px-4">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} faq={faq} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

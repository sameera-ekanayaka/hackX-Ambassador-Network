"use client";

import { motion } from "framer-motion";
import { Users, Lightbulb, CheckCircle2 } from "lucide-react";

const criteria = [
  {
    title: "Your Team",
    desc: "Two to five members. All currently enrolled undergraduates from the same university or higher education institute.",
    icon: Users,
    color: "#5BB8FF",
  },
  {
    title: "Your Idea",
    desc: "Any real-world problem with a scalable, technology-driven solution. Innovation from any field is welcome: healthcare, agriculture, finance, education, and beyond.",
    icon: Lightbulb,
    color: "#1A6FD4",
  },
  {
    title: "Your Entry",
    desc: "Completely free. No registration fee, no prerequisites. Sign up, submit your proposal by July 31, and let your idea do the talking.",
    icon: CheckCircle2,
    color: "#F5A524",
  },
];

const CardDecorator = ({ children, accentColor }: { children: React.ReactNode; accentColor: string }) => (
  <div aria-hidden className="relative mx-auto size-36 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
    {/* Grid lines */}
    <div 
      className="absolute inset-0 opacity-20 transition-opacity duration-300 group-hover:opacity-35"
      style={{
        backgroundImage: `linear-gradient(to right, ${accentColor}25 1px, transparent 1px), linear-gradient(to bottom, ${accentColor}25 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    />
    {/* Floating icon container with border and hover glow */}
    <div 
      className="absolute inset-0 m-auto flex size-14 items-center justify-center border-t border-l border-white/10 bg-[#010814] rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:border-t-white/30 group-hover:border-l-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
      style={{
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0px transparent`,
      }}
    >
      {/* Dynamic hover aura */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accentColor}40 0%, transparent 80%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  </div>
);

export default function CriteriaSection() {
  return (
    <section id="criteria" className="relative w-full bg-[#010814] py-32 overflow-hidden z-10">
      
      {/* Background Ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#5BB8FF]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#5BB8FF] mb-4 block">
            Who Can Compete
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Built for Builders. <br className="hidden md:block"/> Open to All Universities.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {criteria.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative p-[1px] rounded-3xl bg-white/[0.04] overflow-hidden group transition-all duration-300"
              >
                {/* Rotating Conic Shine Border (appears on hover) */}
                <div 
                  className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-3xl pointer-events-none z-10"
                >
                  <div 
                    className="absolute w-[200%] h-[200%] aspect-square left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_4.5s_linear_infinite] pointer-events-none"
                    style={{
                      background: `conic-gradient(from 0deg, transparent 0 280deg, ${item.color} 360deg)`,
                    }}
                  />
                </div>

                {/* Inner Card Body */}
                <div className="relative p-10 rounded-[23px] bg-[#010814] h-full w-full flex flex-col items-center text-center group-hover:bg-[#020d20] transition-colors duration-300 z-20">
                  {/* Visual Grid Decorator */}
                  <CardDecorator accentColor={item.color}>
                    <IconComponent 
                      className="size-6 text-white/70 group-hover:text-white transition-all duration-300"
                    />
                  </CardDecorator>

                  <h3 className="text-2xl font-bold text-white mt-6 mb-4">{item.title}</h3>
                  <p className="text-white/60 font-light leading-relaxed text-sm">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
        
      </div>

      {/* Section bottom fade for visual separation */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" 
        style={{ background: "linear-gradient(to bottom, transparent, #010814)" }} 
      />
    </section>
  );
}

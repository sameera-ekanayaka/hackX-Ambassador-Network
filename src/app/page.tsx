"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Trophy, 
  Award, 
  FileCheck, 
  Search, 
  Users, 
  ChevronRight, 
  Coins,
  ArrowRight,
  TrendingUp,
  MapPin,
  CheckCircle2,
  X,
  MessageSquare,
  Send,
  Bot,
  Sparkles,
  Mail,
  Phone
} from "lucide-react";
import NavBar from "@/components/NavBar";
import MobileNotice from "@/components/MobileNotice";
import Footer from "@/components/Footer";
import { PixelCanvas } from "@/components/ui/pixel-canvas";


// Animation presets
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as const },
});

// Reusable Stat/Bento Card with PixelCanvas
const BentoCard = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    {...fade(delay)}
    className={`relative overflow-hidden rounded-3xl bg-[#041A3A]/20 backdrop-blur-[40px] border border-white/5 shadow-sm transition-all duration-500 hover:bg-[#041A3A]/35 hover:border-white/10 group ${className}`}
  >
    <PixelCanvas
      gap={10}
      speed={20}
      colors={["#1A6FD4", "#5BB8FF", "#0A3878"]}
    />
    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.03] group-hover:to-transparent transition-colors duration-500 pointer-events-none" />
    <div className="relative z-10 w-full h-full p-8 md:p-10">{children}</div>
  </motion.div>
);

// Mock Leaderboard Data
const mockAmbassadors = [
  { rank: 1, name: "Sameera Ekanayaka", university: "University of Kelaniya", points: 1240, badge: "Elite" },
  { rank: 2, name: "Malith Fernando", university: "University of Moratuwa", points: 980, badge: "Gold" },
  { rank: 3, name: "Sithumini Silva", university: "University of Colombo", points: 850, badge: "Gold" },
  { rank: 4, name: "Kasun Jayawardena", university: "University of Sri Jayewardenepura", points: 720, badge: "Silver" },
  { rank: 5, name: "Aanya Perera", university: "University of Kelaniya", points: 690, badge: "Silver" },
  { rank: 6, name: "Devinda Perera", university: "SLIIT", points: 540, badge: "Bronze" },
  { rank: 7, name: "Sanduni Cooray", university: "Sabaragamuwa University", points: 480, badge: "Bronze" },
  { rank: 8, name: "Nimasha Wickramasinghe", university: "University of Ruhuna", points: 420, badge: "Bronze" },
  { rank: 9, name: "Ravindu Premarathna", university: "University of Peradeniya", points: 390, badge: "Bronze" },
  { rank: 10, name: "Ishani Bandara", university: "University of Moratuwa", points: 345, badge: "Bronze" },
  { rank: 11, name: "Dineth Karunarathne", university: "NSBM Green University", points: 310, badge: "Bronze" },
  { rank: 12, name: "Piyumi Samarakoon", university: "University of Kelaniya", points: 280, badge: "Bronze" },
  { rank: 13, name: "Chamath Alwis", university: "University of Sri Jayewardenepura", points: 240, badge: "Bronze" },
  { rank: 14, name: "Hasini Gamage", university: "Sabaragamuwa University", points: 195, badge: "Bronze" },
  { rank: 15, name: "Lakshan Madushanka", university: "University of Colombo", points: 160, badge: "Bronze" },
];

// Chatbot Q&A Data
const chatbotQA = [
  {
    keywords: ["eligible", "eligibility", "who can", "join", "apply", "student", "undergraduate"],
    answer: "Any undergraduate currently enrolled in a Sri Lankan university or higher education institute can apply. All faculties, majors, and academic years are welcome!"
  },
  {
    keywords: ["point", "score", "points", "referral", "milestone", "earn", "structure"],
    answer: "You earn points by referring teams using your Ambassador ID: +100 when a team submits a proposal, +150 when they reach Semi-Finals, +100 for attending designX workshops, +250 for reaching Grand Finals, and +500 for a podium finish."
  },
  {
    keywords: ["reward", "rewards", "prize", "win", "perk", "perks", "merchandise", "hoodie", "gift"],
    answer: "Top ambassadors receive cash prizes, exclusive hackX branded merchandise (hoodies, stickers, tees), free entry to workshops, VIP Grand Finals passes, and on-stage recognition!"
  },
  {
    keywords: ["certificate", "certified", "credentials", "official", "certify"],
    answer: "Yes, you will receive an official digital certificate of leadership endorsed by the Department of Industrial Management (University of Kelaniya), Ministry of Science & Technology, and the National Science Foundation."
  },
  {
    keywords: ["duration", "long", "when", "time", "period", "end", "run"],
    answer: "The program runs concurrently with hackX 11.0. It starts in June with registrations and onboarding, and wraps up with the Grand Finals. Your participation fits easily around your studies."
  },
  {
    keywords: ["role", "do", "task", "responsibility", "responsibilities", "duty", "duties"],
    answer: "Your role is to represent hackX at your campus, share promotional material, organize orientation activities, and guide participant teams. You are the bridge between hackX and your university!"
  }
];

const fallbackResponse = "I'm not sure about that specific detail. Try asking about eligibility, referral points, rewards, certificates, or the ambassador role. You can also click any of the quick question chips on the left!";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUniv, setSelectedUniv] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Chatbot states
  const [messages, setMessages] = useState<Array<{ sender: "bot" | "user"; text: string }>>([
    { sender: "bot", text: "Hello! I am the hackX Mascot. Ask me anything about the Campus Ambassador Program!" }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isModalOpen]);

  // Auto scroll chat to bottom
  useEffect(() => {
    const el = document.getElementById("chat-messages");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isTyping]);

  const processResponse = (userText: string) => {
    setIsTyping(true);
    
    // Simulate typing delay
    setTimeout(() => {
      const cleanText = userText.toLowerCase();
      const match = chatbotQA.find((item) => 
        item.keywords.some((keyword) => cleanText.includes(keyword))
      );

      const responseText = match ? match.answer : fallbackResponse;

      setMessages((prev) => [...prev, { sender: "bot", text: responseText }]);
      setIsTyping(false);
    }, 900);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isTyping) return;

    const userMessage = inputVal.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInputVal("");
    
    processResponse(userMessage);
  };

  const handleQuickQuestion = (question: string) => {
    if (isTyping) return;
    setMessages((prev) => [...prev, { sender: "user", text: question }]);
    processResponse(question);
  };

  const universities = ["All", "University of Kelaniya", "University of Moratuwa", "University of Colombo", "University of Sri Jayewardenepura", "SLIIT", "Sabaragamuwa University"];

  const filteredAmbassadors = mockAmbassadors.filter((ambassador) => {
    const matchesSearch = ambassador.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUniv = selectedUniv === "All" || ambassador.university === selectedUniv;
    return matchesSearch && matchesUniv;
  });

  return (
    <>
      <NavBar />
      <MobileNotice />
      
      <main style={{ background: "#010814", width: "100%", overflowX: "clip" }}>
        
        {/* ── HERO SECTION ── */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
          {/* Animated Background Blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ x: [0, 30, -30, 0], y: [0, -40, 40, 0], scale: [1, 1.05, 0.95, 1] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#1A6FD4] opacity-[0.08] blur-[140px] rounded-full"
            />
            <motion.div
              animate={{ x: [0, -40, 40, 0], y: [0, 40, -40, 0], scale: [1, 0.9, 1.1, 1] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#5BB8FF] opacity-[0.06] blur-[160px] rounded-full"
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
            
            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl lg:text-8xl font-black text-white tracking-tight leading-[1.05] mb-6 max-w-4xl"
              style={{ fontFamily: "'TT Hoves Pro Expanded', 'TT Hoves Pro', sans-serif" }}
            >
              Bring hackX <br />
              <span className="bg-gradient-to-r from-[#5BB8FF] via-white to-[#5BB8FF] bg-size-200 bg-clip-text text-transparent">
                to Your Campus
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-2xl mb-12"
            >
              Become a Campus Ambassador for hackX 11.0 and represent Sri Lanka’s premier inter-university startup challenge at your university.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 flex-wrap justify-center"
            >
              <button 
                onClick={() => {
                  const el = document.getElementById("apply-form");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary"
              >
                Apply as an Ambassador
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* ── ABOUT THE MOVEMENT ── */}
        <section id="about" className="relative py-28 border-t border-white/5 bg-gradient-to-b from-[#010814] to-[#020e21]/40">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
              
              {/* Left Column: Image with glow */}
              <motion.div 
                {...fade(0.1)}
                className="lg:col-span-6 flex items-center justify-center relative group"
              >
                <div className="absolute w-[80%] h-[80%] bg-[#5BB8FF]/5 group-hover:bg-[#5BB8FF]/10 rounded-full blur-[80px] transition-colors duration-700 pointer-events-none" />
                
                <div className="relative w-full max-w-[480px] aspect-[4/3] z-10 transition-transform duration-500 group-hover:scale-[1.02]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/Ambassador image.png"
                    alt="hackX Ambassador" 
                    className="w-full h-full object-contain rounded-3xl scale-95 group-hover:scale-100 transition-transform duration-700"
                  />
                </div>
              </motion.div>

              {/* Right Column: Narrative */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <motion.span 
                  {...fade(0)}
                  className="text-xs font-bold tracking-[0.2em] uppercase text-[#5BB8FF] mb-4 block"
                >
                  Be The Bridge
                </motion.span>
                <motion.h2 
                  {...fade(0.05)}
                  className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tight leading-[1.1]"
                >
                  Lead the Startup Wave <br />
                  on Your Campus.
                </motion.h2>
                
                <motion.div 
                  {...fade(0.15)}
                  className="text-[1.05rem] text-white/55 font-light leading-relaxed space-y-6 mb-10"
                >
                  <p>
                    As a Campus Ambassador, you become the official representative of hackX at your university. You'll connect students with opportunities, encourage innovative ideas, and help aspiring founders take their first step toward building impactful startups.
                  </p>
                  <p>
                    More than a volunteering role, the hackX Ambassador Network is a leadership experience designed to help you grow your network, strengthen your professional profile, and gain exclusive access to opportunities within Sri Lanka's innovation ecosystem.
                  </p>
                </motion.div>

                {/* Micro Bullet points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Represent hackX at your university",
                    "Promote startup culture on campus",
                    "Guide and support participant teams",
                    "Organize awareness and engagement activities",
                    "Coordinate with the hackX organizing team",
                    "Earn points and rewards through participation"
                  ].map((text, idx) => (
                    <motion.div 
                      key={idx} 
                      {...fade(idx * 0.08 + 0.2)}
                      className="flex items-center gap-3 text-sm text-white/85 font-medium"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#5BB8FF] flex-shrink-0" />
                      <span>{text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── BENTO REWARDS GRID ── */}
        <section id="rewards" className="relative py-32 bg-[#010814] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            
            {/* Header */}
            <div className="text-center flex flex-col items-center mb-20">
              <motion.span 
                {...fade(0)}
                className="text-xs font-bold tracking-[0.2em] uppercase text-[#5BB8FF] mb-4"
              >
                Rewards & Perks
              </motion.span>
              <motion.h2 
                {...fade(0.05)}
                className="text-4xl md:text-5xl font-black text-white tracking-tight"
              >
                Why Join the Movement?
              </motion.h2>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Earn Points */}
              <BentoCard delay={0.1}>
                <div className="w-12 h-12 rounded-2xl bg-[#1A6FD4]/10 border border-[#1A6FD4]/30 flex items-center justify-center text-[#5BB8FF] mb-6">
                  <Coins className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-4">Earn Referral Points</h3>
                <p className="text-white/55 font-light leading-relaxed text-sm">
                  Get rewarded for every team you bring into hackX. Earn cumulative points as your referred teams submit proposals, progress through rounds, and reach the Semi-Finals and Grand Finals.
                </p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="mt-8 flex items-center gap-2 text-xs font-bold text-[#5BB8FF] uppercase tracking-wider group-hover:translate-x-1 transition-colors cursor-pointer hover:text-[#5BB8FF]/80 bg-transparent border-none p-0 text-left outline-none"
                >
                  <span>Learn point structure</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </BentoCard>

              {/* Card 2: Live Leaderboard */}
              <BentoCard delay={0.18}>
                <div className="w-12 h-12 rounded-2xl bg-[#5BB8FF]/10 border border-[#5BB8FF]/30 flex items-center justify-center text-[#5BB8FF] mb-6">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-4">Climb the Leaderboard</h3>
                <p className="text-white/55 font-light leading-relaxed text-sm">
                  Compete with campus ambassadors across Sri Lanka and unlock exclusive rewards, including access to hackX workshops, VIP entry to the Grand Finals, branded merchandise, and on-stage recognition.
                </p>

              </BentoCard>

              {/* Card 3: Get Certified */}
              <BentoCard delay={0.26}>
                <div className="w-12 h-12 rounded-2xl bg-[#1A6FD4]/10 border border-[#1A6FD4]/30 flex items-center justify-center text-[#5BB8FF] mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-4">Official Certification</h3>
                <p className="text-white/55 font-light leading-relaxed text-sm">
                  Successfully complete the program and receive an official digital certificate endorsed by the University of Kelaniya, Ministry of Science & Technology, and the National Science Foundation, recognizing your national-level leadership experience.
                </p>
              </BentoCard>

            </div>
          </div>
        </section>

        {/* ── LIVE LEADERBOARD SECTION ── */}
        <section id="leaderboard" className="relative py-32 bg-[#010814] border-t border-white/5 overflow-hidden">
          {/* Ambient glows */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#1A6FD4]/5 blur-[160px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#5BB8FF]/4 blur-[140px] rounded-full pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 relative z-10">

            {/* Header */}
            <div className="text-center flex flex-col items-center mb-16">
              <motion.span
                {...fade(0)}
                className="text-xs font-bold tracking-[0.2em] uppercase text-[#5BB8FF] mb-4"
              >
                Live Rankings
              </motion.span>
              <motion.h2
                {...fade(0.05)}
                className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4"
              >
                Ambassador Leaderboard
              </motion.h2>
              <motion.p
                {...fade(0.1)}
                className="text-white/50 font-light text-sm md:text-base max-w-lg leading-relaxed"
              >
                Rankings update in real-time as teams progress through hackX 11.0. Top ambassadors earn exclusive rewards.
              </motion.p>
            </div>

            {/* Top 3 Podium */}
            <motion.div {...fade(0.12)} className="flex items-end justify-center gap-4 mb-12">
              {/* 2nd Place */}
              <div className="flex flex-col items-center gap-3 flex-1 max-w-[180px]">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#94a3b8]/20 to-[#64748b]/10 border border-[#94a3b8]/30 flex items-center justify-center shadow-[0_0_20px_rgba(148,163,184,0.15)]">
                    <span className="text-2xl font-black text-[#94a3b8]">2</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gradient-to-br from-[#94a3b8] to-[#64748b] flex items-center justify-center">
                    <Trophy className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-white/90 text-xs font-bold leading-tight">{mockAmbassadors[1].name.split(" ")[0]}</p>
                  <p className="text-[#94a3b8] text-[10px] font-black mt-0.5">{mockAmbassadors[1].points} pts</p>
                </div>
                <div className="w-full h-16 rounded-t-xl bg-gradient-to-t from-[#94a3b8]/10 to-[#94a3b8]/5 border border-[#94a3b8]/15 border-b-0" />
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center gap-3 flex-1 max-w-[200px]">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FFD700]/25 to-[#FFA500]/10 border border-[#FFD700]/40 flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.2)] animate-[glow-pulse_3s_infinite]">
                    <span className="text-3xl font-black text-[#FFD700]">1</span>
                  </div>
                  <div className="absolute -top-3 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-[0_0_10px_rgba(255,215,0,0.4)]">
                    <Trophy className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-sm leading-tight">{mockAmbassadors[0].name.split(" ")[0]}</p>
                  <p className="text-[#FFD700] text-xs font-black mt-0.5">{mockAmbassadors[0].points} pts</p>
                </div>
                <div className="w-full h-24 rounded-t-xl bg-gradient-to-t from-[#FFD700]/10 to-[#FFD700]/5 border border-[#FFD700]/20 border-b-0" />
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center gap-3 flex-1 max-w-[180px]">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#cd7f32]/20 to-[#a0522d]/10 border border-[#cd7f32]/30 flex items-center justify-center shadow-[0_0_20px_rgba(205,127,50,0.15)]">
                    <span className="text-2xl font-black text-[#cd7f32]">3</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gradient-to-br from-[#cd7f32] to-[#a0522d] flex items-center justify-center">
                    <Trophy className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-white/90 text-xs font-bold leading-tight">{mockAmbassadors[2].name.split(" ")[0]}</p>
                  <p className="text-[#cd7f32] text-[10px] font-black mt-0.5">{mockAmbassadors[2].points} pts</p>
                </div>
                <div className="w-full h-10 rounded-t-xl bg-gradient-to-t from-[#cd7f32]/10 to-[#cd7f32]/5 border border-[#cd7f32]/15 border-b-0" />
              </div>
            </motion.div>

            {/* Full Table */}
            <motion.div
              {...fade(0.18)}
              className="rounded-3xl overflow-hidden border border-white/6 bg-[#041A3A]/15 backdrop-blur-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
            >
              {/* Table Header */}
              <div className="grid grid-cols-[56px_1fr_1fr_72px] items-center px-6 py-4 border-b border-white/8 bg-white/[0.02]">
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35">#</span>
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35">Ambassador</span>
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35">University</span>
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35 text-right">Points</span>
              </div>

              {/* Table Rows */}
              {mockAmbassadors.map((ambassador, idx) => {
                const isTop3 = idx < 3;
                const isTop5 = idx < 5;
                const rankColors: Record<number, { border: string; bg: string; rankText: string; glow: string }> = {
                  0: { border: "border-[#FFD700]/25", bg: "bg-[#FFD700]/[0.04]", rankText: "text-[#FFD700]", glow: "shadow-[inset_0_0_30px_rgba(255,215,0,0.04)]" },
                  1: { border: "border-[#94a3b8]/15", bg: "bg-[#94a3b8]/[0.03]", rankText: "text-[#94a3b8]", glow: "shadow-[inset_0_0_30px_rgba(148,163,184,0.03)]" },
                  2: { border: "border-[#cd7f32]/15", bg: "bg-[#cd7f32]/[0.03]", rankText: "text-[#cd7f32]", glow: "shadow-[inset_0_0_30px_rgba(205,127,50,0.03)]" },
                  3: { border: "border-[#5BB8FF]/10", bg: "bg-[#5BB8FF]/[0.025]", rankText: "text-[#5BB8FF]", glow: "" },
                  4: { border: "border-[#5BB8FF]/8", bg: "bg-[#5BB8FF]/[0.015]", rankText: "text-[#5BB8FF]/80", glow: "" },
                };
                const style = rankColors[idx] ?? { border: "border-transparent", bg: "", rankText: "text-white/30", glow: "" };

                return (
                  <motion.div
                    key={ambassador.rank}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    className={`grid grid-cols-[56px_1fr_1fr_72px] items-center px-6 py-4 border-b border-white/[0.04] last:border-0 transition-all duration-300 hover:bg-white/[0.025] group ${
                      isTop5 ? `${style.bg} border-l-2 ${style.border} ${style.glow}` : "border-l-2 border-transparent"
                    }`}
                  >
                    {/* Rank */}
                    <div className="flex items-center">
                      {isTop3 ? (
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm ${
                          idx === 0 ? "bg-[#FFD700]/15 text-[#FFD700] shadow-[0_0_12px_rgba(255,215,0,0.2)]" :
                          idx === 1 ? "bg-[#94a3b8]/15 text-[#94a3b8]" :
                          "bg-[#cd7f32]/15 text-[#cd7f32]"
                        }`}>
                          {ambassador.rank}
                        </div>
                      ) : (
                        <span className={`text-sm font-bold ${style.rankText} w-8 text-center`}>
                          {ambassador.rank}
                        </span>
                      )}
                    </div>

                    {/* Name */}
                    <div className="flex items-center">
                      <span className={`text-sm font-bold leading-tight transition-colors duration-300 ${
                        isTop3 ? "text-white" : isTop5 ? "text-white/90" : "text-white/70 group-hover:text-white/90"
                      }`}>
                        {ambassador.name}
                      </span>
                    </div>

                    {/* University */}
                    <div>
                      <span className={`text-xs leading-tight ${
                        isTop5 ? "text-white/55" : "text-white/35 group-hover:text-white/50"
                      } transition-colors duration-300`}>
                        {ambassador.university}
                      </span>
                    </div>

                    {/* Points */}
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-black border transition-all duration-300 ${
                        idx === 0 ? "bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/25 shadow-[0_0_10px_rgba(255,215,0,0.15)]" :
                        idx === 1 ? "bg-[#94a3b8]/10 text-[#94a3b8] border-[#94a3b8]/20" :
                        idx === 2 ? "bg-[#cd7f32]/10 text-[#cd7f32] border-[#cd7f32]/20" :
                        isTop5 ? "bg-[#5BB8FF]/10 text-[#5BB8FF] border-[#5BB8FF]/20" :
                        "bg-white/[0.04] text-white/50 border-white/8 group-hover:bg-[#5BB8FF]/8 group-hover:text-[#5BB8FF]/70 group-hover:border-[#5BB8FF]/15"
                      }`}>
                        {ambassador.points.toLocaleString()}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Footer note */}
            <motion.div {...fade(0.25)} className="mt-6 flex items-center justify-center gap-2 text-xs text-white/30">
              <TrendingUp className="w-3.5 h-3.5 text-[#5BB8FF]/50" />
              <span>Rankings are updated in real-time · Showing top 15 ambassadors · hackX 11.0</span>
            </motion.div>
          </div>
        </section>

        {/* ── THE JOURNEY / HOW IT WORKS ── */}
        <section id="journey" className="relative py-28 bg-[#010814]">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            
            {/* Header */}
            <div className="text-center flex flex-col items-center mb-20">
              <motion.span 
                {...fade(0)}
                className="text-xs font-bold tracking-[0.2em] uppercase text-[#5BB8FF] mb-4"
              >
                Workflow
              </motion.span>
              <motion.h2 
                {...fade(0.05)}
                className="text-4xl md:text-5xl font-black text-white tracking-tight"
              >
                How the Ambassador Journey Unfolds
              </motion.h2>
            </div>

            {/* Step blocks */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Dotted connect line */}
              <div className="absolute top-[28px] left-[10%] right-[10%] h-[1.5px] border-t border-dashed border-white/10 hidden md:block z-0" />

              {[
                { step: "01", title: "Apply Online", desc: "Submit your details and select your university and faculty." },
                { step: "02", title: "Get Onboarded", desc: "Unlock official media resources, ambassador training, and referral links." },
                { step: "03", title: "Refer & Support", desc: "Promote hackX within your campus network and support teams as they develop and refine their startup ideas." },
                { step: "04", title: "Climb & Win", desc: "Track your impact as your referred teams progress, earn points, and unlock exclusive rewards." },
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  {...fade(idx * 0.1 + 0.15)}
                  className="flex flex-col relative z-10 bg-[#041A3A]/10 border border-white/5 hover:border-white/10 transition-colors p-6 rounded-2xl group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1A6FD4] to-[#5BB8FF] flex items-center justify-center text-white font-bold text-xs mb-6 shadow-[0_0_12px_rgba(91,184,255,0.2)]">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#5BB8FF] transition-colors">{item.title}</h3>
                  <p className="text-white/45 font-light leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ── INTERACTIVE FAQ CHATBOT ── */}
        <section id="chatbot" className="relative py-28 bg-[#010814] border-t border-white/5">
          {/* Ambient light glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#1A6FD4]/5 blur-[120px] rounded-full pointer-events-none" style={{ zIndex: 0 }} />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Section Header */}
            <div className="text-center flex flex-col items-center mb-16">
              <motion.span 
                {...fade(0)}
                className="text-xs font-bold tracking-[0.2em] uppercase text-[#5BB8FF] mb-4"
              >
                Instant Answers
              </motion.span>
              <motion.h2 
                {...fade(0.05)}
                className="text-4xl md:text-5xl font-black text-white tracking-tight"
              >
                Ask Mascot, our AI Assistant
              </motion.h2>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              
              {/* Left Column: Q&A info and Quick Chips */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <motion.div {...fade(0.1)} className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Have Questions?</h3>
                  <p className="text-white/50 text-sm leading-relaxed font-light">
                    Get instant responses about the hackX Campus Ambassador Program. Click any of the quick-query chips below to test the bot, or type your custom questions in the chat window.
                  </p>
                </motion.div>

                {/* Quick Chips list */}
                <div className="flex flex-wrap gap-2.5">
                  {[
                    "Who is eligible to apply?",
                    "How does the point structure work?",
                    "What rewards do top ambassadors get?",
                    "Will I get an official certificate?",
                    "What is the program duration?",
                    "What are the responsibilities?"
                  ].map((chip, idx) => (
                    <motion.button
                      key={idx}
                      {...fade(idx * 0.05 + 0.15)}
                      onClick={() => handleQuickQuestion(chip)}
                      className="px-4 py-2 text-xs font-medium bg-[#041A3A]/20 hover:bg-[#041A3A]/45 text-white/75 hover:text-white border border-white/5 hover:border-white/10 rounded-full transition-all duration-300 backdrop-blur-md cursor-pointer flex items-center gap-1.5 outline-none"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#5BB8FF]" />
                      <span>{chip}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Right Column: Chat Window */}
              <motion.div 
                {...fade(0.2)}
                className="lg:col-span-7 flex flex-col rounded-[2rem] border border-white/5 bg-[#041A3A]/10 backdrop-blur-[32px] overflow-hidden h-[500px] shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
              >
                {/* Chat Header */}
                <div className="px-6 py-4 border-b border-white/5 bg-white/[0.01] flex items-center shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-[#5BB8FF]/10 border border-[#5BB8FF]/20">
                      <Image
                        src="/mascot-waving.jpg"
                        alt="hackX Mascot"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-none mb-1">Mascot</h4>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] text-white/45 font-semibold tracking-wider uppercase">Online</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages Box */}
                <div 
                  data-lenis-prevent
                  className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent flex flex-col" 
                  id="chat-messages"
                >
                  {messages.map((msg, idx) => {
                    const isBot = msg.sender === "bot";
                    return (
                      <div 
                        key={idx} 
                        className={`flex ${isBot ? "justify-start" : "justify-end"} items-start gap-2.5 max-w-[85%] ${isBot ? "self-start" : "self-end"}`}
                      >
                        {isBot && (
                          <div className="relative w-7 h-7 rounded-lg overflow-hidden bg-[#5BB8FF]/10 border border-[#5BB8FF]/20 shrink-0 mt-0.5">
                            <Image
                              src="/mascot-waving.jpg"
                              alt="hackX Mascot"
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        )}
                        <div 
                          className={`rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                            isBot 
                              ? "bg-white/[0.03] border border-white/5 text-white/85 rounded-tl-none" 
                              : "bg-gradient-to-r from-[#1A6FD4] to-[#5BB8FF] text-white rounded-tr-none shadow-[0_0_12px_rgba(91,184,255,0.15)]"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start items-center gap-2.5 self-start">
                      <div className="relative w-7 h-7 rounded-lg overflow-hidden bg-[#5BB8FF]/10 border border-[#5BB8FF]/20 shrink-0">
                        <Image
                          src="/mascot-waving.jpg"
                          alt="hackX Mascot"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="bg-white/[0.03] border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-[bounce_1s_infinite_100ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-[bounce_1s_infinite_200ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-[bounce_1s_infinite_300ms]" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <form 
                  onSubmit={handleSendMessage}
                  className="p-4 border-t border-white/5 bg-white/[0.01] flex items-center gap-3 shrink-0"
                >
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Type your question..."
                    disabled={isTyping}
                    className="flex-1 px-4 py-3 rounded-full bg-[#041A3A]/20 border border-white/5 focus:border-[#5BB8FF]/30 text-white placeholder-white/35 focus:outline-none transition-colors backdrop-blur-md text-xs disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isTyping || !inputVal.trim()}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1A6FD4] to-[#5BB8FF] hover:opacity-90 flex items-center justify-center text-white shadow-[0_0_12px_rgba(91,184,255,0.25)] transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── CONTACT US SECTION ── */}
        <section id="contact" className="relative py-28 bg-[#010814] border-t border-white/5">
          {/* Ambient light glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#1A6FD4]/5 blur-[120px] rounded-full pointer-events-none" style={{ zIndex: 0 }} />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Section Header */}
            <div className="text-center flex flex-col items-center mb-16">
              <motion.span 
                {...fade(0)}
                className="text-xs font-bold tracking-[0.2em] uppercase text-[#5BB8FF] mb-4"
              >
                Support Network
              </motion.span>
              <motion.h2 
                {...fade(0.05)}
                className="text-4xl md:text-5xl font-black text-white tracking-tight"
              >
                Get in Touch
              </motion.h2>
              <motion.p
                {...fade(0.1)}
                className="text-white/60 font-light mt-4 max-w-xl leading-relaxed text-sm md:text-base text-center"
              >
                Have specific questions or need direct support? Contact our Ambassador Coordinators.
              </motion.p>
            </div>

            {/* Coordinator Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8">
              {/* Card 1: Charith Fonseka */}
              <motion.div
                {...fade(0.15)}
                className="relative overflow-hidden rounded-[2rem] bg-[#041A3A]/25 backdrop-blur-[24px] border border-white/5 shadow-md p-8 flex flex-col items-center text-center group transition-all duration-500 hover:bg-[#041A3A]/35 hover:border-white/10"
              >
                <div className="relative w-32 h-32 rounded-3xl overflow-hidden bg-[#5BB8FF]/10 border border-[#5BB8FF]/20 mb-6 shrink-0 transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src="/coordinator-charith-profile.jpg"
                    alt="Charith Fonseka"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-1">Charith Fonseka</h3>
                <p className="text-[#5BB8FF] font-semibold text-xs tracking-wider uppercase mb-6">Ambassador Coordinator</p>
                
                <div className="w-full space-y-3">
                  <Link 
                    href="mailto:charith@hackx.lk"
                    className="flex items-center justify-center gap-3 w-full py-3.5 rounded-full bg-white/[0.03] border border-white/5 hover:border-[#5BB8FF]/30 text-white/80 hover:text-white transition-all duration-300 text-sm"
                  >
                    <Mail className="w-4.5 h-4.5 text-[#5BB8FF]" />
                    <span>charith@hackx.lk</span>
                  </Link>
                  <Link 
                    href="tel:+94771234567"
                    className="flex items-center justify-center gap-3 w-full py-3.5 rounded-full bg-white/[0.03] border border-white/5 hover:border-[#5BB8FF]/30 text-white/80 hover:text-white transition-all duration-300 text-sm"
                  >
                    <Phone className="w-4.5 h-4.5 text-[#5BB8FF]" />
                    <span>+94 77 123 4567</span>
                  </Link>
                </div>
              </motion.div>

              {/* Card 2: Manumi Senavirathna */}
              <motion.div
                {...fade(0.25)}
                className="relative overflow-hidden rounded-[2rem] bg-[#041A3A]/25 backdrop-blur-[24px] border border-white/5 shadow-md p-8 flex flex-col items-center text-center group transition-all duration-500 hover:bg-[#041A3A]/35 hover:border-white/10"
              >
                <div className="relative w-32 h-32 rounded-3xl overflow-hidden bg-[#5BB8FF]/10 border border-[#5BB8FF]/20 mb-6 shrink-0 transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src="/coordinator-manumi.png"
                    alt="Manumi Senavirathna"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-1">Manumi Senavirathna</h3>
                <p className="text-[#5BB8FF] font-semibold text-xs tracking-wider uppercase mb-6">Ambassador Coordinator</p>
                
                <div className="w-full space-y-3">
                  <Link 
                    href="mailto:manumi@hackx.lk"
                    className="flex items-center justify-center gap-3 w-full py-3.5 rounded-full bg-white/[0.03] border border-white/5 hover:border-[#5BB8FF]/30 text-white/80 hover:text-white transition-all duration-300 text-sm"
                  >
                    <Mail className="w-4.5 h-4.5 text-[#5BB8FF]" />
                    <span>manumi@hackx.lk</span>
                  </Link>
                  <Link 
                    href="tel:+94779876543"
                    className="flex items-center justify-center gap-3 w-full py-3.5 rounded-full bg-white/[0.03] border border-white/5 hover:border-[#5BB8FF]/30 text-white/80 hover:text-white transition-all duration-300 text-sm"
                  >
                    <Phone className="w-4.5 h-4.5 text-[#5BB8FF]" />
                    <span>+94 77 987 6543</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── REGISTRATION / CTA CARD ── */}
        <section id="apply-form" className="relative py-32 bg-[#010814]">
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <motion.div 
              {...fade(0)}
              className="text-center flex flex-col items-center"
            >
              <h2 
                className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight"
                style={{ fontFamily: "'TT Hoves Pro Expanded', 'TT Hoves Pro', sans-serif" }}
              >
                Ready to Lead Your Campus?
              </h2>
              <p className="text-white/60 font-light max-w-xl leading-relaxed text-sm md:text-base mb-10">
                Join a nationwide network of student leaders representing universities across Sri Lanka. Drive innovation, support aspiring founders, and earn recognition while representing your campus at the hackX 11.0 Grand Finals.
              </p>

              <button
                className="btn-primary py-4 px-12 text-base font-extrabold tracking-wide"
              >
                Register Now
              </button>

              <Link href="https://hackx.lk" className="mt-10 flex flex-col items-center group" target="_blank" rel="noopener noreferrer">
                <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em] mb-3 transition-colors group-hover:text-white/50">
                  Back to Main Site
                </span>
                <div className="relative w-28 h-9 transition-all duration-300 group-hover:scale-105 opacity-60 group-hover:opacity-100 filter drop-shadow-[0_0_12px_rgba(91,184,255,0.15)]">
                  <Image
                    src="/hackxlogo.webp"
                    alt="hackX Logo"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Point Structure Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              data-lenis-prevent
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                data-lenis-prevent
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-lg max-h-[90vh] sm:max-h-[85vh] flex flex-col rounded-3xl bg-[#041A3A]/95 border border-white/10 shadow-[0_20px_50px_rgba(26,111,212,0.15)] overflow-hidden p-6 sm:p-8 md:p-10"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Background Pixels */}
                <PixelCanvas
                  gap={10}
                  speed={20}
                  colors={["#1A6FD4", "#5BB8FF", "#0A3878"]}
                />

                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors z-20 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="relative z-10 flex flex-col flex-1 min-h-0">
                  {/* Fixed Header */}
                  <div className="flex items-center gap-4 mb-6 shrink-0 pr-8">
                    <div className="w-12 h-12 rounded-2xl bg-[#5BB8FF]/10 border border-[#5BB8FF]/20 flex items-center justify-center text-[#5BB8FF] shrink-0">
                      <Trophy className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-white" style={{ fontFamily: "'TT Hoves Pro Expanded', sans-serif" }}>
                        Point Structure
                      </h3>
                      <p className="text-[10px] sm:text-xs text-[#5BB8FF] font-medium tracking-wide">
                        hackX 11.0 Campus Ambassador Rewards
                      </p>
                    </div>
                  </div>
                  
                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-auto overscroll-y-contain pr-1 pb-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <p className="text-white/60 font-light leading-relaxed text-xs sm:text-sm">
                      Earn cumulative referral points as your referred teams progress through the stages of hackX 11.0.
                    </p>

                    <div className="w-full rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] font-bold uppercase tracking-wider text-white/45">
                              <th className="py-3.5 px-4 sm:px-6">Milestone / Action</th>
                              <th className="py-3.5 px-4 sm:px-6 text-right">Points</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { action: "Successful Team Referral", desc: "Proposal submitted with your referral ID", points: "+100" },
                              { action: "Referred Team reaches ideaX", desc: "Selected for the Semi-Finals round", points: "+150" },
                              { action: "Referred Team attends designX", desc: "Participation in mandatory workshops", points: "+100" },
                              { action: "Referred Team reaches Grand Finals", desc: "Selected for the Grand Finals", points: "+250" },
                              { action: "Podium Finish Referral", desc: "Referred team places in Top 3", points: "+500" },
                              { action: "Campus Awareness Event Hosted", desc: "Co-host an orientation workshop", points: "+300" },
                            ].map((row, idx) => (
                              <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/[0.01] transition-colors">
                                <td className="py-3.5 px-4 sm:px-6">
                                  <span className="font-semibold text-white/95 text-xs sm:text-sm block leading-normal">{row.action}</span>
                                  <span className="text-[10px] sm:text-xs text-white/40 font-light leading-normal block mt-0.5">{row.desc}</span>
                                </td>
                                <td className="py-3.5 px-4 sm:px-6 text-right">
                                  <span className="inline-block px-2.5 py-1 rounded-full text-xs font-black bg-[#5BB8FF]/10 text-[#5BB8FF] border border-[#5BB8FF]/20 shadow-[0_0_8px_rgba(91,184,255,0.1)]">
                                    {row.points}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-white/40 px-1">
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#5BB8FF]/50 shrink-0" />
                      <span>Points are finalized and credited after validation of each team's milestone.</span>
                    </div>
                  </div>

                  {/* Fixed Footer */}
                  <div className="pt-4 border-t border-white/5 shrink-0 px-2 pb-1.5">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="btn-primary w-full py-3.5 text-xs font-bold"
                    >
                      Got it
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      <Footer />
    </>
  );
}

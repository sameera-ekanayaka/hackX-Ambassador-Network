"use client";

import { useState, useEffect, useTransition, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  BookOpen, 
  Building2, 
  LayoutGrid, 
  GraduationCap, 
  Zap, 
  Plus, 
  Trash2, 
  AlertCircle,
  Loader2
} from "lucide-react";
import { submitApplication } from "@/app/register/actions";

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [university, setUniversity] = useState("");
  const [faculty, setFaculty] = useState("");
  const [degree, setDegree] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [motivation, setMotivation] = useState("");
  
  // Clubs states
  const [clubs, setClubs] = useState<string[]>([]);
  const [clubInput, setClubInput] = useState("");

  // UI States
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState("");

  // Listen to redirect error parameter from server action
  useEffect(() => {
    if (errorParam) {
      setErrorMsg(decodeURIComponent(errorParam));
    }
  }, [errorParam]);

  const handleAddClub = (e: React.MouseEvent) => {
    e.preventDefault();
    if (clubInput.trim() && !clubs.includes(clubInput.trim())) {
      setClubs([...clubs, clubInput.trim()]);
      setClubInput("");
    }
  };

  const handleRemoveClub = (clubToRemove: string) => {
    setClubs(clubs.filter(club => club !== clubToRemove));
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Required fields check
    if (!fullName.trim()) return setErrorMsg("Full Name is required.");
    if (!email.trim() || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return setErrorMsg("Please enter a valid Email Address.");
    if (!password || password.length < 6) return setErrorMsg("Password must be at least 6 characters.");
    if (password !== confirmPassword) return setErrorMsg("Passwords do not match.");
    if (!phone.trim()) return setErrorMsg("Phone Number is required.");
    if (!whatsapp.trim()) return setErrorMsg("WhatsApp Number is required.");
    if (!yearOfStudy) return setErrorMsg("Year of Study is required.");
    if (!university.trim()) return setErrorMsg("University is required.");
    if (!faculty.trim()) return setErrorMsg("Faculty is required.");
    if (!degree.trim()) return setErrorMsg("Degree Programme is required.");
    if (!motivation.trim()) return setErrorMsg("Motivation is required.");

    startTransition(async () => {
      const formData = new FormData();
      formData.append("name", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirm_password", confirmPassword);
      formData.append("phone", phone);
      formData.append("whatsapp", whatsapp);

      // Map study year string options to integer strings for supabase database columns
      let mappedYear = "1";
      if (yearOfStudy === "1st Year") mappedYear = "1";
      else if (yearOfStudy === "2nd Year") mappedYear = "2";
      else if (yearOfStudy === "3rd Year") mappedYear = "3";
      else if (yearOfStudy === "4th Year") mappedYear = "4";
      else if (yearOfStudy === "Postgraduate") mappedYear = "5";
      formData.append("year_of_study", mappedYear);

      formData.append("university", university);
      formData.append("faculty", faculty);
      formData.append("degree_programme", degree);
      formData.append("facebook_url", facebookUrl);
      formData.append("linkedin_url", linkedinUrl);
      formData.append("motivation", motivation);

      // Append club list
      clubs.forEach((clubName) => {
        formData.append("clubs", clubName);
      });

      try {
        await submitApplication(formData);
      } catch (err) {
        console.error("Register transition error:", err);
      }
    });
  };

  return (
    <main className="relative min-h-screen w-full bg-[#010814] flex items-center justify-center py-16 px-4 md:px-8 overflow-hidden select-none">
      
      {/* ── BACKGROUND DIAGNAL ACCENT ── */}
      {/* Bottom Right Slanted Panel */}
      <div 
        className="absolute bottom-0 right-0 w-[60vw] h-[60vw] md:w-[35vw] md:h-[35vw] bg-gradient-to-br from-[#038491] via-[#0A3878] to-[#010814] pointer-events-none z-0"
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
          borderTopLeftRadius: "20%",
        }}
      />
      {/* Small floating particles/blobs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#1A6FD4]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Main card box */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-4xl bg-[#041A3A]/30 backdrop-blur-[36px] border border-white/5 shadow-2xl rounded-3xl p-6 md:p-10 lg:p-12"
      >
        
        {/* Top Right Close Button */}
        <Link 
          href="/" 
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer z-20 outline-none"
        >
          <X className="w-5 h-5" />
        </Link>

        {/* Title Header */}
        <div className="mb-10 text-center md:text-left pr-10">
          <h1 
            className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase"
          >
            Register
          </h1>
          <p className="text-sm text-white/55 font-light tracking-wide mt-1">
            Join the hackX Ambassador Family
          </p>
        </div>

        {/* Submit Form */}
        <form onSubmit={handleRegisterSubmit} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            
            {/* Full Name */}
            <div className="space-y-1 relative group">
              <label className="text-[10px] md:text-xs font-bold text-white/60 tracking-wider">
                Full Name *
              </label>
              <div className="flex items-center border-b border-white/10 focus-within:border-[#5BB8FF] py-2 transition-all">
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  disabled={isPending}
                  autoComplete="off"
                  className="bg-transparent flex-grow text-sm text-white placeholder-white/25 focus:outline-none w-full border-none p-0 outline-none font-medium"
                />
                <User className="w-4 h-4 text-white/40 group-focus-within:text-[#5BB8FF] transition-colors ml-2" />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1 relative group">
              <label className="text-[10px] md:text-xs font-bold text-white/60 tracking-wider">
                Email Address *
              </label>
              <div className="flex items-center border-b border-white/10 focus-within:border-[#5BB8FF] py-2 transition-all">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  disabled={isPending}
                  autoComplete="off"
                  className="bg-transparent flex-grow text-sm text-white placeholder-white/25 focus:outline-none w-full border-none p-0 outline-none font-medium"
                />
                <Mail className="w-4 h-4 text-white/40 group-focus-within:text-[#5BB8FF] transition-colors ml-2" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1 relative group">
              <label className="text-[10px] md:text-xs font-bold text-white/60 tracking-wider">
                Password *
              </label>
              <div className="flex items-center border-b border-white/10 focus-within:border-[#5BB8FF] py-2 transition-all">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  disabled={isPending}
                  autoComplete="new-password"
                  className="bg-transparent flex-grow text-sm text-white placeholder-white/25 focus:outline-none w-full border-none p-0 outline-none font-medium"
                />
                <Lock className="w-4 h-4 text-white/40 group-focus-within:text-[#5BB8FF] transition-colors ml-2" />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1 relative group">
              <label className="text-[10px] md:text-xs font-bold text-white/60 tracking-wider">
                Confirm Password *
              </label>
              <div className="flex items-center border-b border-white/10 focus-within:border-[#5BB8FF] py-2 transition-all">
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  disabled={isPending}
                  autoComplete="new-password"
                  className="bg-transparent flex-grow text-sm text-white placeholder-white/25 focus:outline-none w-full border-none p-0 outline-none font-medium"
                />
                <ShieldCheck className="w-4 h-4 text-white/40 group-focus-within:text-[#5BB8FF] transition-colors ml-2" />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1 relative group">
              <label className="text-[10px] md:text-xs font-bold text-white/60 tracking-wider">
                Phone Number *
              </label>
              <div className="flex items-center border-b border-white/10 focus-within:border-[#5BB8FF] py-2 transition-all">
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+94 7X XXX XXXX"
                  disabled={isPending}
                  autoComplete="off"
                  className="bg-transparent flex-grow text-sm text-white placeholder-white/25 focus:outline-none w-full border-none p-0 outline-none font-medium"
                />
                <Phone className="w-4 h-4 text-white/40 group-focus-within:text-[#5BB8FF] transition-colors ml-2" />
              </div>
            </div>

            {/* WhatsApp Number */}
            <div className="space-y-1 relative group">
              <label className="text-[10px] md:text-xs font-bold text-white/60 tracking-wider">
                WhatsApp Number *
              </label>
              <div className="flex items-center border-b border-white/10 focus-within:border-[#5BB8FF] py-2 transition-all">
                <input 
                  type="tel" 
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+94 7X XXX XXXX"
                  disabled={isPending}
                  autoComplete="off"
                  className="bg-transparent flex-grow text-sm text-white placeholder-white/25 focus:outline-none w-full border-none p-0 outline-none font-medium"
                />
                <MessageCircle className="w-4 h-4 text-white/40 group-focus-within:text-[#5BB8FF] transition-colors ml-2" />
              </div>
            </div>

            {/* Year of Study */}
            <div className="space-y-1 relative group">
              <label className="text-[10px] md:text-xs font-bold text-white/60 tracking-wider">
                Year of Study *
              </label>
              <div className="flex items-center border-b border-white/10 focus-within:border-[#5BB8FF] py-2 transition-all">
                <select 
                  value={yearOfStudy}
                  onChange={(e) => setYearOfStudy(e.target.value)}
                  disabled={isPending}
                  className="bg-transparent flex-grow text-sm text-white/80 focus:text-white placeholder-white/25 focus:outline-none w-full border-none p-0 outline-none font-medium [&>option]:bg-[#041A3A] [&>option]:text-white"
                >
                  <option value="" disabled>Select your year of study</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
                <BookOpen className="w-4 h-4 text-white/40 group-focus-within:text-[#5BB8FF] transition-colors ml-2 pointer-events-none" />
              </div>
            </div>

            {/* University */}
            <div className="space-y-1 relative group">
              <label className="text-[10px] md:text-xs font-bold text-white/60 tracking-wider">
                University *
              </label>
              <div className="flex items-center border-b border-white/10 focus-within:border-[#5BB8FF] py-2 transition-all">
                <input 
                  type="text" 
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder="e.g. University of Kelaniya"
                  disabled={isPending}
                  autoComplete="off"
                  className="bg-transparent flex-grow text-sm text-white placeholder-white/25 focus:outline-none w-full border-none p-0 outline-none font-medium"
                />
                <Building2 className="w-4 h-4 text-white/40 group-focus-within:text-[#5BB8FF] transition-colors ml-2" />
              </div>
            </div>

            {/* Faculty */}
            <div className="space-y-1 relative group">
              <label className="text-[10px] md:text-xs font-bold text-white/60 tracking-wider">
                Faculty *
              </label>
              <div className="flex items-center border-b border-white/10 focus-within:border-[#5BB8FF] py-2 transition-all">
                <input 
                  type="text" 
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  placeholder="e.g. Faculty of Computing"
                  disabled={isPending}
                  autoComplete="off"
                  className="bg-transparent flex-grow text-sm text-white placeholder-white/25 focus:outline-none w-full border-none p-0 outline-none font-medium"
                />
                <LayoutGrid className="w-4 h-4 text-white/40 group-focus-within:text-[#5BB8FF] transition-colors ml-2" />
              </div>
            </div>

            {/* Degree Programme */}
            <div className="space-y-1 relative group">
              <label className="text-[10px] md:text-xs font-bold text-white/60 tracking-wider">
                Degree Programme *
              </label>
              <div className="flex items-center border-b border-white/10 focus-within:border-[#5BB8FF] py-2 transition-all">
                <input 
                  type="text" 
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  placeholder="e.g. BSc in Software Engineering"
                  disabled={isPending}
                  autoComplete="off"
                  className="bg-transparent flex-grow text-sm text-white placeholder-white/25 focus:outline-none w-full border-none p-0 outline-none font-medium"
                />
                <GraduationCap className="w-4 h-4 text-white/40 group-focus-within:text-[#5BB8FF] transition-colors ml-2" />
              </div>
            </div>

            {/* Facebook URL */}
            <div className="space-y-1 relative group">
              <label className="text-[10px] md:text-xs font-bold text-white/60 tracking-wider">
                Facebook URL
              </label>
              <div className="flex items-center border-b border-white/10 focus-within:border-[#5BB8FF] py-2 transition-all">
                <input 
                  type="url" 
                  value={facebookUrl}
                  onChange={(e) => setFacebookUrl(e.target.value)}
                  placeholder="https://facebook.com/username"
                  disabled={isPending}
                  autoComplete="off"
                  className="bg-transparent flex-grow text-sm text-white placeholder-white/25 focus:outline-none w-full border-none p-0 outline-none font-medium"
                />
                <svg className="w-4 h-4 text-white/40 group-focus-within:text-[#5BB8FF] transition-colors ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </div>
            </div>

            {/* LinkedIn URL */}
            <div className="space-y-1 relative group">
              <label className="text-[10px] md:text-xs font-bold text-white/60 tracking-wider">
                LinkedIn URL
              </label>
              <div className="flex items-center border-b border-white/10 focus-within:border-[#5BB8FF] py-2 transition-all">
                <input 
                  type="url" 
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  disabled={isPending}
                  autoComplete="off"
                  className="bg-transparent flex-grow text-sm text-white placeholder-white/25 focus:outline-none w-full border-none p-0 outline-none font-medium"
                />
                <svg className="w-4 h-4 text-white/40 group-focus-within:text-[#5BB8FF] transition-colors ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </div>
            </div>

          </div>

          {/* Motivation - Spans 2 Columns */}
          <div className="space-y-1 relative group">
            <label className="text-[10px] md:text-xs font-bold text-white/60 tracking-wider">
              Motivation *
            </label>
            <div className="flex items-start border-b border-white/10 focus-within:border-[#5BB8FF] py-2 transition-all">
              <textarea 
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                placeholder="Why do you want to join the hackX Ambassador Network? What makes you a good fit?"
                rows={3}
                disabled={isPending}
                className="bg-transparent flex-grow text-sm text-white placeholder-white/25 focus:outline-none w-full border-none p-0 outline-none resize-none font-medium"
              />
              <Zap className="w-4 h-4 text-white/40 group-focus-within:text-[#5BB8FF] transition-colors ml-2 mt-1 shrink-0" />
            </div>
          </div>

          {/* Clubs & Societies Section */}
          <div className="space-y-3 pt-2">
            <div>
              <h3 className="text-base font-bold text-white">Clubs & Societies</h3>
              <p className="text-xs text-white/40 font-light">List the clubs you are currently part of.</p>
            </div>
            
            {/* Add Club Input */}
            <div className="flex items-center gap-3 max-w-md">
              <div className="flex-1 flex items-center border-b border-white/10 focus-within:border-[#5BB8FF] py-1.5 transition-all">
                <input 
                  type="text" 
                  value={clubInput}
                  onChange={(e) => setClubInput(e.target.value)}
                  placeholder="Club Name"
                  disabled={isPending}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (clubInput.trim() && !clubs.includes(clubInput.trim())) {
                        setClubs([...clubs, clubInput.trim()]);
                        setClubInput("");
                      }
                    }
                  }}
                  className="bg-transparent flex-grow text-sm text-white placeholder-white/25 focus:outline-none w-full border-none p-0 outline-none font-medium"
                />
              </div>
              <button 
                type="button" 
                onClick={handleAddClub}
                disabled={isPending || !clubInput.trim()}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#5BB8FF]/20 border border-white/10 hover:border-[#5BB8FF]/40 text-white hover:text-[#5BB8FF] flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
              >
                <Plus className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Added Clubs List */}
            <AnimatePresence>
              {clubs.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2 pt-1"
                >
                  {clubs.map((club) => (
                    <motion.span 
                      key={club} 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#038491]/10 border border-[#038491]/30 text-white/95"
                    >
                      <span>{club}</span>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveClub(club)}
                        disabled={isPending}
                        className="text-white/40 hover:text-rose-400 transition-colors cursor-pointer outline-none border-none p-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Form Action Section */}
          <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Errors display */}
            <div className="flex-grow max-w-md">
              <AnimatePresence mode="wait">
                {errorMsg && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-3.5 rounded-xl"
                  >
                    <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                    <span className="font-semibold">{errorMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation back / Submission */}
            <div className="flex items-center justify-end gap-6 shrink-0">
              <Link 
                href="/login" 
                className="text-xs font-bold text-white/45 hover:text-white/80 transition-colors uppercase tracking-wider text-center"
              >
                Already have an account? Login
              </Link>
              
              <button 
                type="submit" 
                disabled={isPending}
                className="btn-primary px-12 py-4.5 text-base font-extrabold tracking-wide min-w-[150px] shrink-0 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Register</span>
                )}
              </button>
            </div>

          </div>

        </form>

      </motion.div>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <div className="hackx-theme min-h-screen bg-brand-black text-white">
      <Suspense fallback={
        <main className="min-h-screen w-full bg-[#010814] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#5BB8FF]" />
        </main>
      }>
        <RegisterContent />
      </Suspense>
    </div>
  );
}

'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { login } from '@/app/login/actions'
import { submitApplication } from '@/app/register/actions'

interface AuthScreenProps {
  defaultTab: 'landing' | 'login' | 'register'
}

export default function AuthScreen({ defaultTab }: AuthScreenProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [viewState, setViewState] = useState<'landing' | 'login' | 'register'>('landing')
  const signupPanelRef = useRef<HTMLElement>(null)
  const applyBtnWrapperRef = useRef<HTMLDivElement>(null)
  const applyBtnRef = useRef<HTMLButtonElement>(null)
  const [clubsList, setClubsList] = useState<string[]>([])
  const [clubInput, setClubInput] = useState('')

  // Scroll to top when viewState transitions to register
  useEffect(() => {
    if (viewState === 'register') {
      window.scrollTo(0, 0)
      if (signupPanelRef.current) {
        signupPanelRef.current.scrollTop = 0
      }
    }
  }, [viewState])

  // Sync viewState with browser back/forward history
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      if (path === '/login') {
        setViewState('login')
      } else if (path === '/register') {
        setViewState('register')
      } else {
        setViewState('landing')
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Ripple effect loop for the "Apply to be an Ambassador" button
  useEffect(() => {
    if (viewState !== 'landing') return

    let hover = false
    let active = true

    const getElements = () => {
      const wrapper = applyBtnWrapperRef.current
      const button = applyBtnRef.current
      return { wrapper, button }
    }

    const mouseEnterHandler = () => { hover = true }
    const mouseLeaveHandler = () => { hover = false }

    let listenersAttached = false
    const attachListeners = () => {
      const { button } = getElements()
      if (button && !listenersAttached) {
        button.addEventListener("mouseenter", mouseEnterHandler)
        button.addEventListener("mouseleave", mouseLeaveHandler)
        listenersAttached = true
        return true
      }
      return listenersAttached
    }

    const createRipple = () => {
      if (!active) return
      const { wrapper, button } = getElements()
      if (!wrapper || !button) return

      const ring = document.createElement("div")
      ring.classList.add("ripple")

      const rect = button.getBoundingClientRect()
      const parentRect = wrapper.getBoundingClientRect()

      ring.style.left = (rect.left - parentRect.left + rect.width / 2) + "px"
      ring.style.top = (rect.top - parentRect.top + rect.height / 2) + "px"

      wrapper.appendChild(ring)

      setTimeout(() => {
        if (ring.parentNode) {
          ring.remove()
        }
      }, 1500)
    }

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    const rippleLoop = async () => {
      await sleep(100)
      attachListeners()

      while (active) {
        if (!listenersAttached) {
          attachListeners()
        }

        createRipple()
        await sleep(500)

        createRipple()
        await sleep(500)

        createRipple()

        if (hover) {
          await sleep(500)
        } else {
          await sleep(1000)
        }
      }
    }

    rippleLoop()

    return () => {
      active = false
      const { button } = getElements()
      if (button && listenersAttached) {
        button.removeEventListener("mouseenter", mouseEnterHandler)
        button.removeEventListener("mouseleave", mouseLeaveHandler)
      }
    }
  }, [viewState])

  const handleAddClub = () => {
    const trimmed = clubInput.trim()
    if (trimmed && !clubsList.includes(trimmed)) {
      setClubsList([...clubsList, trimmed])
      setClubInput('')
    }
  }

  const handleRemoveClub = (clubName: string) => {
    setClubsList(clubsList.filter(c => c !== clubName))
  }

  // Retrieve parameters
  const loginMessage = searchParams.get('message')
  const registerError = searchParams.get('error')

  // Update component tab state if URL prop changes directly
  useEffect(() => {
    const timer = setTimeout(() => {
      setViewState(defaultTab)
    }, 50)
    return () => clearTimeout(timer)
  }, [defaultTab])

  const handleToggle = (targetTab: 'landing' | 'login' | 'register') => {
    setViewState(targetTab)
    let url = '/'
    if (targetTab === 'login') url = '/login'
    else if (targetTab === 'register') url = '/register'
    window.history.pushState(null, '', url)
  }



  return (
    <main className={`landing-page-container w-full relative overflow-x-hidden flex flex-col text-white transition-all duration-500 ${viewState === 'landing'
      ? 'h-screen overflow-y-hidden landing-bg-active'
      : 'min-h-screen'
      }`}>

      {/* Full-screen video background — only visible on landing */}
      {viewState === 'landing' && (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          >
            <source src="/video1.mp4" type="video/mp4" />
          </video>
          {/* Subtle gradient overlay to keep video bright while keeping text legible on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/15 to-transparent z-[1] pointer-events-none"></div>
        </>
      )}

      {/* Main Base Page layer */}
      <div className={`w-full relative z-[3] transition-all duration-500 ${viewState !== 'landing'
        ? 'h-0 overflow-hidden opacity-0 pointer-events-none'
        : 'min-h-screen flex flex-col opacity-100 scale-100'
        }`}>

        {/* Navigation Bar */}
        <header className="w-full bg-transparent sticky top-0 z-40 transition-all">
          <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight text-white dashboard-title-font">
                hack<span className="text-[#00d4ff] drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]">X</span>
              </span>
            </div>

            {/* Nav Links Removed */}

            {/* Login CTA */}
            <div>
              <button
                type="button"
                onClick={() => handleToggle('login')}
                className="flex items-center gap-2 border border-[#00d4ff]/30 bg-cyan-950/20 hover:bg-[#00d4ff]/10 text-white font-medium px-5 py-2.5 rounded-full text-sm transition-all duration-150 cursor-pointer active:scale-[0.98] shadow-[0_0_15px_rgba(0,212,255,0.1)] hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]"
              >
                <svg className="w-4 h-4 text-[#00d4ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Ambassador Login
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 py-6 md:py-12 flex flex-col justify-center items-start z-10">

          {/* Badge/Eyebrow */}
          <div className="flex items-center gap-2 bg-cyan-950/60 border border-[#00d4ff]/30 text-[#00d4ff] text-[11px] font-bold px-4 py-2 rounded-full tracking-wider mb-6 uppercase shadow-[0_0_15px_rgba(0,212,255,0.2)]">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            STUDENT AMBASSADOR PROGRAM
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-[62px] font-extrabold text-white leading-[1.1] mb-6 tracking-tight font-sans drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
            Build. Represent.<br />
            <span className="bg-gradient-to-r from-[#00b4ff] to-[#00f0ff] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,212,255,0.35)]">
              Lead the Change.
            </span>
          </h1>

          {/* Description */}
          <p className="text-white text-base md:text-lg mb-8 leading-relaxed max-w-xl font-sans drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            Join the hackX Student Ambassador Program and be the voice of innovation at your campus. Build your network, grow your skills, and earn exclusive rewards.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative" id="apply-btn-wrapper" ref={applyBtnWrapperRef}>
              <button
                id="apply-btn"
                ref={applyBtnRef}
                type="button"
                onClick={() => handleToggle('register')}
                className="relative z-10 flex items-center justify-center gap-2 bg-[#00b4ff] hover:bg-[#00c8ff] text-white font-semibold px-8 py-4 rounded-full shadow-[0_4px_20px_rgba(0,180,255,0.35)] hover:shadow-[0_6px_28px_rgba(0,180,255,0.55)] transition-all duration-300 active:scale-[0.98] cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Apply to be an Ambassador
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* Modal Overlay layer */}
      <div
        className={`fixed inset-0 z-50 overflow-y-auto p-4 flex justify-center items-start bg-black/80 backdrop-blur-md transition-all duration-500 ${viewState === 'landing'
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100 pointer-events-auto'
          }`}
        onClick={() => handleToggle('landing')}
      >
        <div
          className={`auth-page-container !min-h-0 !p-0 !bg-transparent w-full my-auto transition-all duration-500 ${viewState === 'landing' ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`auth-wrapper view-${viewState} ${viewState === 'register' ? 'toggled register-active' : ''}`}>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => handleToggle('landing')}
              className="close-button"
              aria-label="Back to home"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* ==================== LOGIN/REGISTER PANEL WRAPPER ==================== */}
            <div className="panel-login-register w-full h-full relative">
              {/* Background shapes for sliding animation */}
              <div className="background-shape"></div>
              <div className="secondary-shape"></div>

              {/* ==================== LOGIN PANEL ==================== */}
              <section className="credentials-panel signin">
                <h2 className="slide-element">Login</h2>
                <p className="text-center text-xs text-cyan-400 mb-2 slide-element">
                  Ambassador Portal
                </p>

                <form action={login} className="flex flex-col">
                  <div className="field-wrapper slide-element">
                    <input
                      id="login-email"
                      name="email"
                      type="email"
                      required
                      placeholder=" "
                      className="w-full"
                    />
                    <label htmlFor="login-email">Email Address</label>
                    <i>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                      </svg>
                    </i>
                  </div>

                  <div className="field-wrapper slide-element">
                    <input
                      id="login-password"
                      name="password"
                      type="password"
                      required
                      placeholder=" "
                      className="w-full"
                    />
                    <label htmlFor="login-password">Password</label>
                    <i>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </i>
                  </div>

                  {loginMessage && (
                    <div className="rounded-md bg-red-950/80 border border-red-500/50 p-3 text-xs text-red-200 mt-5 text-center slide-element">
                      {loginMessage}
                    </div>
                  )}

                  <div className="field-wrapper slide-element">
                    <button className="submit-button" type="submit">Login</button>
                  </div>

                  <div className="switch-link slide-element">
                    <p>
                      Don't have an account? <br />
                      <a
                        href="/register"
                        onClick={(e) => {
                          e.preventDefault()
                          handleToggle('register')
                        }}
                        className="register-trigger"
                      >
                        Sign Up
                      </a>
                    </p>
                  </div>
                </form>
              </section>

              {/* WELCOME BACK PANEL (Login Mode) */}
              <section className="welcome-section signin">
                <h2 className="slide-element">WELCOME BACK!</h2>
                <p className="slide-element">
                  Connect to view your tasks, submit activities, and track your points on the hackX leaderboard.
                </p>
              </section>

              {/* ==================== REGISTER PANEL ==================== */}
              <section className="credentials-panel signup" ref={signupPanelRef}>
                <h2 className="slide-element">Register</h2>
                <p className="text-center text-xs text-cyan-400 mb-1 slide-element">
                  Join the hackX Ambassador Family
                </p>

                {registerError && (
                  <div className="rounded-md bg-red-950/80 border border-red-500/50 p-2 text-xs text-red-200 mb-2 text-center slide-element">
                    {registerError}
                  </div>
                )}

                <form action={submitApplication} className="flex flex-col gap-1 pb-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 slide-element">

                    {/* Name */}
                    <div className="field-wrapper">
                      <input
                        id="reg-name"
                        name="name"
                        type="text"
                        required
                        placeholder=" "
                      />
                      <label htmlFor="reg-name">Full Name *</label>
                      <i>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </i>
                    </div>

                    {/* Email */}
                    <div className="field-wrapper">
                      <input
                        id="reg-email"
                        name="email"
                        type="email"
                        required
                        placeholder=" "
                      />
                      <label htmlFor="reg-email">Email Address *</label>
                      <i>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </i>
                    </div>

                    {/* Password */}
                    <div className="field-wrapper">
                      <input
                        id="reg-password"
                        name="password"
                        type="password"
                        required
                        minLength={6}
                        placeholder=" "
                      />
                      <label htmlFor="reg-password">Password *</label>
                      <i>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </i>
                    </div>

                    {/* Confirm Password */}
                    <div className="field-wrapper">
                      <input
                        id="reg-confirm-password"
                        name="confirm_password"
                        type="password"
                        required
                        minLength={6}
                        placeholder=" "
                      />
                      <label htmlFor="reg-confirm-password">Confirm Password *</label>
                      <i>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </i>
                    </div>

                    {/* Phone */}
                    <div className="field-wrapper">
                      <input
                        id="reg-phone"
                        name="phone"
                        type="text"
                        required
                        placeholder=" "
                      />
                      <label htmlFor="reg-phone">Phone Number *</label>
                      <i>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </i>
                    </div>

                    {/* Whatsapp */}
                    <div className="field-wrapper">
                      <input
                        id="reg-whatsapp"
                        name="whatsapp"
                        type="text"
                        required
                        placeholder=" "
                      />
                      <label htmlFor="reg-whatsapp">WhatsApp Number *</label>
                      <i>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </i>
                    </div>

                    {/* Year of study */}
                    <div className="field-wrapper md:col-span-2">
                      <input
                        id="reg-year"
                        name="year_of_study"
                        type="number"
                        min="1"
                        max="10"
                        required
                        placeholder=" "
                      />
                      <label htmlFor="reg-year">Year of Study *</label>
                      <i>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </i>
                    </div>

                    {/* University */}
                    <div className="field-wrapper">
                      <input
                        id="reg-university"
                        name="university"
                        type="text"
                        required
                        placeholder=" "
                      />
                      <label htmlFor="reg-university">University *</label>
                      <i>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </i>
                    </div>

                    {/* Faculty */}
                    <div className="field-wrapper">
                      <input
                        id="reg-faculty"
                        name="faculty"
                        type="text"
                        required
                        placeholder=" "
                      />
                      <label htmlFor="reg-faculty">Faculty *</label>
                      <i>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      </i>
                    </div>

                    {/* Degree Program */}
                    <div className="field-wrapper md:col-span-2">
                      <input
                        id="reg-degree"
                        name="degree_programme"
                        type="text"
                        required
                        placeholder=" "
                      />
                      <label htmlFor="reg-degree">Degree Programme *</label>
                      <i>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                      </i>
                    </div>

                    {/* Facebook URL */}
                    <div className="field-wrapper">
                      <input
                        id="reg-fb"
                        name="facebook_url"
                        type="url"
                        placeholder=" "
                      />
                      <label htmlFor="reg-fb">Facebook URL</label>
                      <i>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                        </svg>
                      </i>
                    </div>

                    {/* LinkedIn URL */}
                    <div className="field-wrapper">
                      <input
                        id="reg-li"
                        name="linkedin_url"
                        type="url"
                        placeholder=" "
                      />
                      <label htmlFor="reg-li">LinkedIn URL</label>
                      <i>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                        </svg>
                      </i>
                    </div>

                    {/* Motivation */}
                    <div className="field-wrapper md:col-span-2">
                      <textarea
                        id="reg-motivation"
                        name="motivation"
                        required
                        placeholder=" "
                      />
                      <label htmlFor="reg-motivation">Motivation *</label>
                      <i>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </i>
                    </div>

                    {/* Clubs List */}
                    <div className="md:col-span-2 border-t border-white/10 pt-3 mt-3">
                      <p className="text-sm font-semibold text-white mb-0.5 text-left">Clubs & Societies</p>
                      <p className="text-xs text-gray-400 mb-3 text-left">List the clubs you are currently part of.</p>

                      <div className="flex items-end gap-2 relative">
                        <div className="field-wrapper !mt-0 flex-1">
                          <input
                            id="reg-club"
                            type="text"
                            value={clubInput}
                            onChange={(e) => setClubInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                handleAddClub()
                              }
                            }}
                            placeholder=" "
                          />
                          <label htmlFor="reg-club">Club Name</label>
                        </div>
                        <button
                          type="button"
                          onClick={handleAddClub}
                          className="absolute right-0 bottom-1.5 w-8 h-8 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>

                      {/* Visual tags of added clubs */}
                      {clubsList.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {clubsList.map((club, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300">
                              <span>{club}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveClub(club)}
                                className="text-cyan-500 hover:text-red-400 focus:outline-none cursor-pointer"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                              <input type="hidden" name="clubs" value={club} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>

                  <div className="field-wrapper slide-element mt-6">
                    <button className="submit-button" type="submit">Register</button>
                  </div>

                  <div className="switch-link slide-element">
                    <p>
                      Already have an account? <br />
                      <a
                        href="/login"
                        onClick={(e) => {
                          e.preventDefault()
                          handleToggle('login')
                        }}
                        className="login-trigger"
                      >
                        Sign In
                      </a>
                    </p>
                  </div>
                </form>
              </section>

              {/* WELCOME PANEL (Register Mode) */}
              <section className="welcome-section signup">
                <h2 className="slide-element">WELCOME!</h2>
                <p className="slide-element">
                  Become a part of the official student ambassador network. Share the hackX journey with your campus and elevate your leadership skills.
                </p>
              </section>

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

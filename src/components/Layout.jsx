import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './layout/Header.jsx'
import Footer from './layout/Footer.jsx'
import AuraCopilotWidget from './AuraCopilotWidget.jsx'

export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body-md text-body-md antialiased selection:bg-primary-container selection:text-on-primary min-h-screen relative overflow-x-hidden flex flex-col">
      {/* Ambient Nocturne Luminary background glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-tertiary-container/10 blur-[130px] rounded-full" />
        <div className="absolute top-[40%] -left-[15%] w-[600px] h-[600px] bg-primary/5 blur-[140px] rounded-full" />
        <div className="absolute top-[20%] -right-[15%] w-[650px] h-[650px] bg-secondary-container/15 blur-[150px] rounded-full" />
      </div>

      {/* Skip to main content link for keyboard & screen reader accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-primary focus:text-on-primary focus:font-semibold focus:rounded-lg focus:shadow-[0_8px_24px_rgba(0,0,0,0.8)] focus:outline-none focus:ring-2 focus:ring-secondary-fixed"
      >
        Skip to main content
      </a>

      {/* Modular Top Navigation Bar with Mobile Drawer */}
      <Header />

      {/* Main Page Content with smooth route entrance transition */}
      <main
        id="main-content"
        tabIndex={-1}
        key={location.pathname}
        className="w-full pt-16 sm:pt-20 bg-transparent flex-1 animate-fade-in focus:outline-none"
      >
        <Outlet />
      </main>

      {/* Global Floating Gemini Copilot + Audio Transcriber */}
      <AuraCopilotWidget />

      {/* Modular Footer */}
      <Footer />
    </div>
  )
}

import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuraProvider } from './context/AuraContext.jsx'
import Layout from './components/Layout.jsx'
import PageLoadingFallback from './components/PageLoadingFallback.jsx'

// Lazy-loaded routes for optimal bundle chunking and instant initial load
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const NewEvent = lazy(() => import('./pages/NewEvent.jsx'))
const PlanOverview = lazy(() => import('./pages/PlanOverview.jsx'))
const Vendors = lazy(() => import('./pages/Vendors.jsx'))
const Ambience = lazy(() => import('./pages/Ambience.jsx'))
const Schedule = lazy(() => import('./pages/Schedule.jsx'))
const Budget = lazy(() => import('./pages/Budget.jsx'))
const Concierge = lazy(() => import('./pages/Concierge.jsx'))
const SignIn = lazy(() => import('./pages/SignIn.jsx'))
const SignUp = lazy(() => import('./pages/SignUp.jsx'))

export default function App() {
  return (
    <AuraProvider>
      <Suspense fallback={<PageLoadingFallback />}>
        <Routes>
          {/* Auth pages have their own standalone view outside Layout */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new-event" element={<NewEvent />} />
            <Route path="/plan-overview" element={<PlanOverview />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/ambience-studio" element={<Ambience />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/concierge-support" element={<Concierge />} />
          </Route>
        </Routes>
      </Suspense>
    </AuraProvider>
  )
}

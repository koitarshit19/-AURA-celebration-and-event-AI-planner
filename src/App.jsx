import { lazy, Suspense, Component } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
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

/**
 * ErrorBoundary catches runtime and chunk-loading errors in child components,
 * preventing full-app crashes and providing an accessible recovery UI.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main
          role="alert"
          aria-live="assertive"
          className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-surface text-on-surface"
        >
          <h1 className="font-headline-sm text-headline-sm mb-2">
            Something went wrong loading this view
          </h1>
          <p className="font-body-sm text-on-surface-variant mb-4">
            Please refresh the page to restore your session.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-xl bg-primary text-on-primary font-label-caps cursor-pointer"
          >
            Reload Application
          </button>
        </main>
      )
    }
    return this.props.children
  }
}

/**
 * Root Application Component configuring global state, error boundaries, and route-level code splitting.
 */
export default function App() {
  return (
    <AuraProvider>
      <ErrorBoundary>
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
              {/* Fallback catch-all route for undefined paths */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </AuraProvider>
  )
}
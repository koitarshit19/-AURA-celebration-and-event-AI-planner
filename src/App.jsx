import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import NewEvent from './pages/NewEvent.jsx'
import PlanOverview from './pages/PlanOverview.jsx'
import Vendors from './pages/Vendors.jsx'
import Ambience from './pages/Ambience.jsx'
import Schedule from './pages/Schedule.jsx'
import Budget from './pages/Budget.jsx'
import Concierge from './pages/Concierge.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'

export default function App() {
  return (
    <Routes>
      {/* Auth pages have their own header/footer, so they sit outside Layout */}
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
  )
}

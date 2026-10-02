import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import SafetyMap from "./pages/SafetyMap";
import SafeJourney from "./pages/SafeJourney";
import Reviews from "./pages/Reviews";
import Emergency from "./pages/Emergency";
import ReportIncident from "./pages/ReportIncident";
import TrustedContacts from "./pages/TrustedContacts";
import ForgotPassword from "./pages/ForgotPassword";
import About from "./pages/About";
import Awareness from "./pages/Awareness";
import EvidenceLocker from "./pages/EvidenceLocker";
import CommunityReports from "./pages/CommunityReports";
import SafetyInsights from "./pages/SafetyInsights";
import JourneyHistory from "./pages/JourneyHistory";
import ProfileSettings from "./pages/ProfileSettings";
import Notifications from "./pages/Notifications";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminIncidents from "./pages/AdminIncidents";
import AdminEvidence from "./pages/AdminEvidence";
import AdminLocations from "./pages/AdminLocations";
import AdminAnalytics from "./pages/AdminAnalytics";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/awareness" element={<Awareness />} />

        {/* PROTECTED ROUTES — login required */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/safety-map" element={<ProtectedRoute><SafetyMap /></ProtectedRoute>} />
        <Route path="/safe-journey" element={<ProtectedRoute><SafeJourney /></ProtectedRoute>} />
        <Route path="/reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
        <Route path="/emergency" element={<ProtectedRoute><Emergency /></ProtectedRoute>} />
        <Route path="/report-incident" element={<ProtectedRoute><ReportIncident /></ProtectedRoute>} />
        <Route path="/trusted-contacts" element={<ProtectedRoute><TrustedContacts /></ProtectedRoute>} />
        <Route path="/evidence-locker" element={<ProtectedRoute><EvidenceLocker /></ProtectedRoute>} />
        <Route path="/community-reports" element={<ProtectedRoute><CommunityReports /></ProtectedRoute>} />
        <Route path="/safety-insights" element={<ProtectedRoute><SafetyInsights /></ProtectedRoute>} />
        <Route path="/journey-history" element={<ProtectedRoute><JourneyHistory /></ProtectedRoute>} />
        <Route path="/profile-settings" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />

        {/* ADMIN ROUTES — login required (basic protection; admin-only check can be added later) */}
        <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
        <Route path="/admin/incidents" element={<ProtectedRoute><AdminIncidents /></ProtectedRoute>} />
        <Route path="/admin/evidence" element={<ProtectedRoute><AdminEvidence /></ProtectedRoute>} />
        <Route path="/admin/locations" element={<ProtectedRoute><AdminLocations /></ProtectedRoute>} />
        <Route path="/admin/analytics" element={<ProtectedRoute><AdminAnalytics /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useStore } from './lib/store.jsx';
import { Shell } from './components/Shell.jsx';
import { SignUp, ConnectInstagram, ProfileSetup, PayoutSetup } from './screens/Onboarding.jsx';
import { BuilderHome, AddBlockSheet, ThemePicker } from './screens/Builder.jsx';
import { Storefront } from './screens/Storefront.jsx';
import { AutomationsList, AutomationEdit } from './screens/Automation.jsx';
import { Insights, Settings } from './screens/Misc.jsx';

function Protected({ children }) {
  const { state } = useStore();
  return state.onboarded ? children : <Navigate to="/signup" replace />;
}

// Routes wrapped by the app Shell (sidebar + topbar + content).
function ShellRoute({ children, page }) {
  return (
    <Protected>
      <Shell page={page}>{children}</Shell>
    </Protected>
  );
}

export default function App() {
  const { state } = useStore();
  return (
    <Routes>
      <Route path="/" element={<Navigate to={state.onboarded ? '/builder' : '/signup'} replace />} />

      {/* Onboarding (also reachable later from Settings) */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/connect-instagram" element={<ConnectInstagram />} />
      <Route path="/profile" element={<ProfileSetup />} />
      <Route path="/payout" element={<PayoutSetup />} />

      {/* Builder */}
      <Route path="/builder" element={<ShellRoute page="builder"><BuilderHome /></ShellRoute>} />
      <Route path="/builder/add" element={<ShellRoute page="builder"><BuilderHome addOpen /></ShellRoute>} />
      <Route path="/builder/theme" element={<ShellRoute page="builder"><ThemePicker /></ShellRoute>} />

      {/* Auto-DM */}
      <Route path="/automations" element={<ShellRoute page="automations"><AutomationsList /></ShellRoute>} />
      <Route path="/automations/:id" element={<ShellRoute page="automations"><AutomationEdit /></ShellRoute>} />

      {/* Insights & Settings */}
      <Route path="/insights" element={<ShellRoute page="insights"><Insights /></ShellRoute>} />
      <Route path="/settings" element={<ShellRoute page="settings"><Settings /></ShellRoute>} />

      {/* Public storefront (buyer view) — no shell, lives on its own URL */}
      <Route path="/u/:username" element={<Storefront />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

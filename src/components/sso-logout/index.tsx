/**
 * SSO Logout Page — n0de.gg/sso/logout
 *
 * Loaded in a hidden iframe by the Enigma customer portal on global logout.
 * Signals all open N0DE tabs (localStorage + BroadcastChannel) then clears auth.
 */

import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { signalGlobalLogout } from '../../utils/globalLogoutSignal';

// Fire immediately when this chunk loads (iframe may be short-lived).
signalGlobalLogout();

export default function SsoLogout() {
  const { logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    signalGlobalLogout();
    logout();
  }, [logout]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="sso-logout">
      <p>Signed out</p>
      <style>{`
        .sso-logout {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000b1a;
          color: rgba(255, 255, 255, 0.5);
          font-family: 'Montserrat', 'Segoe UI', sans-serif;
          font-size: 0.875rem;
          margin: 0;
        }
      `}</style>
    </div>
  );
}

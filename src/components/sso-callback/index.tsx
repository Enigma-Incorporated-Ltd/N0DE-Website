/**
 * SSO Callback Page — /sso/callback
 *
 * Called by enigmanet.ai portal after the user clicks "Open N0DE".
 * Accepts params from either:
 *   - query string:  ?code=...&state=...&verifier=...
 *   - hash fragment: #code=...&state=...&verifier=...
 */

import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ?? '';
const API_KEY = (import.meta.env.VITE_API_KEY as string | undefined) ?? '';
const CLIENT_ID = 'n0de';
const REDIRECT_URI = (import.meta.env.VITE_SSO_CALLBACK_URL as string | undefined)
  ?? `${window.location.origin}/sso/callback`;

let ssoCallbackStarted = false;

function getCallbackParams(): URLSearchParams {
  const fromQuery = new URLSearchParams(window.location.search);
  if (fromQuery.get('code') && fromQuery.get('state')) {
    return fromQuery;
  }

  const fromHash = new URLSearchParams(window.location.hash.slice(1));
  return fromHash;
}

function SsoCallback() {
  const navigate = useNavigate();
  const { updateUserData, login: contextLogin, isAuthenticated } = useContext(AuthContext);
  const [statusMessage, setStatusMessage] = useState('Completing sign-in…');
  const [redirectUserId, setRedirectUserId] = useState<string | null>(null);

  const loginRedirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (redirectUserId && isAuthenticated) {
      navigate('/user-dashboard', { replace: true, state: { userId: redirectUserId } });
    }
  }, [isAuthenticated, redirectUserId, navigate]);

  useEffect(() => {
    if (ssoCallbackStarted) {
      return;
    }

    const params = getCallbackParams();
    if (!params.get('code') || !params.get('state')) {
      setStatusMessage('Invalid callback. Redirecting to login…');
      loginRedirectTimer.current = setTimeout(() => navigate('/login', { replace: true }), 1500);
      return;
    }

    ssoCallbackStarted = true;
    void handleCallback(params);

    return () => {
      if (loginRedirectTimer.current) {
        clearTimeout(loginRedirectTimer.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCallback(params: URLSearchParams) {
    const code = params.get('code');
    const state = params.get('state');
    const verifier = params.get('verifier');

    // Drop secrets from the address bar before the token exchange.
    window.history.replaceState(null, '', window.location.pathname);

    if (!code || !state) {
      setStatusMessage('Invalid callback. Redirecting to login…');
      loginRedirectTimer.current = setTimeout(() => navigate('/login', { replace: true }), 1500);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/sso/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          APIKey: API_KEY,
        },
        body: JSON.stringify({
          clientId: CLIENT_ID,
          code,
          redirectUri: REDIRECT_URI,
          codeVerifier: verifier ?? undefined,
          state,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({})) as { message?: string };
        setStatusMessage(err.message ?? 'Sign-in failed. Redirecting to login…');
        loginRedirectTimer.current = setTimeout(() => navigate('/login', { replace: true }), 2000);
        return;
      }

      const data = await response.json() as {
        token: string;
        refreshToken: string;
        userId: string;
        email: string;
        isRootUser?: boolean;
      };

      updateUserData({
        id: data.userId,
        email: data.email,
        token: data.token,
        refreshToken: data.refreshToken,
        isRootUser: data.isRootUser ?? false,
      });
      contextLogin(data.userId);
      setRedirectUserId(data.userId);
    } catch {
      setStatusMessage('Connection error. Redirecting to login…');
      loginRedirectTimer.current = setTimeout(() => navigate('/login', { replace: true }), 2000);
    }
  }

  return (
    <div className="sso-callback">
      <div className="sso-callback__panel">
        <p className="sso-callback__brand">NODE</p>
        <div className="sso-callback__spinner" aria-hidden="true" />
        <p className="sso-callback__message">{statusMessage}</p>
      </div>
      <style>{`
        .sso-callback {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(ellipse at 50% 0%, #00254a 0%, #000b1a 70%);
          font-family: 'Montserrat', 'Segoe UI', sans-serif;
          color: #fff;
          padding: 2rem;
        }
        .sso-callback__panel {
          text-align: center;
          max-width: 360px;
        }
        .sso-callback__brand {
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: rgba(42, 222, 255, 0.85);
          margin: 0 0 2rem;
        }
        .sso-callback__spinner {
          width: 44px;
          height: 44px;
          border: 3px solid rgba(42, 222, 255, 0.2);
          border-top-color: #2adeff;
          border-radius: 50%;
          animation: sso-callback-spin 0.7s linear infinite;
          margin: 0 auto 1.25rem;
        }
        @keyframes sso-callback-spin { to { transform: rotate(360deg); } }
        .sso-callback__message {
          font-size: 0.9375rem;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}

export default SsoCallback;

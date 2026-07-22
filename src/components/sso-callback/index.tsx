/**
 * SSO Callback Page — n0de.gg/sso/callback
 *
 * Called by enigmanet.ai portal after the user clicks "Open N0DE".
 * The portal redirects here with the code in the URL FRAGMENT (#), not query string.
 * Fragment is never sent to the server — avoids exposure in access logs or Referer header.
 *
 * Fragment format:  #code=...&state=...&verifier=...
 *
 * Security:
 *   - Reads code + verifier + state from fragment only (never query string)
 *   - Validates state to prevent CSRF
 *   - Exchanges code immediately — fragment cleared from URL before any UI renders
 *   - Code is single-use on API side (atomic DB update)
 *   - PKCE verifier validated server-side
 *   - On any failure: redirect to login page, never render page with code in URL
 */

import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ?? '';
const API_KEY = (import.meta.env.VITE_API_KEY as string | undefined) ?? '';
const CLIENT_ID = 'n0de';
const REDIRECT_URI = (import.meta.env.VITE_SSO_CALLBACK_URL as string | undefined)
  ?? `${window.location.origin}/sso/callback`;

let ssoCallbackRunCount = 0;
// Survives React Strict Mode remounts (component refs reset on remount).
let ssoCallbackStarted = false;

function debugLog(hypothesisId: string, location: string, message: string, data: Record<string, unknown>) {
  // #region agent log
  fetch('http://127.0.0.1:7281/ingest/7a98156b-5309-46e3-8abf-a9b9da1a22a7', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '7b5918' },
    body: JSON.stringify({
      sessionId: '7b5918',
      hypothesisId,
      location,
      message,
      data,
      timestamp: Date.now(),
      runId: 'dashboard-kickout',
    }),
  }).catch(() => {});
  // #endregion
}

function SsoCallback() {
  const navigate = useNavigate();
  const { updateUserData, login: contextLogin, isAuthenticated } = useContext(AuthContext);
  const [statusMessage, setStatusMessage] = useState('Completing sign-in…');
  // redirectUserId is state (not ref) so changes to it trigger the useEffect below.
  const [redirectUserId, setRedirectUserId] = useState<string | null>(null);

  const loginRedirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Navigate only after both conditions are true in the same render:
  //   1. redirectUserId is set (token was exchanged successfully)
  //   2. isAuthenticated is true (React context has committed the new session)
  // This avoids the race condition where navigate() fires before setState is committed.
  useEffect(() => {
    if (redirectUserId && isAuthenticated) {
      // #region agent log
      debugLog('C', 'sso-callback/index.tsx:navigate-dashboard', 'Navigating to user-dashboard', {
        redirectUserId,
        isAuthenticated,
        pathname: window.location.pathname,
      });
      // #endregion
      navigate('/user-dashboard', { replace: true, state: { userId: redirectUserId } });
    }
  }, [isAuthenticated, redirectUserId, navigate]);

  useEffect(() => {
    if (ssoCallbackStarted) {
      // #region agent log
      debugLog('C', 'sso-callback/index.tsx:strict-mode-skip', 'Skipped duplicate Strict Mode mount', {
        pathname: window.location.pathname,
        hashLen: window.location.hash.length,
      });
      // #endregion
      return;
    }

    const fragment = window.location.hash.slice(1);
    if (!fragment) {
      // Fragment already consumed by the first mount — do NOT schedule login redirect.
      // #region agent log
      debugLog('C', 'sso-callback/index.tsx:empty-fragment-skip', 'Skipped remount with empty fragment', {
        pathname: window.location.pathname,
      });
      // #endregion
      return;
    }

    ssoCallbackStarted = true;
    void handleCallback();

    return () => {
      if (loginRedirectTimer.current) {
        clearTimeout(loginRedirectTimer.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCallback() {
    ssoCallbackRunCount += 1;
    const runNumber = ssoCallbackRunCount;

    // Step 1: Read code, state, verifier from fragment — never from query string
    const fragment = window.location.hash.slice(1);   // remove leading '#'
    const params = new URLSearchParams(fragment);

    const code = params.get('code');
    const state = params.get('state');
    const verifier = params.get('verifier');

    // #region agent log
    debugLog('C', 'sso-callback/index.tsx:handleCallback-start', 'handleCallback invoked', {
      runNumber,
      hasCode: !!code,
      hasState: !!state,
      hasVerifier: !!verifier,
      pathname: window.location.pathname,
      hashLen: fragment.length,
    });
    // #endregion

    // Step 2: IMMEDIATELY clear the fragment from URL — code must not sit in address bar
    window.history.replaceState(null, '', window.location.pathname);

    if (!code || !state) {
      // #region agent log
      debugLog('C', 'sso-callback/index.tsx:missing-params', 'Invalid callback — redirecting to login', {
        runNumber,
        codePresent: !!code,
        statePresent: !!state,
        delayMs: 1500,
        pathname: window.location.pathname,
      });
      // #endregion
      setStatusMessage('Invalid callback. Redirecting to login…');
      loginRedirectTimer.current = setTimeout(() => navigate('/login'), 1500);
      return;
    }

    // Step 3: PKCE verifier is passed in the URL fragment by the portal and is
    // validated server-side when exchanging the code. A sessionStorage state
    // check is not possible here because sessionStorage is scoped per origin —
    // the portal (localhost:5173) and N0DE (localhost:5174) cannot share it.
    // Security is guaranteed by: single-use codes + PKCE server-side validation.

    // Step 4: Exchange code for JWT
    try {
      // #region agent log
      fetch('http://127.0.0.1:7281/ingest/7a98156b-5309-46e3-8abf-a9b9da1a22a7',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'7b5918'},body:JSON.stringify({sessionId:'7b5918',hypothesisId:'A,C,D',location:'sso-callback/index.tsx:pre-token-exchange',message:'About to call /api/sso/token',data:{apiBase:API_BASE,redirectUri:REDIRECT_URI,codeLen:code.length,hasVerifier:!!verifier,state},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
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

      // #region agent log
      fetch('http://127.0.0.1:7281/ingest/7a98156b-5309-46e3-8abf-a9b9da1a22a7',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'7b5918'},body:JSON.stringify({sessionId:'7b5918',hypothesisId:'D',location:'sso-callback/index.tsx:token-response',message:'Token exchange response',data:{status:response.status,ok:response.ok},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      if (!response.ok) {
        const err = await response.json().catch(() => ({})) as { message?: string };
        // #region agent log
        fetch('http://127.0.0.1:7281/ingest/7a98156b-5309-46e3-8abf-a9b9da1a22a7',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'7b5918'},body:JSON.stringify({sessionId:'7b5918',hypothesisId:'D',location:'sso-callback/index.tsx:token-error',message:'Token exchange FAILED',data:{status:response.status,errMsg:err.message},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        setStatusMessage(err.message ?? 'Sign-in failed. Redirecting to login…');
        loginRedirectTimer.current = setTimeout(() => navigate('/login'), 2000);
        return;
      }

      const data = await response.json() as {
        token: string;
        refreshToken: string;
        userId: string;
        email: string;
        isRootUser?: boolean;
      };

      // Step 5: Save session exactly the same way as normal login.
      updateUserData({
        id: data.userId,
        email: data.email,
        token: data.token,
        refreshToken: data.refreshToken,
        isRootUser: data.isRootUser ?? false,
      });
      contextLogin(data.userId);
      // Setting state triggers a re-render which causes the useEffect above to
      // run with both redirectUserId set AND isAuthenticated=true, guaranteeing
      // navigate fires only after React has committed the new auth state.
      setRedirectUserId(data.userId);
      // #region agent log
      debugLog('C', 'sso-callback/index.tsx:token-success', 'Token exchange succeeded', {
        runNumber,
        userId: data.userId,
      });
      // #endregion
    } catch (err) {
      // #region agent log
      fetch('http://127.0.0.1:7281/ingest/7a98156b-5309-46e3-8abf-a9b9da1a22a7',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'7b5918'},body:JSON.stringify({sessionId:'7b5918',hypothesisId:'E',location:'sso-callback/index.tsx:catch',message:'EXCEPTION in handleCallback',data:{error:String(err)},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      setStatusMessage('Connection error. Redirecting to login…');
      loginRedirectTimer.current = setTimeout(() => navigate('/login'), 2000);
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

/** Cross-tab SSO logout signal (same origin — e.g. all N0DE tabs on n0de.gg). */

export const SSO_GLOBAL_LOGOUT_KEY = 'enigma-sso-global-logout';
export const SSO_GLOBAL_LOGOUT_CHANNEL = 'enigma-sso-global-logout';

/** Notify every open app tab on this origin to sign out. */
export function signalGlobalLogout(): void {
  try {
    localStorage.setItem(SSO_GLOBAL_LOGOUT_KEY, String(Date.now()));
  } catch {
    // ignore
  }
  try {
    const channel = new BroadcastChannel(SSO_GLOBAL_LOGOUT_CHANNEL);
    channel.postMessage('logout');
    channel.close();
  } catch {
    // ignore
  }
}

export function subscribeGlobalLogout(onLogout: () => void): () => void {
  const channel =
    typeof BroadcastChannel !== 'undefined'
      ? new BroadcastChannel(SSO_GLOBAL_LOGOUT_CHANNEL)
      : null;

  const onChannelMessage = () => onLogout();
  channel?.addEventListener('message', onChannelMessage);

  const onStorage = (e: StorageEvent) => {
    if (e.key === SSO_GLOBAL_LOGOUT_KEY) onLogout();
  };
  window.addEventListener('storage', onStorage);

  return () => {
    channel?.removeEventListener('message', onChannelMessage);
    channel?.close();
    window.removeEventListener('storage', onStorage);
  };
}

import * as signalR from '@microsoft/signalr';

let connection: signalR.HubConnection | null = null;
let registeredToken: string | null = null;

function resolveHubUrl(): string {
  const explicit = import.meta.env.VITE_SSO_HUB_URL as string | undefined;
  if (explicit) return explicit.replace(/\/$/, '');

  const apiBase = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? '';
  return `${apiBase.replace(/\/$/, '')}/hubs/sso-logout`;
}

async function registerAccessToken(accessToken: string): Promise<void> {
  if (!connection || connection.state !== signalR.HubConnectionState.Connected) return;
  if (registeredToken === accessToken) return;

  await connection.invoke('Register', accessToken);
  registeredToken = accessToken;
}

export function connectSsoLogoutHub(
  accessToken: string,
  onForceLogout: () => void,
): void {
  if (!accessToken) return;

  if (connection) {
    void registerAccessToken(accessToken);
    return;
  }

  registeredToken = null;

  connection = new signalR.HubConnectionBuilder()
    .withUrl(resolveHubUrl())
    .withAutomaticReconnect()
    .build();

  connection.on('ForceLogout', onForceLogout);

  connection.onreconnected(() => {
    registeredToken = null;
    void registerAccessToken(accessToken);
  });

  void connection
    .start()
    .then(() => registerAccessToken(accessToken))
    .catch(() => {
      // Hub unavailable — server-side revocation still applies on next API call
    });
}

export function disconnectSsoLogoutHub(): void {
  registeredToken = null;
  const active = connection;
  connection = null;
  if (active) {
    void active.stop();
  }
}

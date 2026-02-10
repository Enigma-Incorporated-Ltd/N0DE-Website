/**
 * MSAL (Microsoft Authentication Library) Configuration
 * 
 * This configuration is used for Microsoft login integration.
 * Make sure to set up the environment variables in your .env file.
 * 
 * Azure App Registration Setup:
 * 1. Create two app registrations in Azure AD:
 *    - SPA app (for React frontend)
 *    - API app (for .NET backend)
 * 2. Configure the SPA app:
 *    - Platform: Single Page Application
 *    - Redirect URI: http://localhost:5173 (for dev)
 *    - Enable Access tokens and ID tokens
 *    - Add API permission: api://<API_CLIENT_ID>/access_as_user
 * 3. Use the SPA app's Client ID as VITE_AZURE_CLIENT_ID
 */

import { Configuration, LogLevel, PopupRequest } from '@azure/msal-browser';

// MSAL Configuration
export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID || '',
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID || 'common'}`,
    redirectUri: import.meta.env.VITE_AZURE_REDIRECT_URI || window.location.origin,
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where your cache will be stored
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

// Scopes for login request
export const loginRequest: PopupRequest = {
  scopes: [import.meta.env.VITE_AZURE_API_SCOPE || 'openid', 'profile', 'email'],
};

// Check if MSAL is properly configured
export const isMsalConfigured = (): boolean => {
  return !!(
    import.meta.env.VITE_AZURE_CLIENT_ID &&
    import.meta.env.VITE_AZURE_TENANT_ID &&
    import.meta.env.VITE_AZURE_API_SCOPE
  );
};

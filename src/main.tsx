import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PublicClientApplication, EventType } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'

import App from './App.js'
import { msalConfig, isMsalConfigured } from './config/authConfig'
// import "./styles/tailwind.css"
import './styles/index.css' 

// Initialize MSAL instance
// Only create MSAL instance if properly configured
let msalInstance: PublicClientApplication | undefined;

if (isMsalConfigured()) {
  try {
    msalInstance = new PublicClientApplication(msalConfig);
    
    // Initialize and handle any pending redirects
    msalInstance.initialize().then(() => {
      // Handle redirect promise to complete any pending login flows
      msalInstance!.handleRedirectPromise().then((response) => {
        if (response !== null) {
          // User just came back from redirect, set active account
          msalInstance!.setActiveAccount(response.account);
        } else {
          // Check if there are already accounts signed in
          const accounts = msalInstance!.getAllAccounts();
          if (accounts.length > 0) {
            msalInstance!.setActiveAccount(accounts[0]);
          }
        }
      }).catch((error) => {
        console.error('Error handling redirect:', error);
      });

      // Listen for login events
      msalInstance!.addEventCallback((event) => {
        if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
          const payload = event.payload as any;
          const account = payload.account;
          msalInstance!.setActiveAccount(account);
        }
      });
    });
  } catch (error) {
    console.warn('MSAL initialization failed. Microsoft login will be disabled.', error);
    msalInstance = undefined;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {msalInstance ? (
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    ) : (
    <App />
    )}
  </StrictMode>,
)

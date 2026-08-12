# Feasibility Study: Login & Registration API Setup (N0DE)

**Document purpose:** Enable replication of the N0DE authentication flow in another project using **API calls only (curl)**.  
**Backend:** ASP.NET Core API (Enigma Inc platform)  
**Frontend reference:** N0DE React app (`src/services/Account.ts`, `src/services/MicrosoftAuth.ts`, `src/services/Node.ts`)

---

## 1. Executive Summary

| Item | Finding |
|------|---------|
| **Feasibility** | **High** — Email/password login, registration, password reset, and token refresh are standard REST POST endpoints callable via curl. |
| **Backend dependency** | Shared multi-tenant API; each app is scoped by `applicationid` + `APIKey`. |
| **Auth model** | Two layers: (1) `APIKey` header on every request, (2) `Authorization: Bearer <JWT>` on protected routes after login. |
| **Microsoft SSO** | **Partial via curl** — Requires a Microsoft access/ID token from Azure AD (browser/MSAL). Backend exchange endpoint is curl-friendly once you have that token. |
| **Client-only features** | CAPTCHA on login/register is **frontend-only**; not validated by the API. |

---

## 2. Architecture Overview

```
┌─────────────┐     APIKey header        ┌──────────────────────────┐
│  Your App   │ ───────────────────────► │  Enigma ASP.NET API      │
│  (curl/UI)  │     + JSON body          │  (Azure App Service)     │
└─────────────┘                          └──────────────────────────┘
       │                                              │
       │  Login / Register / Forgot Password          │
       │  ─────────────────────────────────           │
       │  Returns: JWT + refreshToken + userid        │
       │                                              │
       │  Protected APIs                              │
       │  ─────────────                               │
       │  Authorization: Bearer <JWT>                 │
       │  APIKey: <key>                               │
       └──────────────────────────────────────────────┘
```

### Authentication layers

| Layer | Header | When required |
|-------|--------|---------------|
| Application API key | `APIKey: <your-api-key>` | **Every** request |
| User JWT | `Authorization: Bearer <token>` | After login, for user-specific endpoints |

---

## 3. Configuration (Required for Any Project)

Set these environment variables in your new project (same values only if registering under the **same application tenant**):

| Variable | Description | N0DE example |
|----------|-------------|--------------|
| `VITE_API_BASE_URL` | API base URL (trailing slash optional) | `https://enigmaincenterpriseapp.azurewebsites.net/` |
| `VITE_APPLICATION_ID` | GUID — scopes users to your app | `3FC61D34-A023-4974-AB02-1274D2061897` |
| `VITE_API_KEY` | Application API key | *(issued by backend team)* |

**Environments (from N0DE codebase):**

| Environment | Base URL |
|-------------|----------|
| Local dev (Vite proxy) | `http://localhost:5173/api/...` → proxied to Azure |
| Dev | `https://enigmaincappdev.azurewebsites.net/` |
| Production | `https://enigmaincenterpriseapp.azurewebsites.net/` |

**curl variables (set once in terminal):**

```bash
export API_BASE="https://enigmaincenterpriseapp.azurewebsites.net"
export API_KEY="YOUR_API_KEY"
export APP_ID="3FC61D34-A023-4974-AB02-1274D2061897"
```

**PowerShell equivalent:**

```powershell
$API_BASE = "https://enigmaincenterpriseapp.azurewebsites.net"
$API_KEY = "YOUR_API_KEY"
$APP_ID = "3FC61D34-A023-4974-AB02-1274D2061897"
```

---

## 4. API Endpoints Reference

### 4.1 Register User

Creates a new user account. Does **not** return a JWT — user must login separately.

| Property | Value |
|----------|-------|
| **Method** | `POST` |
| **URL** | `{API_BASE}/api/users/RegisterUser` |
| **Auth** | `APIKey` only |

**Request body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "applicationid": "3FC61D34-A023-4974-AB02-1274D2061897",
  "firstname": "John",
  "lastname": "Doe",
  "businessname": ""
}
```

| Field | Required | Notes |
|-------|----------|-------|
| `email` | Yes | Valid email |
| `password` | Yes | Min 6 characters (frontend validation) |
| `applicationid` | Yes | Your app GUID |
| `firstname` | Optional | Used by N0DE registration form |
| `lastname` | Optional | Used by N0DE registration form |
| `businessname` | Optional | Not used in N0DE UI |

**Success response:**

```json
{
  "status": "Success",
  "userid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "IsRootUser": false
}
```

**Error responses (status field):**

| `status` value | Meaning |
|----------------|---------|
| `"User Already Exists"` | Email already registered for this application |
| Other string | Error message from server |

**curl:**

```bash
curl -X POST "$API_BASE/api/users/RegisterUser" \
  -H "Content-Type: application/json" \
  -H "APIKey: $API_KEY" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123",
    "applicationid": "'"$APP_ID"'",
    "firstname": "John",
    "lastname": "Doe"
  }'
```

---

### 4.2 Login (Email / Password)

| Property | Value |
|----------|-------|
| **Method** | `POST` |
| **URL** | `{API_BASE}/api/users/login` |
| **Auth** | `APIKey` only |

**Request body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "applicationid": "3FC61D34-A023-4974-AB02-1274D2061897"
}
```

**Success response (typical):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "userid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "email": "user@example.com",
  "isRootUser": false
}
```

**Store for later calls:**

```bash
export JWT="<token from response>"
export REFRESH_TOKEN="<refreshToken from response>"
export USER_ID="<userid from response>"
export USER_EMAIL="<email from response>"
```

**curl:**

```bash
curl -X POST "$API_BASE/api/users/login" \
  -H "Content-Type: application/json" \
  -H "APIKey: $API_KEY" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123",
    "applicationid": "'"$APP_ID"'"
  }'
```

---

### 4.3 Login (Microsoft SSO)

Exchanges a Microsoft Azure AD token for an application JWT.

| Property | Value |
|----------|-------|
| **Method** | `POST` |
| **URL** | `{API_BASE}/api/auth/microsoft` |
| **Auth** | `APIKey` only |

**Request body (PascalCase — as sent by N0DE):**

```json
{
  "AccessToken": "<microsoft-access-token>",
  "IdToken": "<microsoft-id-token>",
  "ApplicationId": "3FC61D34-A023-4974-AB02-1274D2061897"
}
```

**Success response:**

```json
{
  "status": "Success",
  "userid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "email": "user@microsoft.com",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "isRootUser": false
}
```

**curl (once you have a Microsoft token):**

```bash
curl -X POST "$API_BASE/api/auth/microsoft" \
  -H "Content-Type: application/json" \
  -H "APIKey: $API_KEY" \
  -d '{
    "AccessToken": "'"$MS_ACCESS_TOKEN"'",
    "IdToken": "'"$MS_ID_TOKEN"'",
    "ApplicationId": "'"$APP_ID"'"
  }'
```

**Note:** Obtaining `MS_ACCESS_TOKEN` / `MS_ID_TOKEN` requires Azure AD (MSAL) in a browser or OAuth device flow — not achievable with curl alone without a pre-obtained token.

**Azure config (N0DE):**

| Variable | Purpose |
|----------|---------|
| `VITE_AZURE_CLIENT_ID` | SPA app registration client ID |
| `VITE_AZURE_TENANT_ID` | `common` (multi-tenant) |
| `VITE_AZURE_REDIRECT_URI` | e.g. `https://n0de.gg` |
| `VITE_AZURE_API_SCOPE` | e.g. `api://<client-id>/access_as_user` |

---

### 4.4 Refresh Token

Issues a new JWT when the current one expires (401 on protected routes).

| Property | Value |
|----------|-------|
| **Method** | `POST` |
| **URL** | `{API_BASE}/api/users/refresh-token` |
| **Auth** | `APIKey` only |

**Request body:**

```json
{
  "userId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "email": "user@example.com",
  "applicationId": "3FC61D34-A023-4974-AB02-1274D2061897",
  "refreshToken": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

**Success response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "new-or-same-refresh-token"
}
```

*(Response may use `accessToken` instead of `token` — N0DE client handles both.)*

**curl:**

```bash
curl -X POST "$API_BASE/api/users/refresh-token" \
  -H "Content-Type: application/json" \
  -H "APIKey: $API_KEY" \
  -d '{
    "userId": "'"$USER_ID"'",
    "email": "'"$USER_EMAIL"'",
    "applicationId": "'"$APP_ID"'",
    "refreshToken": "'"$REFRESH_TOKEN"'"
  }'
```

---

### 4.5 Forgot Password (3-step flow)

#### Step 1 — Request reset code

| Property | Value |
|----------|-------|
| **Method** | `POST` |
| **URL** | `{API_BASE}/api/Users/forgotpassword` |
| **Auth** | `APIKey` only |

**Request body:**

```json
{
  "email": "user@example.com",
  "applicationid": "3FC61D34-A023-4974-AB02-1274D2061897"
}
```

**curl:**

```bash
curl -X POST "$API_BASE/api/Users/forgotpassword" \
  -H "Content-Type: application/json" \
  -H "APIKey: $API_KEY" \
  -d '{
    "email": "user@example.com",
    "applicationid": "'"$APP_ID"'"
  }'
```

#### Step 2 — Verify code

| Property | Value |
|----------|-------|
| **Method** | `POST` |
| **URL** | `{API_BASE}/api/Users/VerifyCode` |

**Request body:**

```json
{
  "verificationcode": "123456"
}
```

**curl:**

```bash
curl -X POST "$API_BASE/api/Users/VerifyCode" \
  -H "Content-Type: application/json" \
  -H "APIKey: $API_KEY" \
  -d '{"verificationcode": "123456"}'
```

#### Step 3 — Set new password

| Property | Value |
|----------|-------|
| **Method** | `POST` |
| **URL** | `{API_BASE}/api/Users/forgotpasswordupdate` |

**Request body:**

```json
{
  "verificationcode": "123456",
  "newpassword": "NewSecurePass123"
}
```

**curl:**

```bash
curl -X POST "$API_BASE/api/Users/forgotpasswordupdate" \
  -H "Content-Type: application/json" \
  -H "APIKey: $API_KEY" \
  -d '{
    "verificationcode": "123456",
    "newpassword": "NewSecurePass123"
  }'
```

**Expected `status` values:** `"Success"` or error string.

---

## 5. Protected API Example (After Login)

Most user-specific endpoints require **both** headers:

```bash
curl -X GET "$API_BASE/api/Node/userplan/$USER_ID" \
  -H "Content-Type: application/json" \
  -H "APIKey: $API_KEY" \
  -H "Authorization: Bearer $JWT"
```

N0DE calls these immediately after login:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/Node/userplan/{userId}` | GET | User subscription/plan |
| `/api/Node/isadmin/{userId}` | GET | Check admin role |
| `/api/Node/confirmpayment` | POST | Confirm Stripe payment status |

On **401**, N0DE automatically calls `/api/users/refresh-token` and retries.

---

## 6. End-to-End Flows

### 6.1 New user registration → login

```
RegisterUser  →  status: "Success"  →  login  →  store JWT + refreshToken
```

```bash
# 1. Register
curl -X POST "$API_BASE/api/users/RegisterUser" \
  -H "Content-Type: application/json" \
  -H "APIKey: $API_KEY" \
  -d '{"email":"new@example.com","password":"Pass1234","applicationid":"'"$APP_ID"'","firstname":"Jane","lastname":"Doe"}'

# 2. Login
curl -X POST "$API_BASE/api/users/login" \
  -H "Content-Type: application/json" \
  -H "APIKey: $API_KEY" \
  -d '{"email":"new@example.com","password":"Pass1234","applicationid":"'"$APP_ID"'"}'
```

### 6.2 Returning user session

```
login  →  JWT  →  call protected APIs  →  (401?) refresh-token  →  retry
```

### 6.3 Password reset

```
forgotpassword  →  email code  →  VerifyCode  →  forgotpasswordupdate  →  login
```

---

## 7. Replicating in Another Project — Checklist

### Backend / platform (request from Enigma team)

- [ ] New `APPLICATION_ID` (GUID) for your app **or** reuse N0DE's if same product
- [ ] `API_KEY` for your application
- [ ] Confirm API base URL (dev vs prod)
- [ ] (Optional) Azure AD app registration for Microsoft SSO

### Your new project (minimum)

- [ ] Store `API_BASE`, `API_KEY`, `APPLICATION_ID` securely (env vars / secrets)
- [ ] Implement register → login flow
- [ ] Persist `token`, `refreshToken`, `userid`, `email` (session/local storage)
- [ ] Attach `Authorization: Bearer` + `APIKey` on authenticated requests
- [ ] Implement token refresh on 401

### curl smoke test sequence

```bash
# Set vars → Register → Login → Call protected API → Refresh token
export API_BASE="https://enigmaincenterpriseapp.azurewebsites.net"
export API_KEY="YOUR_API_KEY"
export APP_ID="YOUR_APPLICATION_ID"

# Register + Login (see section 6.1)
# Then:
curl -X GET "$API_BASE/api/Node/userplan/$USER_ID" \
  -H "APIKey: $API_KEY" \
  -H "Authorization: Bearer $JWT"
```

---

## 8. Important Notes & Limitations

### Endpoint URL casing

The API uses **inconsistent casing**. Use exact paths:

| Endpoint | Casing |
|----------|--------|
| Login | `api/users/login` |
| Register | `api/users/RegisterUser` |
| Forgot password | `api/Users/forgotpassword` |
| Verify code | `api/Users/VerifyCode` |
| Microsoft auth | `api/auth/microsoft` |
| Refresh token | `api/users/refresh-token` |

### CAPTCHA

N0DE login/register forms include a client-side CAPTCHA (`src/components/ui/Captcha.tsx`). **The API does not validate CAPTCHA** — curl calls bypass it entirely.

### Multi-tenancy

Users are scoped by `applicationid`. The same email can exist across different applications with separate accounts.

### Security recommendations

- Never commit `API_KEY` or JWTs to source control
- Use HTTPS only in production
- Rotate API keys if exposed
- Store refresh tokens securely

### New application vs shared application

| Scenario | What you need |
|----------|---------------|
| Same product, new frontend | Reuse same `APPLICATION_ID` + `API_KEY` |
| New product / tenant | Request new `APPLICATION_ID` + `API_KEY` from backend team |

---

## 9. Source Code Reference (N0DE)

| File | Responsibility |
|------|------------------|
| `src/services/Account.ts` | Login, register, forgot password |
| `src/services/MicrosoftAuth.ts` | Microsoft token exchange |
| `src/services/Node.ts` | Token refresh, authenticated API calls |
| `src/context/AuthContext.tsx` | Session state (`sessionStorage`) |
| `src/utils/tokenStore.ts` | In-memory token bridge for services |
| `src/config/authConfig.ts` | Azure MSAL configuration |
| `vite.config.ts` | Dev proxy: `/api` → Azure backend |

---

## 10. Feasibility Conclusion

**Replicating login and registration in another project via curl is fully feasible** with three prerequisites:

1. Valid `API_KEY` and `APPLICATION_ID` from the Enigma backend team  
2. Correct API base URL for target environment  
3. Standard HTTP client handling of JWT + refresh token lifecycle  

Microsoft SSO is feasible for the **backend exchange step** via curl, but obtaining the Microsoft token still requires Azure AD OAuth (browser or dedicated OAuth flow).

**Estimated integration effort:** 1–2 days for email/password auth only; +1 day if Microsoft SSO and token refresh retry logic are included.

---

*Generated from N0DE codebase analysis — May 2026*

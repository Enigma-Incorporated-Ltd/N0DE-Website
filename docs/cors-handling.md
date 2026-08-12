# CORS Handling — N0DE Project

**Document purpose:** Explain how Cross-Origin Resource Sharing (CORS) is handled for the N0DE frontend and API, and how to replicate the same pattern in another project.

---

## 1. What Is CORS (Quick Summary)

CORS is a **browser security rule**. It blocks JavaScript on one origin (e.g. `https://n0de.gg`) from calling an API on another origin (e.g. `https://enigmaincenterpriseapp.azurewebsites.net`) unless the **API server** explicitly allows it.

| Client | CORS applies? |
|--------|---------------|
| Browser (React app) | **Yes** |
| curl / Postman / server-to-server | **No** |
| Mobile native apps | **No** (unless using WebView) |

N0DE does **not** configure CORS in the React codebase. CORS is either **avoided in development** (proxy) or **handled by the ASP.NET API** in production.

---

## 2. How N0DE Handles CORS

### Strategy overview

```
┌─────────────────────────────────────────────────────────────────┐
│  DEVELOPMENT (localhost:5173)                                   │
│  Browser → http://localhost:5173/api/users/login  (same origin) │
│           ↓ Vite proxy                                          │
│           → https://enigmaincapp.azurewebsites.net/api/...      │
│  Result: No browser CORS issue                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  PRODUCTION (https://n0de.gg)                                   │
│  Browser → https://enigmaincenterpriseapp.azurewebsites.net/... │
│           (cross-origin — different domain)                     │
│  Result: API must return Access-Control-* headers               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Development — Vite Dev Proxy (CORS Bypass)

### Configuration

File: `vite.config.ts`

```typescript
server: {
  proxy: {
    '/api': {
      target: 'https://enigmaincapp.azurewebsites.net',
      changeOrigin: true,
      secure: false,
    }
  }
}
```

### How it works

1. The React app calls **`/api/users/login`** (relative URL), not the full Azure URL.
2. The browser sends the request to **`http://localhost:5173`** — same origin as the SPA.
3. Vite forwards the request to the Azure API server-side.
4. The browser never talks directly to Azure → **no CORS preflight**.

### API base URL in dev

`Account.ts` sets the default base URL to `/` on localhost:

```typescript
const DEFAULT_API_BASE =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "/"
    : "https://enigmaincapp.azurewebsites.net/";
```

`Node.ts` defaults to `/` when `VITE_API_BASE_URL` is not set:

```typescript
const DEFAULT_API_BASE = '/';
```

**Effective dev URL:** `http://localhost:5173/api/users/login`

### `changeOrigin: true`

Sets the `Host` header on the proxied request to match the target server. Some APIs reject requests with a mismatched `Host` header.

### `secure: false`

Allows proxying to HTTPS targets with self-signed or invalid certificates (useful for local backend testing).

---

## 4. Production — Direct API Calls (Backend CORS Required)

### Configuration

File: `.env`

```env
VITE_API_BASE_URL=https://enigmaincenterpriseapp.azurewebsites.net/
```

When built and deployed, the frontend calls the API **directly**:

```
https://n0de.gg  →  fetch  →  https://enigmaincenterpriseapp.azurewebsites.net/api/users/login
```

This is a **cross-origin** request. The ASP.NET API must allow the frontend origin.

### Where CORS is configured (not in N0DE repo)

CORS is configured on the **backend** (ASP.NET Core), typically in `Program.cs` or `Startup.cs`:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
            "https://n0de.gg",
            "https://n0deggdev.azurewebsites.net",
            "http://localhost:5173"
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

app.UseCors("AllowFrontend");
```

> **Note:** Exact backend config is not in the N0DE frontend repo. Confirm allowed origins with the backend team (Adam / Enigma).

### Required response headers (from API)

For allowed origins, the API should return headers like:

```http
Access-Control-Allow-Origin: https://n0de.gg
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, APIKey, Authorization
```

For preflight `OPTIONS` requests, the API must respond with **200** and the same CORS headers before the browser sends the actual `POST`/`GET`.

---

## 5. Headers N0DE Sends (Relevant to CORS)

The browser may trigger a **preflight** `OPTIONS` request when custom headers are used.

| Header | Used on | CORS impact |
|--------|---------|-------------|
| `Content-Type: application/json` | All POST bodies | May trigger preflight |
| `APIKey: <key>` | All API calls | **Custom header — triggers preflight** |
| `Authorization: Bearer <jwt>` | Authenticated routes | **Custom header — triggers preflight** |

The backend CORS policy must allow `APIKey` and `Authorization` in `Access-Control-Allow-Headers`.

Example from `Account.ts`:

```typescript
headers: {
  "Content-Type": "application/json",
  APIKey: this.apiKey,
}
```

Authenticated calls (via `Node.ts` `fetchWithAuth`):

```typescript
headers: {
  'Content-Type': 'application/json',
  'APIKey': this.apiKey,
  'Authorization': `Bearer ${token}`,
}
```

---

## 6. Environment Matrix

| Environment | Frontend origin | API base URL | CORS handled by |
|-------------|-----------------|--------------|-----------------|
| Local dev | `http://localhost:5173` | `/` (relative) | Vite proxy — no CORS |
| Local dev + `.env` override | `http://localhost:5173` | `https://localhost:7013/` | Backend must allow `localhost:5173` |
| Dev Azure | `https://n0deggdev.azurewebsites.net` | `https://enigmaincappdev.azurewebsites.net/` | Backend CORS policy |
| Production | `https://n0de.gg` | `https://enigmaincenterpriseapp.azurewebsites.net/` | Backend CORS policy |

---

## 7. Third-Party Origins (Separate from Main API)

These are **not** proxied through Vite and have their own CORS rules:

| Service | Origin | Notes |
|---------|--------|-------|
| Microsoft login (Azure AD) | `login.microsoftonline.com` | MSAL popup/redirect — Microsoft handles CORS |
| Stripe | `js.stripe.com` | Stripe.js loaded via script tag |
| Roadmap API | `wqahqhe9dn.eu-west-3.awsapprunner.com` | Direct fetch — backend must allow N0DE origin if called from browser |
| Instagram embed | Meta CDN | Embed/iframes |

---

## 8. Common CORS Errors & Fixes

### Error in browser console

```
Access to fetch at 'https://enigmaincenterpriseapp.azurewebsites.net/api/users/login'
from origin 'https://n0de.gg' has been blocked by CORS policy
```

**Cause:** API does not include `https://n0de.gg` in allowed origins.

**Fix:** Add origin to ASP.NET CORS policy on the backend (not fixable from frontend only).

---

### Works in curl but fails in browser

**Cause:** curl ignores CORS; browsers enforce it.

**Fix:** Configure backend CORS or use dev proxy pattern.

---

### Works on localhost but fails in production

**Cause:** Dev uses Vite proxy (same origin). Production calls API directly.

**Fix:** Ensure production frontend URL is in backend `WithOrigins(...)`.

---

### Preflight OPTIONS returns 404 or 401

**Cause:** API does not handle `OPTIONS` or CORS middleware runs after auth middleware.

**Fix:** On backend, ensure `app.UseCors(...)` runs **before** authentication middleware.

---

## 9. Replicating in Another Project

### Option A — Development proxy (recommended, same as N0DE)

**Vite (`vite.config.ts`):**

```typescript
server: {
  proxy: {
    '/api': {
      target: 'https://your-api.azurewebsites.net',
      changeOrigin: true,
      secure: false,
    }
  }
}
```

**Use relative API URL in dev:**

```typescript
const API_BASE = import.meta.env.DEV ? '/' : import.meta.env.VITE_API_BASE_URL;
```

### Option B — Production backend CORS

Ask backend team to add your new frontend origin:

```
https://your-new-app.example.com
http://localhost:5173
```

### Option C — Same-origin deployment (no CORS)

Host frontend and API under one domain via reverse proxy:

```
https://app.example.com/      → SPA
https://app.example.com/api/  → ASP.NET API
```

N0DE does **not** use this pattern today — frontend and API are on separate Azure hosts.

---

## 10. curl / API Testing (No CORS)

When testing with curl (see `docs/login-registration-api-feasibility-study.md`), CORS does not apply:

```bash
curl -X POST "https://enigmaincenterpriseapp.azurewebsites.net/api/users/login" \
  -H "Content-Type: application/json" \
  -H "APIKey: YOUR_API_KEY" \
  -d '{"email":"user@example.com","password":"pass","applicationid":"YOUR_APP_ID"}'
```

If curl works but the browser fails → **CORS configuration issue on the API**.

---

## 11. Checklist for New Project

- [ ] **Dev:** Add Vite `/api` proxy pointing to backend
- [ ] **Dev:** Use relative base URL `/` or unset `VITE_API_BASE_URL`
- [ ] **Prod:** Set `VITE_API_BASE_URL` to full API URL
- [ ] **Backend:** Add frontend origin(s) to ASP.NET CORS policy
- [ ] **Backend:** Allow headers: `Content-Type`, `APIKey`, `Authorization`
- [ ] **Backend:** Place `UseCors()` before auth middleware
- [ ] **Verify:** Test login from browser on prod URL, not only curl

---

## 12. Source Files Reference

| File | CORS-related role |
|------|-------------------|
| `vite.config.ts` | Dev proxy — avoids CORS locally |
| `src/services/Account.ts` | API base URL logic (localhost → `/`) |
| `src/services/Node.ts` | Default `/` base for proxy; Bearer + APIKey headers |
| `src/services/MicrosoftAuth.ts` | Same API base pattern |
| `.env` | `VITE_API_BASE_URL` for production cross-origin calls |
| `public/web.config` | Azure SPA routing only — **no CORS config** |

---

## 13. Summary

| Layer | Who handles CORS |
|-------|-------------------|
| N0DE React app | Does **not** configure CORS |
| Vite dev server | **Avoids** CORS via proxy |
| ASP.NET API (Azure) | **Must allow** production/dev frontend origins |
| curl / Postman | CORS not applicable |

**Rule of thumb:** Frontend uses a proxy in dev; backend owns CORS in production. If you see CORS errors, fix the **API server**, not the React app.

---

*Generated from N0DE codebase analysis — May 2026*

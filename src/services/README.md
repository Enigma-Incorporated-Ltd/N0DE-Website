# Services

This folder contains modular service classes for handling API calls and business logic.

## Structure

- `Account.ts` - Authentication and user account management
- `index.ts` - Central export file for all services

## Usage

### Importing Services

```typescript
import { AccountService } from '../services';
```

### Account Service

The `AccountService` provides methods for user authentication:

#### Login
```typescript
const result = await AccountService.login({
  email: 'user@example.com',
  password: 'password123'
});

if (result.success) {
  // Handle successful login
  console.log(result.token);
  console.log(result.user);
} else {
  // Handle error
  console.error(result.message);
}
```

#### Logout
```typescript
AccountService.logout();
```

#### Check Authentication Status
```typescript
const isAuthenticated = AccountService.isAuthenticated();
```

#### Get Current User
```typescript
const currentUser = AccountService.getCurrentUser();
```

#### Store Authentication Data
```typescript
AccountService.storeAuthData(token, user, rememberMe);
```

## Environment Variables

The services use the following environment variables:

- `VITE_API_BASE_URL` - Base URL for API calls
- `VITE_APPLICATION_ID` - Application ID for API authentication
- `VITE_API_KEY` - API key for authentication

## Adding New Services

1. Create a new service file (e.g., `UserService.ts`)
2. Export the service from `index.ts`
3. Follow the same pattern as `AccountService` for consistency 
/**
 * In-memory token store.
 * Acts as a synchronous bridge so non-React service classes (NodeService,
 * AccountService, MicrosoftAuthService) can access auth data without
 * touching localStorage.  AuthContext is the single source of truth and
 * keeps this store in sync whenever state changes.
 */

export interface TokenStoreData {
  token: string | null;
  refreshToken: string | null;
  userId: string | null;
  email: string | null;
  isRootUser: boolean;
}

let store: TokenStoreData = {
  token: null,
  refreshToken: null,
  userId: null,
  email: null,
  isRootUser: false,
};

export const tokenStore = {
  get: (): TokenStoreData => ({ ...store }),

  set: (data: Partial<TokenStoreData>): void => {
    store = { ...store, ...data };
  },

  clear: (): void => {
    store = {
      token: null,
      refreshToken: null,
      userId: null,
      email: null,
      isRootUser: false,
    };
  },
};

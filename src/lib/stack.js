// Client-side Stack Auth app. One singleton — components import { stackApp }
// and call its hooks/methods directly so we keep auth state outside React
// context where the api.js fetch wrapper can reach it.

import { StackClientApp } from '@stackframe/react';

const PROJECT_ID = import.meta.env.VITE_STACK_PROJECT_ID;
const CLIENT_KEY = import.meta.env.VITE_STACK_PUBLISHABLE_CLIENT_KEY;

// Phase 1 setup: keys may not be present yet. Export null so the rest of the
// app can branch on it and fall back to the localStorage demo.
export const stackApp = PROJECT_ID && CLIENT_KEY
  ? new StackClientApp({
      projectId: PROJECT_ID,
      publishableClientKey: CLIENT_KEY,
      tokenStore: 'cookie',
      urls: {
        signIn: '/signup',
        signUp: '/signup',
        afterSignIn: '/builder',
        afterSignUp: '/builder',
        afterSignOut: '/signup',
      },
    })
  : null;

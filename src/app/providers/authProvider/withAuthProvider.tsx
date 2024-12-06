import { AuthProvider } from './authProvider.tsx';

export const withAuthProvider = (component: () => JSX.Element) => () => (
  <AuthProvider>{component()}</AuthProvider>
);

// import { createAuthClient } from "better-auth/client";
// const authClient = createAuthClient();

// const signIn = async () => {
//   const data = await authClient.signIn.social({
//     provider: "google",
//   });
// };

import { createAuthClient } from 'better-auth/client';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
});
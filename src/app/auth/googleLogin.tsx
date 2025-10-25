'use client';
import { authClient } from '@/lib/auth-client';

export default function GoogleLogin() {
  const handleGoogleLogin = async () => {
    try {
      console.log('Google login hit');
      await authClient.signIn.social({
        provider: 'google',
      });
      // Redirect happens automatically to Google
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  return (
    <form>
      <button type="button" onClick={handleGoogleLogin}>
        Google Login
      </button>
    </form>
  );
}
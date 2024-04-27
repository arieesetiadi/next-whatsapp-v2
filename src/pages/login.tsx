import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/apps/firebase';
import { RiGoogleLine } from '@remixicon/react';
import GuestGuard from '@/components/guards/guest-guard';

export default function LoginPage() {
  async function handleLogin() {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log({ result });
    } catch (error) {
      console.info(error);
    }
  }

  return (
    <GuestGuard>
      <div className="flex h-screen items-center justify-center">
        <button onClick={handleLogin} className="btn btn-ghost btn-lg">
          <RiGoogleLine /> Login with Google
        </button>
      </div>
    </GuestGuard>
  );
}

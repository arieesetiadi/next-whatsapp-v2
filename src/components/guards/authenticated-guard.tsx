import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/apps/firebase';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../loading';

type Props = {
  children: ReactNode;
};

export default function AuthenticatedGuard({ children }: Props) {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  async function updateUser() {
    // @ts-ignore
    await setDoc(doc(db, 'users', user?.uid), {
      email: user?.email,
      photoURL: user?.photoURL,
      lastSeen: serverTimestamp(),
    });
  }

  useEffect(() => {
    if (!user) {
      router.replace('/login');
      return;
    }

    updateUser();
  }, [user]);

  return loading ? <Loading /> : <>{children}</>;
}

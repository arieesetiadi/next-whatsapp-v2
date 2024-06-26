import { auth } from '@/apps/firebase';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../loading';

type Props = {
  children: ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user]);

  return loading ? <Loading /> : <>{children}</>;
}

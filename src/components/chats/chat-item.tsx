import { auth, usersCollectionRef } from '@/apps/firebase';
import { User } from 'firebase/auth';
import { query, where } from 'firebase/firestore';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

type Props = {
  id: string;
  userEmails: string[];
};

export default function ChatItem({ id, userEmails }: Props) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [user] = useAuthState(auth);
  const recipientEmail = userEmails.find((email) => email != user?.email);
  const [recipientSnapshot] = useCollection(query(usersCollectionRef, where('email', '==', recipientEmail)));
  const recipient = recipientSnapshot?.docs?.[0]?.data() as User;

  const isActiveChat = id == router.query.id;

  function enterChat() {
    router.push(`/chat/${id}`);
  }

  return (
    <button
      onClick={enterChat}
      className={`flex w-full items-center gap-4 rounded-lg py-4 hover:bg-gradient-to-r hover:from-transparent 
        ${theme == 'light' ? 'hover:to-stone-100' : 'hover:to-slate-800'}
        ${isActiveChat ? 'bg-gradient-to-r from-transparent to-stone-100' : ''}`}>
      <div className="avatar">
        <div className="w-10 rounded-full ring ring-primary ring-offset-1 ring-offset-base-100">
          <img src={recipient?.photoURL ?? 'https://cdn-icons-png.flaticon.com/512/552/552848.png'} />
        </div>
      </div>

      <h3>{recipientEmail}</h3>
    </button>
  );
}

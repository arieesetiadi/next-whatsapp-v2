import Head from 'next/head';
import AuthenticatedGuard from '@/components/guards/authenticated-guard';
import MainLayout from '@/components/layouts/main-layout';
import ChatScreen from '@/components/chats/chat-screen';
import { GetServerSidePropsContext } from 'next';
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { auth, db } from '@/apps/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = ctx.query.id as string;
  const chatDocRef = doc(db, 'chats', id);
  const messagesCollectionRef = collection(chatDocRef, 'messages');

  const chat = await getDoc(chatDocRef);
  const messages = await getDocs(query(messagesCollectionRef, orderBy('timestamp', 'asc')));

  return {
    props: { chat: chat.data(), messages: messages.docs },
  };
}

type Props = {
  chat: any;
  messages: any[];
};

export default function ChatPage({ chat, messages }: Props) {
  const [user] = useAuthState(auth);
  const recipientEmail = chat.users.find((email: string) => email != user?.email);

  return (
    <AuthenticatedGuard>
      <Head>
        <title>Chat with {recipientEmail}</title>
      </Head>

      <MainLayout>
        <ChatScreen chat={chat} messages={messages} />
      </MainLayout>
    </AuthenticatedGuard>
  );
}

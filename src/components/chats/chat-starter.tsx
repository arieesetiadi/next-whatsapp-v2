import { useState, useRef } from 'react';
import { auth, db } from '@/apps/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { addDoc, collection } from 'firebase/firestore';

export default function ChatStarter() {
  const chatCollectionRef = collection(db, 'chats');
  const closeModalButtonRef = useRef(null);

  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [user] = useAuthState(auth);
  const [chatCollection] = useCollection(chatCollectionRef);

  const handleStartChat = async (e: any) => {
    e.preventDefault();

    if (user?.email == email) {
      setError(`You can't chat with yourself`);
      return;
    }

    if (checkChatExistance(user?.email as string, email)) {
      setError(`You already have a chat with ${email}`);
      return;
    }

    await addDoc(chatCollectionRef, {
      users: [user?.email, email],
    });

    setEmail('');
    setError('');

    // @ts-ignore
    closeModalButtonRef?.current?.click();
  };

  const checkChatExistance = (userEmail: string, recipientEmail: string): boolean => {
    return !!chatCollection?.docs?.some(
      (chat) => chat.data().users.includes(userEmail) && chat.data().users.includes(recipientEmail),
    );
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-block"
        onClick={() =>
          // @ts-ignore
          document.getElementById('new-chat-prompt').showModal()
        }>
        Start a New Chat
      </button>

      <dialog id="new-chat-prompt" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Start a New Chat</h3>
          <p className="py-4">Enter your friend email address!</p>

          <form onSubmit={handleStartChat}>
            <div className="mb-4">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70">
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  className="grow"
                  placeholder="Email"
                  required
                />
              </label>

              {!!error && <span className="mt-1 block text-red-500">{error}</span>}
            </div>

            <button type="submit" className="btn">
              Start Chat
            </button>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button ref={closeModalButtonRef}>Close</button>
        </form>
      </dialog>
    </>
  );
}

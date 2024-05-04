import ChatStarter from './chats/chat-starter';
import ChatItem from './chats/chat-item';
import ThemeVariant from '@/enums/theme.enum';
import { useTheme } from 'next-themes';
import { signOut } from 'firebase/auth';
import { auth, chatsCollectionRef } from '@/apps/firebase';

import { RiMessage3Line, RiMenu3Line, RiSearch2Line, RiContrast2Line, RiSunLine } from '@remixicon/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function SideBar() {
  const { theme, setTheme } = useTheme();

  const [chatCollection] = useCollection(chatsCollectionRef);
  const [user] = useAuthState(auth);

  const userChats = chatCollection?.docs.filter((chat) => {
    return chat.data().users.includes(user?.email);
  });

  return (
    <div className="max-w-lg md:max-w-sm">
      <div className="flex items-center justify-between p-5">
        <div className="avatar gap-2">
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>

          <button
            onClick={() => setTheme(theme == ThemeVariant.LIGHT ? ThemeVariant.DARK : ThemeVariant.LIGHT)}
            className="btn btn-circle">
            {theme == ThemeVariant.LIGHT ? <RiContrast2Line /> : <RiSunLine />}
          </button>
        </div>

        <div className="flex gap-2">
          <button className="btn btn-circle">
            <RiMessage3Line />
          </button>

          <div className="dropdown dropdown-right">
            <button tabIndex={0} role="button" className="btn btn-circle">
              <RiMenu3Line />
            </button>
            <ul tabIndex={0} className="menu dropdown-content z-[1] ml-2 w-52 rounded-box bg-base-100 p-2 shadow">
              <li>
                <a onClick={async () => await signOut(auth)}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <form className="px-5 pt-3">
        <label className="input input-bordered flex items-center gap-3">
          <RiSearch2Line />
          <input type="text" className="grow" placeholder="Search in chats" />
        </label>
      </form>

      <div className="px-5 pt-3">
        <ChatStarter />
      </div>

      <div className="px-5 pt-3">
        {userChats?.map((chat) => <ChatItem key={chat.id} id={chat.id} userEmails={chat.data().users} />)}
      </div>
    </div>
  );
}

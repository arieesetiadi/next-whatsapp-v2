import ChatStarter from './chats/chat-starter';
import ChatItem from './chats/chat-item';
// import ThemeVariant from '@/enums/theme.enum';
import { useTheme } from 'next-themes';
import { signOut } from 'firebase/auth';
import { auth, chatsCollectionRef } from '@/apps/firebase';

import { RiMessage3Line, RiMenu3Line, RiSearch2Line, RiContrast2Line, RiSunLine } from '@remixicon/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function SideBar() {
  //   const { theme, setTheme } = useTheme();

  const [chatCollection] = useCollection(chatsCollectionRef);
  const [user] = useAuthState(auth);

  const userChats = chatCollection?.docs.filter((chat) => {
    return chat.data().users.includes(user?.email);
  });

  return (
    <>
      <div className="flex items-center justify-between p-5">
        <div className="dropdown dropdown-right">
          <div tabIndex={0} role="button" className="avatar btn-circle gap-2">
            <div className="w-12 rounded-full">
              <img src={user?.photoURL ?? 'https://cdn-icons-png.flaticon.com/512/552/552848.png'} />
            </div>

            {/* <button
                onClick={() => setTheme(theme == ThemeVariant.LIGHT ? ThemeVariant.DARK : ThemeVariant.LIGHT)}
                className="btn btn-circle">
                {theme == ThemeVariant.LIGHT ? <RiContrast2Line /> : <RiSunLine />}
            </button> */}
          </div>

          <ul tabIndex={0} className="menu dropdown-content z-[1] ml-2 w-36 rounded-box bg-base-100 p-2 shadow">
            <li>
              <a onClick={async () => await signOut(auth)}>Logout</a>
            </li>
          </ul>
        </div>

        <div className="flex gap-2">
          <button className="btn btn-circle">
            <RiMessage3Line />
          </button>

          <button className="btn btn-circle">
            <RiMenu3Line />
          </button>
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
    </>
  );
}

import { useTheme } from 'next-themes';

import {
  RiMessage3Line,
  RiMenu3Line,
  RiSearch2Line,
  RiContrast2Line,
  RiSunLine,
} from '@remixicon/react';

export default function SideBar() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-lg md:max-w-sm">
      <div className="flex items-center justify-between border-b border-b-slate-100 p-5">
        <div className="avatar gap-2">
          <div className="w-12 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>

          <button
            onClick={() => setTheme(theme == 'light' ? 'dark' : 'light')}
            className="btn btn-circle">
            {theme == 'light' ? <RiContrast2Line /> : <RiSunLine />}
          </button>
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

      <form className="px-5 pt-3">
        <button type="button" className="btn btn-block">
          Start a New Chat
        </button>
      </form>
    </div>
  );
}

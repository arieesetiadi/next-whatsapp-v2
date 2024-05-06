import { ReactNode } from 'react';
import SideBar from '../side-bar';

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="mx-auto flex max-w-screen-2xl">
      <div className="no-scrollbar h-screen overflow-y-scroll border">
        <SideBar />
      </div>

      <div>{children}</div>
    </div>
  );
}

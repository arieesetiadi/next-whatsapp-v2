import { ReactNode } from 'react';
import SideBar from '../side-bar';

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="mx-auto max-w-screen-2xl">
      <SideBar />
      {children}
    </div>
  );
}

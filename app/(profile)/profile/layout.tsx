import { ReactNode } from 'react';

import UserMenu from '@/components/auth/UserMenu';
import ProfileSidebar from '@/components/sidebar/ProfileSidebar';
import ThemeToggle from '@/components/ThemeToggle';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <ProfileSidebar />
      <main className='w-full'>
        <div className='border-border flex items-center justify-between border-b px-4 py-3.75'>
          <SidebarTrigger />
          <div className='flex items-center gap-4'>
            <UserMenu />
            <ThemeToggle />
          </div>
        </div>
        <div className='p-10'>{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default ProfileLayout;

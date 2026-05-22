import { ReactNode } from 'react';

import UserMenu from '@/components/auth/UserMenu';
import AdminSidebar from '@/components/sidebar/AdminSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className='w-full'>
        <div className='border-border flex items-center justify-between border-b px-4 py-3.75'>
          <SidebarTrigger />
          <UserMenu />
        </div>
        <div className='p-10'>{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;

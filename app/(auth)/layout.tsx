import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      {children}
    </div>
  );
};

export default AuthLayout;

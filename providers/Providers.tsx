import { ReactNode } from 'react';

import { ThemeProvider } from '@/providers/ThemeProvider';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};

export default Providers;

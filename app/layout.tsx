import { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Public_Sans, JetBrains_Mono } from 'next/font/google';

import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import Providers from '@/providers/Providers';

const jetbrainsMonoHeading = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-heading',
});

const publicSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Musicians Home',
  description: 'A place for musicians to get together and share ideas',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={cn(
        'h-full',
        'antialiased',
        'font-sans',
        publicSans.variable,
        jetbrainsMonoHeading.variable
      )}
      suppressHydrationWarning
    >
      <body
        className='min-h-full'
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}

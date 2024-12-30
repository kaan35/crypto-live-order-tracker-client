import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import React from 'react';
import { StoreProvider } from '@/app/StoreProvider';
import { Notification } from '@/app/features/notification/Notification';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  description: 'Live Order Book',
  title: 'Live Order Book',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-900`}>
          <Notification />
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}

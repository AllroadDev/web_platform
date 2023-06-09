'use client';

import './globals.css';
import { FC } from 'react';
import Navbar from './Navbar';
import { SessionProvider } from 'next-auth/react'

interface RootLayoutProps {
  children: React.ReactNode;
	session: any;
}

const RootLayout: FC<RootLayoutProps> = ({ children, session }) => {
  return (
    <html lang="en">
      <head>
        <title>Main</title>
      </head>
      <body className='bg-main-blue h-screen'>
				<SessionProvider session={session}>
        <Navbar />
        {children}
				</SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
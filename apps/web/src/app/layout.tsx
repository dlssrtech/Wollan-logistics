import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Homesphere Home Services & Business Network',
  description: 'Hyperlocal service marketplace and commerce ecosystem',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

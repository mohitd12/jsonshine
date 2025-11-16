import type { Metadata } from 'next';
import ThemeProvider from '@/providers/ThemeProvider';
import { ubuntu } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'JSONShine - Make Your JSON Shine ✨',
  description: 'Instantly Format, Prettify & Validate JSON',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ubuntu.variable} antialiased`}
      suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

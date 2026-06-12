import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: 'Ali Saber | Academic Portfolio',
  description: 'Personal academic portfolio of M. Ali Saber — MSc EEE, Tehran University',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-white text-deep-space antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

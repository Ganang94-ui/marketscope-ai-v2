import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'MarketScope AI — Marketplace Intelligence',
  description: 'Satu dashboard untuk riset produk dan analisis marketplace.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}

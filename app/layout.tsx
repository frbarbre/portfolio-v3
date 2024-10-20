import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { createClient, repositoryName } from '@/prismicio';
import { Inter } from 'next/font/google';
import './globals.css';
import { PrismicPreview } from '@prismicio/next';
import ScrollUp from '@/components/scroll-up';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();

  const navbar = await client.getSingle('navbar');
  const footer = await client.getSingle('footer');
  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <ScrollUp />
        <div className="mx-auto max-w-8xl overflow-x-hidden px-4 md:px-6 lg:px-8">
          <Navbar data={navbar} />
          <div className="flex flex-col gap-[96px] lg:gap-[156px]">
            {children}
            <Footer footer={footer} />
          </div>
          <PrismicPreview repositoryName={repositoryName} />
        </div>
      </body>
    </html>
  );
}

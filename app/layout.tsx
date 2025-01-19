import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import ScrollProvider from '@/components/scroll-provider';
import { createClient, repositoryName } from '@/prismicio';
import { PrismicPreview } from '@prismicio/next';
import { Inter } from 'next/font/google';
import './globals.css';
import Chat from '@/components/chat';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();

  const navbar = await client.getSingle('navbar');
  const footer = await client.getSingle('footer');
  const chat = await client.getSingle('chat');

  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <ScrollProvider>
          <div className="mx-auto max-w-8xl overflow-x-hidden px-4 md:px-6 lg:px-8">
            <Navbar data={navbar} />
            <div className="flex flex-col gap-[96px] lg:gap-[156px]">
              {children}
              <Footer footer={footer} />
            </div>

            {chat.data.enabled && (
              <div>
                <Chat data={chat} />
              </div>
            )}
            <PrismicPreview repositoryName={repositoryName} />
          </div>
        </ScrollProvider>
      </body>
    </html>
  );
}

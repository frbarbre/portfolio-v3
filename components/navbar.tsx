import { NavbarDocument } from '@/prismicio-types';
import { PrismicNextImage } from '@prismicio/next';
import Link from 'next/link';
import ThemeToggle from './theme-toggle';

export default function Navbar({ data }: { data: NavbarDocument<string> }) {
  return (
    <header className="flex items-center justify-between py-6">
      <Link href="/">
        <PrismicNextImage
          field={data.data.logo}
          className="relative z-10 w-[108px] object-contain transition-opacity hover:opacity-80 dark:invert"
        />
      </Link>
      {/* <ThemeToggle /> */}
    </header>
  );
}

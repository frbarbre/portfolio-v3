import { NavbarDocument } from "@/prismicio-types";
import { PrismicNextImage } from "@prismicio/next";
import ThemeToggle from "./theme-toggle";

export default function Navbar({ data }: { data: NavbarDocument<string> }) {
  return (
    <header className="py-6 flex justify-between items-center">
      <PrismicNextImage
        field={data.data.logo}
        className="dark:invert w-[108px] object-contain relative z-10"
      />

      <ThemeToggle />
    </header>
  );
}

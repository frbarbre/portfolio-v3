import HeroComponent from '@/components/hero';
import { splitDescription } from '@/utils/splitDescription';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = async ({ slice }: HeroProps): Promise<JSX.Element> => {
  const splitWords = slice.primary.icons.map((icon) => String(icon.split_word));

  const taglineArr = splitDescription(
    String(slice.primary.tagline),
    splitWords,
  );

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <HeroComponent slice={slice} taglineArr={taglineArr} />
    </section>
  );
};

export default Hero;

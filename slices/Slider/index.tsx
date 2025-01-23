import SliderComponent from '@/components/slider';
import { createClient } from '@/prismicio';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `Slider`.
 */
export type SliderProps = SliceComponentProps<Content.SliderSlice>;

/**
 * Component for "Slider" Slices.
 */
export default async function Slider({
  slice,
}: SliderProps): Promise<JSX.Element> {
  const client = createClient();

  const formattedItems = await Promise.all(
    slice.primary.items.map(async (item: any) => {
      const techData = await client.getByUID('tech', item.tech.uid);
      return {
        ...techData.data,
      };
    }),
  );

  return <SliderComponent slice={slice} formattedItems={formattedItems} />;
}

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `ProjectHero`.
 */
export type ProjectHeroProps = SliceComponentProps<Content.ProjectHeroSlice>;

/**
 * Component for "ProjectHero" Slices.
 */
const ProjectHero = ({ slice }: ProjectHeroProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="aspect-video w-full overflow-hidden rounded-md border border-border">
        <video
          autoPlay
          muted
          loop
          //@ts-ignore
          src={slice.primary.content.url}
        />
      </div>
    </section>
  );
};

export default ProjectHero;

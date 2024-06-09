"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Content } from "@prismicio/client";
import { PrismicImage, PrismicLink } from "@prismicio/react";
import { cn } from "@/lib/utils";

export default function Slider({ slice }: { slice: Content.SliderSlice }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 2000);
  }, [api, current]);

  return (
    <div className="relative w-full">
      <div className="bg-gradient-to-r pointer-events-none from-background via-white/0 to-background z-10 absolute left-0 top-0 right-0 bottom-0 w-full h-full"></div>
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {slice.primary.items?.map((item, index) => (
            <CarouselItem
              className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
              key={index}
            >
              <PrismicLink
                field={item.link}
                className="flex rounded-md aspect-square bg-muted items-center justify-center p-2"
              >
                <PrismicImage
                  field={item.logo}
                  className={cn(
                    "w-1/2 h-1/2 object-contain",
                    item.should_invert && "dark:invert"
                  )}
                />
              </PrismicLink>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

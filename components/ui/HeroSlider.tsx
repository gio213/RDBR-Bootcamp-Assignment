"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CTAButton } from "./Button";
import Link from "next/link";
import { HeroSliderType, sliderData } from "@/data/slider-data";

// NOTE: slider-data items must now have `image: string` as a URL/path,
// not a Tailwind bg-class. E.g.: image: "/images/slide-1.jpg"

interface HeroSliderProps {
  slides?: HeroSliderType[];
  autoPlayMs?: number;
  className?: string;
}

export function HeroSlider({
  slides = sliderData,
  autoPlayMs = 5000,
  className,
}: HeroSliderProps) {
  const [active, setActive] = useState(0);

  // React Compiler (React 19) memoizes this automatically — no useCallback needed
  const next = () => setActive((p) => (p + 1) % slides.length);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(next, autoPlayMs);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlayMs, slides.length]);

  const slide = slides[active];

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden rounded-2xl sm:rounded-[20px] lg:rounded-[30px]",
        className,
      )}
    >
      <div className="relative h-70 w-full sm:h-80 lg:h-69">
        {/* Background image */}
        <Image
          key={slide.image}
          src={slide.image}
          alt={slide.title}
          fill
          priority={active === 0}
          className="object-cover transition-opacity duration-700"
          sizes="(max-width: 1566px) 100vw, 1566px"
        />

        {/* Gradient scrim — stronger on left so text stays readable */}
        <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/25 to-transparent" />

        {/* Content */}
        <div className="relative flex h-70 flex-col justify-center gap-3 px-6 sm:h-80 sm:gap-4 sm:px-8 lg:h-69 lg:px-14">
          <h1 className="font-(family-name:--font-noto-sans) max-w-70 text-[22px] font-semibold leading-tight text-white sm:max-w-100 sm:text-[28px] lg:max-w-130 lg:text-[36px]">
            {slide.title}
          </h1>

          {slide.description && (
            <p className="max-w-65 text-[12px] leading-[1.6] text-white/80 sm:max-w-95 sm:text-[13px] lg:max-w-115 lg:text-[14px]">
              {slide.description}
            </p>
          )}

          <div>
            <Link href={slide.cta.href}>
              <CTAButton variant="primary">{slide.cta.label}</CTAButton>
            </Link>
          </div>
        </div>

        {/* Bottom controls row */}
        <div className="absolute bottom-3 flex w-full items-center justify-between px-6 sm:bottom-4 sm:px-8 lg:bottom-5 lg:px-14">
          {/* Dot indicators — centered */}
          <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === active
                    ? "h-2 w-7 bg-white"
                    : "h-2 w-7 bg-white/40 hover:bg-white/60",
                )}
              />
            ))}
          </div>

          {/* Prev / Next — bottom right */}
          <div className="ml-auto flex items-center gap-2">
            <ArrowButton
              direction="left"
              onClick={() =>
                setActive((p) => (p - 1 + slides.length) % slides.length)
              }
            />
            <ArrowButton direction="right" onClick={next} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "left" ? "Previous slide" : "Next slide"}
      className="flex size-9 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/15"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        {direction === "left" ? (
          <path
            d="M11 5L7 9l4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M7 5l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}

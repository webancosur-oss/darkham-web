"use client";

import {
  type CSSProperties,
  type ElementType,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type ScrollAnimationEffect =
  | "fade"
  | "scale"
  | "slide"
  | "color"
  | "rotate"
  | "custom";

type ScrollAnimationDirection =
  | "up"
  | "down"
  | "left"
  | "right";

type ScrollAnimationTriggerProps = {
  children: ReactNode;
  effect?: ScrollAnimationEffect;
  threshold?: number;
  delay?: number;
  duration?: number;
  direction?: ScrollAnimationDirection;
  once?: boolean;
  className?: string;
  as?: ElementType;
  fromColor?: string;
  toColor?: string;
  fromRotation?: number;
  toRotation?: number;
  fromScale?: number;
  toScale?: number;
};

export function ScrollAnimationTrigger({
  children,
  effect = "fade",
  threshold = 0.1,
  delay = 0,
  duration = 0.5,
  direction = "up",
  once = false,
  className = "",
  as: Component = "div",
  fromColor = "transparent",
  toColor = "currentColor",
  fromRotation = -10,
  toRotation = 0,
  fromScale = 0.8,
  toScale = 1,
}: ScrollAnimationTriggerProps) {
  const ref = useRef<HTMLElement | null>(null);

  const [isVisible, setIsVisible] =
    useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);

            if (once) {
              observer.disconnect();
            }
          } else if (!once) {
            setIsVisible(false);
          }
        },
        {
          threshold,
        },
      );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once, threshold]);

  const getTransform = (): string => {
    if (isVisible) {
      if (effect === "rotate") {
        return `rotate(${toRotation}deg) scale(${toScale})`;
      }

      if (effect === "scale") {
        return `scale(${toScale})`;
      }

      return "translate3d(0, 0, 0)";
    }

    if (effect === "scale") {
      return `scale(${fromScale})`;
    }

    if (effect === "rotate") {
      return `rotate(${fromRotation}deg) scale(${fromScale})`;
    }

    if (effect === "slide") {
      switch (direction) {
        case "down":
          return "translate3d(0, -50px, 0)";

        case "left":
          return "translate3d(50px, 0, 0)";

        case "right":
          return "translate3d(-50px, 0, 0)";

        case "up":
        default:
          return "translate3d(0, 50px, 0)";
      }
    }

    return "translate3d(0, 0, 0)";
  };

  const style: CSSProperties = {
    opacity:
      effect === "fade" && !isVisible
        ? 0
        : isVisible
          ? 1
          : 0,

    transform: getTransform(),

    color:
      effect === "color"
        ? isVisible
          ? toColor
          : fromColor
        : undefined,

    transition: `
      opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1),
      transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1),
      color ${duration}s cubic-bezier(0.22, 1, 0.36, 1)
    `,

    transitionDelay: `${delay}s`,
    willChange:
      "opacity, transform, color",
  };

  return (
    <Component
      ref={ref}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}
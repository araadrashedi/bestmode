import { cva } from "class-variance-authority"
import React from "react"

import { isEqual, noop } from "@/lib/utils"

type ImageProps = {
	alt: string
	dominantColorHex?: Maybe<string>
	src: string
	srcset: {
		thumb: string
		small: string
		medium: string
		large: string
	}
	variant?: "default" | "post" | "cover"
}

/**
 * Displays an image with responsive sizes and a variant-based style.
 *
 * ## Behavior:
 * - Renders an image with different sizes based on the `srcset` prop.
 * - Applies a loading strategy based on the image's visibility in the viewport.
 * - Adjusts the image appearance on image loading using the dominant color provided in the props.
 * - Supports different visual variants (default, post, cover) for styling.
 *
 * ### Example:
 * ```tsx
 * import { Image } from '@/lib/features/Image';
 *
 * function PostImage() {
 *   const imageProps = {
 *     alt: "A beautiful scenery",
 *     dominantColorHex: "#ffcc00",
 *     src: "https://example.com/image.jpg",
 *     srcset: {
 *       thumb: "https://example.com/image_thumb.jpg",
 *       small: "https://example.com/image_small.jpg",
 *       medium: "https://example.com/image_medium.jpg",
 *       large: "https://example.com/image_large.jpg",
 *     },
 *   };
 *
 *   return <Image {...imageProps} />;
 * }
 * ```
 *
 * @param {ImageProps} props - The properties for the image component.
 * @returns {JSX.Element} The rendered image element.
 */
export function Image(props: ImageProps) {
	const [isLoaded, setIsLoaded] = React.useState(false)

	const imageRef = React.useRef<React.ElementRef<"img">>(null)
	const [isImageInViewport, cancelObservation] = useInViewport(imageRef)
	const loading = useOnceDistinctiveChange(isImageInViewport ? "eager" : "lazy", cancelObservation)
	const priority = useOnceDistinctiveChange(isImageInViewport ? "high" : "low", cancelObservation)

	return (
		<img
			className={imageVariants({ variant: props.variant, isLoaded })}
			style={{ "--dominant-color": props.dominantColorHex ?? "hsl(var(--primary) / .2)" } as React.CSSProperties}
			decoding="async"
			loading={loading}
			// @ts-ignore - React can't detect fetchPriority
			fetchpriority={priority}
			alt={props.alt}
			role={props.alt ? undefined : "presentation"}
			sizes="(max-width: 50rem) 100vw, 50vw"
			src={props.src}
			srcSet={`
        ${props.srcset.thumb} 200w,
        ${props.srcset.small} 500w,
        ${props.srcset.medium} 1000w,
        ${props.srcset.large} 2000w
      `}
			onLoad={() => setIsLoaded(true)}
			ref={imageRef}
		/>
	)
}

const imageVariants = cva("w-full object-cover rounded-lg transition motion-safe:duration-500", {
	variants: {
		variant: {
			default: "",
			post: "aspect-[3/2]",
			cover: "aspect-[21/9]",
		},
		isLoaded: {
			false: "opacity-20 backdrop-blur-xl backdrop-blur bg-[var(--dominant-color)]",
		},
	},
	defaultVariants: {
		variant: "default",
		isLoaded: false,
	},
})

const THRESHOLD = 0.5 as const
/**
 * Determines if an element is in the viewport.
 *
 * @param {React.RefObject<HTMLElement>} ref - The reference to the element to observe.
 * @param {IntersectionObserverInit} [options] - Options for the IntersectionObserver.
 */
function useInViewport(ref: React.RefObject<HTMLElement>, options?: IntersectionObserverInit) {
	const [isIntersecting, setIsIntersecting] = React.useState(false)
	const observer = React.useRef<IntersectionObserver | null>(null)

	React.useEffect(() => {
		observer.current = new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting), {
			...options,
			threshold: THRESHOLD,
		})

		if (ref.current) {
			observer.current.observe(ref.current)
		}

		return () => {
			if (ref.current) {
				observer.current?.unobserve(ref.current)
			}
		}
	}, [ref.current, options])

	return [
		isIntersecting,
		() => {
			observer.current?.disconnect()
		},
	] as const
}

/**
 * Executes a provided callback function once when the value changes and has not been changed before.
 *
 * @param {T} value - The value to check for changes.
 * @param {() => void} [onceChanged=noop] - The callback function to execute when the value changes and has not been changed before.
 */
function useOnceDistinctiveChange<T>(value: T, onceChanged = noop) {
	const state = React.useRef(value)
	const isOnce = React.useRef(false)

	React.useEffect(() => {
		if (!isOnce.current && !isEqual(value, state.current)) {
			state.current = value
			isOnce.current = true
			onceChanged()
		}
	}, [value, onceChanged])

	return state.current
}

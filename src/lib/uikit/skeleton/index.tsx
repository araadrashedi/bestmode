import { cn } from "@/lib/utils"

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("motion-safe:animate-pulse rounded-md bg-primary/10", className)} {...props} />
}

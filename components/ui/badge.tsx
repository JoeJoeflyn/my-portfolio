import { cn } from "@/lib/utils"

function Badge({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        className
      )}
      {...props}
    />
  )
}

export { Badge }

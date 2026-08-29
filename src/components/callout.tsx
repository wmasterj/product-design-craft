import { cn } from "@/lib/cn";

export function Callout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role="note"
      className={cn(
        "rounded-lg border border-line px-4 py-3 text-sm text-muted",
        className,
      )}
    >
      {children}
    </div>
  );
}

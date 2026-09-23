export function GreenDotSteps({
  items,
}: {
  items: readonly { title: string; description: string }[];
}) {
  return (
    <ul className="mt-6 space-y-4">
      {items.map((step) => (
        <li key={step.title} className="flex gap-3">
          <span
            className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-green"
            aria-hidden
          />
          <div>
            <p className="font-semibold text-brand-navy">{step.title}</p>
            <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground md:text-base">
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

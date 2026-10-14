// Instant placeholder shown while a tour or destination page loads, so a tap
// on a card gets an immediate response. Mirrors the PageHero + content layout.
export function PageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading">
      <section className="relative flex min-h-[74svh] items-end overflow-hidden bg-charcoal pt-28 sm:min-h-[68svh] lg:min-h-[76vh]">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-charcoal via-secondary to-charcoal" />
        <div className="shell relative pb-12 sm:pb-16 lg:pb-20">
          <div className="h-3 w-40 rounded-full bg-background/15" />
          <div className="mt-6 h-3 w-28 rounded-full bg-accent/40" />
          <div className="mt-5 h-10 w-[80%] max-w-xl rounded-md bg-background/15 sm:h-14" />
          <div className="mt-3 h-10 w-[55%] max-w-md rounded-md bg-background/15 sm:h-14" />
          <div className="mt-6 h-4 w-[90%] max-w-lg rounded-full bg-background/10" />
          <div className="mt-2.5 h-4 w-[70%] max-w-md rounded-full bg-background/10" />
        </div>
      </section>
      <div className="shell py-16 sm:py-20">
        <div className="grid animate-pulse gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="border border-border bg-card">
              <div className="aspect-[4/3] bg-muted" />
              <div className="space-y-3 p-6">
                <div className="h-4 w-full rounded-full bg-muted" />
                <div className="h-4 w-2/3 rounded-full bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

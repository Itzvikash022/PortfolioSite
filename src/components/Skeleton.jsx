/**
 * Reusable Skeleton primitives.
 * Usage: <Sk.Line />, <Sk.Box />, <Sk.Circle />, <Sk.Card>...</Sk.Card>
 */
export const Sk = {
  Line: ({ className = '' }) => (
    <div className={`h-3 bg-white/8 rounded animate-pulse ${className}`} />
  ),
  Box: ({ className = '' }) => (
    <div className={`bg-white/8 rounded animate-pulse ${className}`} />
  ),
  Circle: ({ className = '' }) => (
    <div className={`rounded-full bg-white/8 animate-pulse ${className}`} />
  ),
  Card: ({ children, className = '' }) => (
    <div className={`bg-bg-card border border-white/5 rounded-xl p-5 ${className}`}>
      {children}
    </div>
  ),
};

/** Skeleton for a single project card in the portfolio grid */
export function ProjectCardSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden animate-pulse">
      <Sk.Box className="aspect-[4/3] w-full" />
      <div className="pt-3 space-y-2">
        <Sk.Line className="w-2/3" />
        <Sk.Line className="w-1/3 h-2" />
      </div>
    </div>
  );
}

/** Skeleton for the full portfolio grid */
export function PortfolioGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Skeleton for an admin list row (used in Works, Blogs, Certs, etc.) */
export function AdminRowSkeleton({ count = 4 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center justify-between p-4 bg-white/3 rounded-lg border border-white/5 animate-pulse">
          <div className="flex items-center gap-3 flex-1">
            <Sk.Box className="w-10 h-10 rounded-md flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Sk.Line className="w-1/2" />
              <Sk.Line className="w-1/4 h-2" />
            </div>
          </div>
          <Sk.Box className="w-7 h-7 rounded" />
        </div>
      ))}
    </div>
  );
}

/** Skeleton for the personal info form */
export function PersonalInfoSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center gap-6">
        <Sk.Circle className="w-24 h-24 flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <Sk.Line className="w-1/2" />
          <Sk.Line className="w-1/3 h-2" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Sk.Line className="w-1/4 h-2" />
            <Sk.Box className="h-10 w-full rounded-md" />
          </div>
        ))}
      </div>
      <Sk.Box className="h-12 w-full rounded-md" />
    </div>
  );
}

/** Skeleton for blog list */
export function BlogRowSkeleton({ count = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-start gap-4 p-4 bg-white/3 rounded-lg border border-white/5 animate-pulse">
          <Sk.Box className="w-16 h-16 rounded-md flex-shrink-0" />
          <div className="flex-1 space-y-2 pt-1">
            <Sk.Line className="w-3/4" />
            <Sk.Line className="w-1/2 h-2" />
            <Sk.Line className="w-1/3 h-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
/** Skeleton for the Hero/Stats bar items */
export function StatSkeleton() {
  return (
    <div className="flex items-center gap-3 animate-pulse">
      <Sk.Box className="w-12 h-8 rounded" />
      <div className="space-y-1.5">
        <Sk.Line className="w-16 h-2" />
        <Sk.Line className="w-10 h-1.5" />
      </div>
    </div>
  );
}

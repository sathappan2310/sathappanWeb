export default function PageSkeleton() {
  return (
    <div className="sn-section py-16">
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="skeleton h-10 w-2/3 rounded-xl" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-5/6 rounded" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="skeleton h-32 rounded-2xl" />
          <div className="skeleton h-32 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}

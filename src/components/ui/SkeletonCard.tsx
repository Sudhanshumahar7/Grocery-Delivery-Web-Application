export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E2E2] p-3">
      {/* Image placeholder */}
      <div className="w-full aspect-square rounded-xl skeleton mb-2" />
      {/* Unit */}
      <div className="h-3 w-1/2 skeleton mb-1" />
      {/* Name */}
      <div className="h-4 w-3/4 skeleton mb-1" />
      <div className="h-4 w-1/2 skeleton mb-3" />
      {/* Price row */}
      <div className="flex items-center justify-between">
        <div className="h-5 w-12 skeleton" />
        <div className="w-8 h-8 rounded-full skeleton" />
      </div>
    </div>
  );
}

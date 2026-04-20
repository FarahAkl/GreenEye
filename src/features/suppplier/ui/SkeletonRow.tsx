const SkeletonRow = () => (
  <div className="flex animate-pulse items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-sm">
    <div className="h-20 w-20 shrink-0 rounded-xl bg-gray-200" />
    <div className="flex-1 space-y-2.5">
      <div className="h-4 w-40 rounded-lg bg-gray-200" />
      <div className="h-3 w-24 rounded-lg bg-gray-100" />
    </div>
    <div className="min-w-30 space-y-2">
      <div className="h-3 w-20 rounded-lg bg-gray-200" />
      <div className="h-3 w-16 rounded-lg bg-gray-100" />
    </div>
    <div className="min-w-27 space-y-2 text-right">
      <div className="ml-auto h-6 w-24 rounded-lg bg-gray-200" />
      <div className="ml-auto h-4 w-16 rounded-lg bg-gray-100" />
    </div>
    <div className="ml-2 flex flex-col gap-1.5">
      <div className="h-9 w-9 rounded-lg bg-gray-200" />
      <div className="flex gap-1.5">
        <div className="h-9 w-9 rounded-lg bg-gray-200" />
        <div className="h-9 w-9 rounded-lg bg-gray-200" />
      </div>
    </div>
  </div>
);

export default SkeletonRow;

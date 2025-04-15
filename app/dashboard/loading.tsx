export default function Loading() {
  return (
    <div className="flex flex-col gap-12 px-4 py-6">
      <div className="flex flex-col gap-4">
        <div className="bg-gray-200 animate-pulse h-[20px] w-[140px] rounded-lg"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div className="bg-gray-200 animate-pulse h-[130px] rounded-lg"></div>
          <div className="bg-gray-200 animate-pulse h-[130px] rounded-lg"></div>
          <div className="bg-gray-200 animate-pulse h-[130px] rounded-lg"></div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="bg-gray-200 animate-pulse h-[20px] w-[140px] rounded-lg"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div className="bg-gray-200 animate-pulse h-[120px] rounded-lg"></div>
          <div className="bg-gray-200 animate-pulse h-[120px] rounded-lg"></div>
          <div className="bg-gray-200 animate-pulse h-[120px] rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

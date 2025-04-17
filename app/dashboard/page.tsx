import Link from "next/link";
import { getLatestTasks, getTaskSummary } from "@/app/actions/task";

export default async function Dashboard() {
  const { data: taskSummary } = await getTaskSummary();
  const { data: latestTasks } = await getLatestTasks();

  return (
    <div className="flex flex-col gap-12 px-4 py-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-blue-500">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div className="flex flex-col justify-center bg-green-500 hover:bg-green-400 transition-all duration-300 p-4 rounded-lg shadow-md min-h-[130px] gap-2">
            <p className="text-3xl font-bold text-white">
              {taskSummary?.lowPriorityTasks}
            </p>
            <p className="text-sm font-medium text-white">Low Priority Tasks</p>
          </div>

          <div className="flex flex-col justify-center bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 p-4 rounded-lg shadow-md min-h-[130px] gap-2">
            <p className="text-3xl font-bold text-white">
              {taskSummary?.mediumPriorityTasks}
            </p>
            <p className="text-sm font-medium text-white">
              Medium Priority Tasks
            </p>
          </div>

          <div className="flex flex-col justify-center bg-red-500 hover:bg-red-400 transition-all duration-300 p-4 rounded-lg shadow-md min-h-[130px] gap-2">
            <p className="text-3xl font-bold text-white">
              {taskSummary?.highPriorityTasks}
            </p>
            <p className="text-sm font-medium text-white">
              High Priority Tasks
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold text-blue-500">
          Latest Created Tasks
        </h2>

        {latestTasks?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <Link
              href="/tasks/1"
              className="flex flex-col justify-center border-[1px] border-gray-200 rounded-lg p-4 shadow-sm gap-1 hover:bg-gray-50 transition-all duration-300 min-h-[120px]"
            >
              <p className="text-lg font-medium text-black">Task Name</p>
              <p className="text-sm font-medium text-gray-500">
                Task Description
              </p>
            </Link>
            <Link
              href="/tasks/1"
              className="flex flex-col justify-center border-[1px] border-gray-200 rounded-lg p-4 shadow-sm gap-1 hover:bg-gray-50 transition-all duration-300 min-h-[120px]"
            >
              <p className="text-lg font-medium text-black">Task Name</p>
              <p className="text-sm font-medium text-gray-500">
                Task Description
              </p>
            </Link>
            <Link
              href="/tasks/1"
              className="flex flex-col justify-center border-[1px] border-gray-200 rounded-lg p-4 shadow-sm gap-1 hover:bg-gray-50 transition-all duration-300 min-h-[120px]"
            >
              <p className="text-lg font-medium text-black">Task Name</p>
              <p className="text-sm font-medium text-gray-500">
                Task Description
              </p>
            </Link>
          </div>
        ) : (
          <div>
            <p className="font-semibold text-gray-500 text-sm">
              You don&apos;t have any task.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

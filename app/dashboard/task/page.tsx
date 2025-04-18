import { getUserTasks } from "@/app/actions/task";
import Label from "@/app/components/Label";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";

export default async function Task() {
  const tasks = await getUserTasks();

  console.log(tasks);

  return (
    <div className="flex flex-col gap-12 px-4 py-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-blue-500">Tasks</h1>

        <Link
          href="/dashboard/task/new"
          className="flex items-center gap-1 text-white text-xs font-semibold bg-blue-500 px-3 py-2 rounded-md hover:bg-blue-400 active:bg-blue-600 transition-all duration-300 w-fit"
        >
          <PlusIcon className="w-4 h-4" />
          New Task
        </Link>

        <div className="grid grid-cols-5 gap-3">
          <div className="flex flex-col gap-2 shadow-md p-4 rounded-md bg-white border-[1px] border-gray-200">
            <Label color="BLUE" text="Task Name" />
            <h2 className="text-lg font-semibold">Task Name</h2>
            <p className="text-sm text-gray-500">Task Description</p>
          </div>
        </div>
      </div>
    </div>
  );
}

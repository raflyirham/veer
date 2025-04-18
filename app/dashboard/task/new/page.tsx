"use client";

import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useActionState, useEffect, useState } from "react";
import { createTask } from "@/app/actions/task";
import toast from "react-hot-toast";

interface ResponseState {
  success: boolean;
  message: string | null;
  errors: Record<string, string[]> | null;
}

const initialState: ResponseState = {
  success: false,
  message: null,
  errors: null,
};

export default function NewTask() {
  const [state, formAction, isLoading] = useActionState(
    createTask,
    initialState
  );
  const [error, setError] = useState<Record<string, string[]> | null>(null);

  useEffect(() => {
    if (state.success && state.message) {
      toast.success(state.message);
    }
  }, [state]);

  useEffect(() => {
    if (state.errors) {
      setError(state.errors);
    }

    if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  console.log(state);

  return (
    <div className="flex flex-col gap-12 px-4 py-6">
      <div className="flex flex-col gap-4">
        <Link
          href="/dashboard/task"
          className="flex items-center gap-1 text-blue-500 border-[1px] border-blue-500 text-xs font-semibold bg-white px-3 py-2 rounded-md hover:bg-blue-50 active:bg-blue-100 transition-all duration-300 w-fit"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back
        </Link>
        <h1 className="text-2xl font-bold text-blue-500">New Task</h1>

        <form
          action={formAction}
          className="flex flex-col gap-8 border-[1px] border-gray-200 px-6 py-8 rounded-md shadow-md"
        >
          <div className="flex flex-col gap-3">
            <label htmlFor="taskName" className="text-sm font-semibold">
              <span className="text-red-500">*</span> Task Name:
            </label>
            <input
              required
              type="text"
              name="taskName"
              id="taskName"
              placeholder="e.g. Working on the project"
              disabled={isLoading}
              className="text-sm border-[1px] border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            />

            {error?.taskName && (
              <p className="text-xs text-red-500">
                {error.taskName.join(", ")}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="taskDescription" className="text-sm font-semibold">
              <span className="text-red-500">*</span> Task Description:
            </label>
            <textarea
              required
              name="taskDescription"
              id="taskDescription"
              placeholder="e.g. Project description, requirements, etc."
              rows={5}
              disabled={isLoading}
              className="text-sm border-[1px] border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            />

            {error?.taskDescription && (
              <p className="text-xs text-red-500">
                {error.taskDescription.join(", ")}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="taskPriority" className="text-sm font-semibold">
              <span className="text-red-500">*</span> Priority:
            </label>
            <select
              name="taskPriority"
              id="taskPriority"
              defaultValue="MEDIUM"
              disabled={isLoading}
              className="text-sm border-[1px] border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>

            {error?.taskPriority && (
              <p className="text-xs text-red-500">
                {error.taskPriority.join(", ")}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="taskDeadline" className="text-sm font-semibold">
              <span className="text-red-500">*</span> Deadline:
            </label>
            <input
              required
              type="date"
              name="taskDeadline"
              id="taskDeadline"
              defaultValue={
                new Date(new Date().setDate(new Date().getDate() + 1))
                  .toISOString()
                  .split("T")[0]
              }
              disabled={isLoading}
              className="text-sm border-[1px] border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <p className="text-xs text-gray-500">
              Deadline must be at least 1 day from now
            </p>

            {error?.taskDeadline && (
              <p className="text-xs text-red-500">
                {error.taskDeadline.join(", ")}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-1 text-white text-sm font-semibold bg-blue-500 px-3 py-2 rounded-md hover:bg-blue-400 active:bg-blue-600 transition-all duration-300 w-fit cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlusIcon className="w-4 h-4" />
            {isLoading ? "Creating..." : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
}

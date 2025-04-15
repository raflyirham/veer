"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  HomeIcon as DashboardIcon,
  ListBulletIcon as TaskIcon,
  UserCircleIcon as ProfileIcon,
  ArrowLeftStartOnRectangleIcon as LogoutIcon,
} from "@heroicons/react/24/solid";
import { useActionState, useEffect } from "react";
import { logout } from "@/app/actions/auth";
import toast from "react-hot-toast";

const sidebar = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: DashboardIcon,
  },
  {
    name: "Task",
    href: "/dashboard/task",
    icon: TaskIcon,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: ProfileIcon,
  },
];

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

export default function Sidebar() {
  const [state, formAction, isLoading] = useActionState(logout, initialState);

  useEffect(() => {
    if (state.success && state.message) {
      toast.success(state.message);
      return;
    }

    if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const pathname = usePathname();

  const isCurrentRoute = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }

    const removedPrefix = pathname.replace("/dashboard", "");
    return removedPrefix === href.replace("/dashboard", "");
  };

  return (
    <div className="flex flex-col w-full bg-white min-h-full p-4 shadow-md rounded-r-lg border-r border-gray-200 gap-4">
      <Link
        href="/dashboard"
        className="text-2xl font-bold text-blue-500 hover:text-blue-400 active:text-blue-600 transition-all duration-300 w-fit"
      >
        Veer
      </Link>
      <div className="flex flex-col gap-1 flex-grow">
        {sidebar.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className={`flex flex-row items-center gap-2 p-2 ${
              isCurrentRoute(item.href) ? "bg-blue-500 text-white" : ""
            } rounded-md hover:bg-blue-500 active:bg-blue-600 hover:text-white transition-all duration-300`}
          >
            <item.icon className="size-5" />
            {item.name}
          </Link>
        ))}
      </div>

      <form action={formAction} className="mt-auto">
        <button
          disabled={isLoading}
          type="submit"
          className="p-2 font-medium text-sm text-red-500 bg-white hover:bg-red-500 hover:text-white active:bg-red-600 active:text-white rounded-md transition-all duration-300 cursor-pointer flex flex-row items-center gap-2 w-full"
        >
          <LogoutIcon className="size-5" />
          {isLoading ? "Logging out..." : "Logout"}
        </button>
      </form>
    </div>
  );
}

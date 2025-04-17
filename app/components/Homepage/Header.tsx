import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { auth } from "@/auth";

export default async function Header() {
  const user = await auth();

  return (
    <header className="flex flex-row justify-between items-center px-4 py-2 shadow bg-white top-0 z-10 fixed w-full">
      <Link href="/">
        <h1 className="text-xl font-bold text-blue-500 hover:text-blue-400 active:text-blue-600 transition-all duration-300">
          Veer
        </h1>
      </Link>

      {user ? (
        <Link
          href="/dashboard"
          className="flex flex-row items-center gap-2 text-white text-sm font-medium border-[1px] border-blue-500 bg-blue-500 rounded px-4 py-2 hover:bg-blue-400 active:bg-blue-600 transition-all duration-300"
        >
          <p className="text-white">Dashboard</p>
          <ArrowRightIcon className="w-4 h-4 text-white" />
        </Link>
      ) : (
        <div className="flex flex-row gap-2">
          <Link
            href="/auth/signin"
            className="text-blue-500 text-xs font-medium border-[1px] border-blue-500 rounded px-4 py-2 hover:bg-blue-50 active:bg-blue-100 transition-all duration-300"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="text-white text-xs font-medium border-[1px] border-blue-500 bg-blue-500 rounded px-4 py-2 hover:bg-blue-400 active:bg-blue-600 transition-all duration-300"
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}

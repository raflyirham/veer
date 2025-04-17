import Link from "next/link";
import Header from "./components/Homepage/Header";
import TextHighlight from "./components/Homepage/TextHighlight";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function Home() {
  const texts = ["easier.", "better.", "faster."];

  return (
    <>
      <Header />

      <main className="flex flex-col mt-2 px-4 py-4">
        <div className="flex flex-row items-center min-h-screen">
          <div className="flex flex-col gap-8 w-1/2">
            <div className="flex flex-col gap-1">
              <span className="text-white text-xs font-semibold bg-blue-500 px-2 py-1 rounded-md w-fit hover:bg-blue-400 transition-all duration-300 select-none">
                Try Veer for free!
              </span>
              <h1 className="text-6xl/20 font-bold text-blue-500">
                Make all your task management{" "}
                <TextHighlight texts={texts} delay={2000} />
              </h1>
            </div>

            <Link
              href="/auth/signup"
              className="flex flex-row items-center gap-2 font-bold text-blue-500 border-[1px] border-blue-500 rounded-md px-4 py-2 hover:bg-blue-50 active:bg-blue-100 transition-all duration-300 w-fit"
            >
              Get Started
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-col w-1/2 items-center justify-center">
            <Image
              src="/assets/illustrations/task.png"
              alt="Task Management"
              width={700}
              height={700}
            />
          </div>
        </div>
      </main>
    </>
  );
}

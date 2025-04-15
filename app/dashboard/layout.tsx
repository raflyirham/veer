import { Metadata } from "next";
import Sidebar from "@/app/components/Dashboard/Sidebar";

export const metadata: Metadata = {
  title: "Veer | Dashboard",
  description: "Veer Dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row min-h-screen">
      <div className="w-1/6">
        <Sidebar />
      </div>

      <div className="flex flex-col w-5/6 bg-white min-h-full p-4 ">
        {children}
      </div>
    </div>
  );
}

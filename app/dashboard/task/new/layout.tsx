import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veer | New Task",
  description: "Create a new task",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

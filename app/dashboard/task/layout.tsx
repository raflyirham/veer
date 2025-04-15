import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veer | Task",
  description: "Your tasks",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

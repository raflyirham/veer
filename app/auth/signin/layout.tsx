import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veer | Sign In",
  description: "Sign in to your Veer account",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

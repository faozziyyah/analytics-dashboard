import React from "react";
import Header from "./Header";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: React.ReactNode }) {
    
  const router = useRouter();
  const hideHeader = router.pathname === "/login"; 

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideHeader && <Header />}
      <main className="p-6 max-w-6xl mx-auto">{children}</main>
    </div>
  );
}

"use client";

import { useAuth } from "@/hooks/auth";
import Navigation from "@/app/(app)/Navigation";
import Loading from "@/app/(app)/loading";
import type { ReactNode } from "react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth({ middleware: "auth" });

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation user={user} />

      <main>{children}</main>
    </div>
  );
};

export default AppLayout;

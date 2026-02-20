"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await fetch("/api/auth/logout", { method: "POST" });
    setLoading(false)
    router.push("/login");
  };

  return (
    <Button variant={"destructive"} onClick={handleLogout}>
      Logout {loading && <Spinner />}
    </Button>
  );
}
"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/select-organization");
  }, [router]);
  return <div>Page</div>;
};

export default Page;

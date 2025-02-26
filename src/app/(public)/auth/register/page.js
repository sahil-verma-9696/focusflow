"use client"
import Auth from "@/components/auth/Auth";
import { withoutAuth } from "@/utils/withAuth";
import React from "react";

const page = () => {
  return (
    <main>
      <Auth />
    </main>
  );
};

export default withoutAuth(page);

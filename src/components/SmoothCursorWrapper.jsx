"use client";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function SmoothCursorWrapper({ children }) {
  useEffect(() => {
    document.body.style.cursor = "none";

    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      <Outlet />
      <SmoothCursor />
    </>
  );
}

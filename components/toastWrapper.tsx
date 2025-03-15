"use client";

import { useEffect, useState } from "react";
import { Toaster } from "sonner";

interface ToasterWrapperProps {
  richColors: boolean;
}

export default function ToasterWrapper({ richColors }: ToasterWrapperProps) {
  const [position, setPosition] = useState<"top-center" | "bottom-right">(
    "bottom-right",
  );

  useEffect(() => {
    const updatePosition = () => {
      setPosition(window.innerWidth < 640 ? "top-center" : "bottom-right");
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  return <Toaster richColors={richColors} position={position} />;
}

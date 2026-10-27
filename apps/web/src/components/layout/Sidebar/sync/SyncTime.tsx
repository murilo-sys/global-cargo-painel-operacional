"use client";

import { formatRelativeTime } from "@/util/dates/formatRelativeTime";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface SyncTimeProps {
  created_at: string;
}

export default function SyncTime({ created_at }: SyncTimeProps) {
  const pathname = usePathname();
  const [timeText, setTimeText] = useState(() => formatRelativeTime(new Date(created_at), new Date()));

  useEffect(() => {
    function updateTime() {
      setTimeText(formatRelativeTime(new Date(created_at), new Date()));
    }

    updateTime(); // Update the timer on screen switch

    const interval = setInterval(updateTime, 60_000); // Updates the screen every minute
    return () => clearInterval(interval);
  }, [pathname, created_at]);

  return <p className="text-sm">{timeText}</p>;
}

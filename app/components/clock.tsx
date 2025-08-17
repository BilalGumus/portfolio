"use client";

import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { useEffect, useState } from "react";

export default function TurkeyClock() {
  const [time, setTime] = useState("");

  const updateTime = () => {
    const now = new Date();
    const istanbulTime = toZonedTime(now, "Europe/Istanbul");
    const formatted = format(istanbulTime, "HH:mm:ss 'TR'");
    setTime(formatted);
  };

  useEffect(() => {
    updateTime();

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="text-sm text-right">{time}</span>;
}

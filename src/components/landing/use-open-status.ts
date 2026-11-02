import { useEffect, useState } from "react";

import { OPENING_HOURS } from "@/lib/site-config";

export type OpenStatus = { isOpen: boolean; label: string } | null;

const WEEKDAYS: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

function formatHour(minutes: number) {
  return `${Math.floor(minutes / 60)}h${minutes % 60 ? String(minutes % 60).padStart(2, "0") : ""}`;
}

function computeStatus(now: Date): Exclude<OpenStatus, null> {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  const day = WEEKDAYS[get("weekday")] ?? now.getDay();
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));

  const today = OPENING_HOURS.find((h) => h.day === day);
  if (today && minutes >= today.open && minutes < today.close) {
    return { isOpen: true, label: `Aberto agora · até ${formatHour(today.close)}` };
  }
  if (today && minutes < today.open) {
    return { isOpen: false, label: `Fechado · abre hoje às ${formatHour(today.open)}` };
  }
  const tomorrow = OPENING_HOURS.find((h) => h.day === (day + 1) % 7);
  return {
    isOpen: false,
    label: tomorrow ? `Fechado · abre amanhã às ${formatHour(tomorrow.open)}` : "Fechado agora",
  };
}

/** Status aberto/fechado no fuso de São Paulo. Calculado só no cliente para evitar erro de hidratação. */
export function useOpenStatus(): OpenStatus {
  const [status, setStatus] = useState<OpenStatus>(null);

  useEffect(() => {
    const update = () => setStatus(computeStatus(new Date()));
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return status;
}

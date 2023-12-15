import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCustomDate(date: Date): string {
  const day = date.getDate();
  const weekday = date.toLocaleString("default", { weekday: "long" });
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const suffix = getNumberWithSuffix(day);

  return `${weekday}, ${month} ${day}${suffix} ${year}`;
}

function getNumberWithSuffix(number: number): string {
  if (number >= 11 && number <= 13) {
    return "th";
  }

  const lastDigit = number % 10;

  switch (lastDigit) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

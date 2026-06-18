import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTime = () => {
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(today.getDate() - 1);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  return {
    yesterday: formatDate(yesterday),
    today: formatDate(today),
  };
};

import type { AllTimeType, WakaStatsType, WakaSummaryType } from "../shared/interface";
import { getTime } from "../shared/utils";

const WAKATIME_AUTH_SCHEMES = ["Bearer", "Basic"] as const;

type WakaResponse<T> = {
  readonly data: T | null;
  readonly errors?: readonly string[];
};

const isWakaResponse = <T>(payload: unknown): payload is WakaResponse<T> =>
  typeof payload === "object" && payload !== null && "data" in payload;

const getLastYearRange = () => {
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setFullYear(endDate.getFullYear() - 1);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  return {
    start: formatDate(startDate),
    end: formatDate(endDate),
  };
};

const wakaFetch = async <T>(path: string): Promise<T | null> => {
  const baseUrl = process.env.NEXT_PUBLIC_WAKATIME_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_WAKATIME_API_KEY;

  if (!baseUrl || !apiKey) {
    console.warn("WakaTime API env vars not configured");
    return null;
  }

  try {
    for (const scheme of WAKATIME_AUTH_SCHEMES) {
      const response = await fetch(`${baseUrl}${path}`, {
        next: { revalidate: 3600 },
        headers: {
          Authorization: `${scheme} ${apiKey}`,
        },
      });

      const payload: unknown = await response.json();
      if (
        scheme === "Bearer" &&
        response.status === 401 &&
        typeof payload === "object" &&
        payload !== null &&
        "errors" in payload
      ) {
        continue;
      }

      if (!response.ok) {
        console.error(`Failed to fetch WakaTime data from ${path}: ${response.status} ${response.statusText}`);
        return null;
      }

      if (isWakaResponse<T>(payload)) {
        return payload.data ?? null;
      }

      return null;
    }

    return null;
  } catch (error) {
    console.error(`Failed to fetch WakaTime data from ${path}:`, error);
    return null;
  }
};

export const getAllTime = async (): Promise<AllTimeType | null> =>
  wakaFetch<AllTimeType>("users/current/all_time_since_today");

export const getYearStats = async (): Promise<WakaStatsType | null> =>
  wakaFetch<WakaStatsType>("users/current/stats/last_year");

export const getSummaries = async (): Promise<readonly WakaSummaryType[] | null> => {
  const { yesterday, today } = getTime();
  return wakaFetch<readonly WakaSummaryType[]>(`users/current/summaries?start=${yesterday}&end=${today}`);
};

export const getYearSummaries = async (): Promise<readonly WakaSummaryType[] | null> => {
  const { start, end } = getLastYearRange();
  return wakaFetch<readonly WakaSummaryType[]>(`users/current/summaries?start=${start}&end=${end}`);
};

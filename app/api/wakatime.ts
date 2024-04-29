import { getTime } from "../shared/utils";

export const getAllTime = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WAKATIME_API_URL}users/current/all_time_since_today`,
      {
        headers: {
          Authorization: `Basic ${process.env.NEXT_PUBLIC_WAKATIME_API_KEY}`,
        },
      }
    );

    const data = await response.json();

    return data?.data;
  } catch (error) {
    console.error("Failed to fetch Notion page:", error);
    throw error;
  }
};

export const getStats = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WAKATIME_API_URL}users/current/stats/last_7_days`,
      {
        headers: {
          Authorization: `Basic ${process.env.NEXT_PUBLIC_WAKATIME_API_KEY}`,
        },
      }
    );

    const data = await response.json();

    return data?.data;
  } catch (error) {
    console.error("Failed to fetch Notion page:", error);
    throw error;
  }
};

export const getSummaries = async () => {
  const { yesterday, today } = getTime();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WAKATIME_API_URL}users/current/summaries?start=${yesterday}&end=${today}`,
      {
        headers: {
          Authorization: `Basic ${process.env.NEXT_PUBLIC_WAKATIME_API_KEY}`,
        },
      }
    );

    const data = await response.json();

    return data?.data;
  } catch (error) {
    console.error("Failed to fetch Notion page:", error);
    throw error;
  }
};

export const getInsights = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WAKATIME_API_URL}users/current/insights/days`,
      {
        headers: {
          Authorization: `Basic ${process.env.NEXT_PUBLIC_WAKATIME_API_KEY}`,
        },
      }
    );

    const data = await response.json();

    return data?.data;
  } catch (error) {
    console.error("Failed to fetch Notion page:", error);
    throw error;
  }
};

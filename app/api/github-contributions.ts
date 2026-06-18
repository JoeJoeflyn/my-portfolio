import { ICON_URL } from "../shared/constant";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const GITHUB_CONTRIBUTION_LEVELS = [
  "NONE",
  "FIRST_QUARTILE",
  "SECOND_QUARTILE",
  "THIRD_QUARTILE",
  "FOURTH_QUARTILE",
] as const;

type GitHubContributionLevel = (typeof GITHUB_CONTRIBUTION_LEVELS)[number];

type GitHubContributionDay = {
  readonly date: string;
  readonly count: number;
  readonly level: GitHubContributionLevel;
};

type GitHubContributionCalendar = {
  readonly username: string;
  readonly totalContributions: number;
  readonly days: readonly GitHubContributionDay[];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isGitHubContributionLevel = (value: unknown): value is GitHubContributionLevel =>
  typeof value === "string" && GITHUB_CONTRIBUTION_LEVELS.some((level) => level === value);

const getGitHubUsername = () => {
  const githubProfile = ICON_URL.find(
    (link) => link.kind === "icon" && link.icon === "github",
  )?.href;

  if (!githubProfile) {
    return null;
  }

  const githubPrefix = "https://github.com/";
  if (!githubProfile.startsWith(githubPrefix)) {
    return null;
  }

  const username = githubProfile.slice(githubPrefix.length).split("/")[0];
  return username || null;
};

const getDateRange = () => {
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setFullYear(endDate.getFullYear() - 1);

  return {
    from: startDate.toISOString(),
    to: endDate.toISOString(),
  };
};

const parseContributionCalendar = (
  payload: unknown,
  username: string,
): GitHubContributionCalendar | null => {
  if (!isRecord(payload)) {
    return null;
  }

  const data = payload["data"];
  if (!isRecord(data)) {
    return null;
  }

  const user = data["user"];
  if (!isRecord(user)) {
    return null;
  }

  const contributionsCollection = user["contributionsCollection"];
  if (!isRecord(contributionsCollection)) {
    return null;
  }

  const contributionCalendar = contributionsCollection["contributionCalendar"];
  if (!isRecord(contributionCalendar)) {
    return null;
  }

  const totalContributions = contributionCalendar["totalContributions"];
  const weeks = contributionCalendar["weeks"];

  if (typeof totalContributions !== "number" || !Array.isArray(weeks)) {
    return null;
  }

  const days = weeks.flatMap((week) => {
    if (!isRecord(week)) {
      return [];
    }

    const contributionDays = week["contributionDays"];
    if (!Array.isArray(contributionDays)) {
      return [];
    }

    return contributionDays.flatMap((day) => {
      if (!isRecord(day)) {
        return [];
      }

      const date = day["date"];
      const count = day["contributionCount"];
      const level = day["contributionLevel"];

      if (
        typeof date !== "string" ||
        typeof count !== "number" ||
        !isGitHubContributionLevel(level)
      ) {
        return [];
      }

      return [{ date, count, level }];
    });
  });

  return {
    username,
    totalContributions,
    days,
  };
};

const GITHUB_CONTRIBUTIONS_QUERY = `
  query ContributionCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              contributionLevel
              date
            }
          }
        }
      }
    }
  }
`;

export const getGitHubContributions = async () => {
  const apiToken = process.env.GITHUB_PAT;
  const username = getGitHubUsername();

  if (!apiToken || !username) {
    console.warn("GitHub contribution calendar is not configured");
    return null;
  }

  const { from, to } = getDateRange();

  try {
    const response = await fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      next: { revalidate: 3600 },
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GITHUB_CONTRIBUTIONS_QUERY,
        variables: {
          login: username,
          from,
          to,
        },
      }),
    });

    if (!response.ok) {
      console.error(`Failed to fetch GitHub contributions: ${response.status} ${response.statusText}`);
      return null;
    }

    const payload: unknown = JSON.parse(await response.text());
    const graphqlErrors = isRecord(payload) && Array.isArray(payload["errors"])
      ? payload["errors"]
          .flatMap((error) => {
            if (!isRecord(error) || typeof error["message"] !== "string") {
              return [];
            }

            return [error["message"]];
          })
      : [];

    if (graphqlErrors.length > 0) {
      console.error(`GitHub GraphQL returned errors: ${graphqlErrors.join("; ")}`);
      return null;
    }

    return parseContributionCalendar(payload, username);
  } catch (error) {
    console.error("Failed to fetch GitHub contribution calendar:", error);
    return null;
  }
};

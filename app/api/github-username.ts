import { ICON_URL } from "../shared/constant";

export const getGitHubUsername = (): string | null => {
  const githubProfile = ICON_URL.find(
    (link) => link.kind === "icon" && link.icon === "github",
  )?.href;

  if (!githubProfile) return null;

  const prefix = "https://github.com/";
  if (!githubProfile.startsWith(prefix)) return null;

  return githubProfile.slice(prefix.length).split("/")[0] || null;
};

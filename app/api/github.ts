import { ICON_URL } from "../shared/constant";

export const getGithub = async () => {
  const apiToken = process.env.GITHUB_PAT;

  const githubProfile = ICON_URL.find(
    (link) => link.kind === "icon" && link.icon === "github",
  )?.href;
  const username = githubProfile
    ?.replace("https://github.com/", "")
    .split("/")[0];

  if (!apiToken || !username) {
    console.warn("GitHub PAT or username not configured");
    return "";
  }

  const apiUrl = `https://api.github.com/repos/${username}/${username}/contents/README.md`;

  const headers = {
    Authorization: `Bearer ${apiToken}`,
    Accept: "application/vnd.github.v3+json",
  };

  try {
    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 },
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error fetching README: ${response.statusText}`);
    }

    const data = await response.json();

    const content = Buffer.from(data.content, "base64").toString("utf-8");

    return content;
  } catch (error) {
    console.error(error);
    return "";
  }
};

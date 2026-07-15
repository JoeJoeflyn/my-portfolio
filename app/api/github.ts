import { getGitHubUsername } from "./github-username";

export const getGithub = async () => {
  const apiToken = process.env.GITHUB_PAT;
  const username = getGitHubUsername();

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

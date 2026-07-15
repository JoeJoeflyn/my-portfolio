import { getGitHubUsername } from "./github-username";

export type GitHubRepo = {
  readonly name: string;
  readonly description: string | null;
  readonly html_url: string;
  readonly homepage: string | null;
  readonly language: string | null;
  readonly topics: readonly string[];
  readonly stargazers_count: number;
  readonly forks_count: number;
  readonly pushed_at: string;
  readonly created_at: string;
  readonly updated_at: string;
  readonly fork: boolean;
  readonly archived: boolean;
  readonly owner: { readonly login: string };
};

// Additional GitHub accounts to fetch repos from (merged with primary)
const EXTRA_ACCOUNTS = ["asta-nguyen"];

// Filter out junk: profile repos, learning/practice repos, boilerplates, config
const JUNK_NAME_PATTERNS = [
  /^learn/i, /^todo/i, /redux/i, /^reactjs$/i, /practice/i, /tutorial/i,
  /demo/i, /^test/i, /^hello/i, /boilerplate/i, /config/i, /^asta/i,
  /^adminjs/i, /^custom/i, /^my-vim/i, /^send-info/i, /^a-ngrx/i,
  /^aaatax/i, /^nro_/i, /^geniusmesh/i, /^private-docker/i,
  /^joejoeflyn$/i, /^my-portfolio$/i,
];
const JUNK_DESC_PATTERNS = [
  /learning/i, /practice/i, /tutorial/i, /exercise/i, /my personal/i,
  /config files/i, /boilerplate/i, /compose services/i, /adminjs/i,
];

const isRealProject = (repo: GitHubRepo, username: string): boolean => {
  // Skip profile repos (name matches username)
  if (repo.name.toLowerCase() === username.toLowerCase()) return false;
  // Must have a description
  if (!repo.description || repo.description.trim().length === 0) return false;
  // Skip junk by name
  if (JUNK_NAME_PATTERNS.some((p) => p.test(repo.name))) return false;
  // Skip junk by description
  if (JUNK_DESC_PATTERNS.some((p) => p.test(repo.description!))) return false;
  return true;
};

const fetchReposForUser = async (
  apiToken: string,
  username: string,
): Promise<GitHubRepo[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`,
      {
        next: { revalidate: 3600 },
        headers: {
          Authorization: `Bearer ${apiToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      },
    );

    if (!response.ok) {
      console.error(`Failed to fetch repos for ${username}: ${response.status}`);
      return [];
    }

    const repos = (await response.json()) as GitHubRepo[];
    return repos.filter((r) => !r.fork && !r.archived && isRealProject(r, username));
  } catch (error) {
    console.error(`Failed to fetch repos for ${username}:`, error);
    return [];
  }
};

// Fetch repos the authenticated user is a collaborator or org member of
const fetchCollaboratorRepos = async (apiToken: string): Promise<GitHubRepo[]> => {
  try {
    const response = await fetch(
      "https://api.github.com/user/repos?per_page=100&sort=pushed&affiliation=owner,collaborator,organization_member",
      {
        next: { revalidate: 3600 },
        headers: {
          Authorization: `Bearer ${apiToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      },
    );

    if (!response.ok) {
      console.error(`Failed to fetch collaborator repos: ${response.status}`);
      return [];
    }

    const repos = (await response.json()) as GitHubRepo[];
    // Only include repos NOT owned by the user (those are already fetched above)
    return repos.filter((r) => !r.fork && !r.archived && isRealProject(r, r.owner.login));
  } catch (error) {
    console.error("Failed to fetch collaborator repos:", error);
    return [];
  }
};

export const getGitHubRepos = async (): Promise<readonly GitHubRepo[]> => {
  const apiToken = process.env.GITHUB_PAT;
  const username = getGitHubUsername();

  if (!apiToken || !username) {
    console.warn("GitHub PAT or username not configured for repos fetch");
    return [];
  }

  const allUsernames = [username, ...EXTRA_ACCOUNTS];
  const [ownRepos, collabRepos] = await Promise.all([
    Promise.all(allUsernames.map((u) => fetchReposForUser(apiToken, u))),
    fetchCollaboratorRepos(apiToken),
  ]);

  // Deduplicate by repo URL (collaborator repos might overlap with own repos)
  const seen = new Set<string>();
  const all = [...ownRepos.flat(), ...collabRepos]
    .filter((r) => {
      if (seen.has(r.html_url)) return false;
      seen.add(r.html_url);
      return true;
    })
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());

  return all;
};

export const getGitHubRepo = async (repoName: string): Promise<GitHubRepo | null> => {
  const apiToken = process.env.GITHUB_PAT;
  const username = getGitHubUsername();
  if (!apiToken || !username) return null;

  const allUsernames = [username, ...EXTRA_ACCOUNTS];

  for (const user of allUsernames) {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${user}/${repoName}`,
        {
          next: { revalidate: 3600 },
          headers: {
            Authorization: `Bearer ${apiToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        },
      );
      if (response.ok) {
        return (await response.json()) as GitHubRepo;
      }
    } catch {
      // try next account
    }
  }

  return null;
};

export const getGitHubRepoReadme = async (repoName: string): Promise<string> => {
  const apiToken = process.env.GITHUB_PAT;
  const username = getGitHubUsername();
  if (!apiToken || !username) return "";

  const allUsernames = [username, ...EXTRA_ACCOUNTS];

  for (const user of allUsernames) {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${user}/${repoName}/contents/README.md`,
        {
          next: { revalidate: 3600 },
          headers: {
            Authorization: `Bearer ${apiToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        },
      );
      if (response.ok) {
        const data = await response.json();
        return Buffer.from(data.content, "base64").toString("utf-8");
      }
    } catch {
      // try next account
    }
  }

  return "";
};

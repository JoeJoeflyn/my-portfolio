export const getGithub = async () => {
  const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_API_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_GITHUB_API_URL}`, {
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
  }
};

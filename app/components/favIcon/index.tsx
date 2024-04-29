const FaviconDisplay = ({ href }: { href: string }) => {
  const getDomain = (url: string) => {
    try {
      const { hostname } = new URL(url);
      return hostname;
    } catch (error) {
      console.error("Invalid URL", error);
      return "";
    }
  };

  const getFaviconUrl = (url: string) => {
    const domain = getDomain(url);
    const size = 24;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
  };

  const faviconUrl = getFaviconUrl(href);

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={faviconUrl} alt="Favicon" />;
};

export default FaviconDisplay;

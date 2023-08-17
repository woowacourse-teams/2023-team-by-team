const HTTPS_PREFIX_REGEX = /^https?:\/\/.*/;

export const generateHttpsUrl = (url: string) => {
  if (HTTPS_PREFIX_REGEX.test(url)) {
    return url;
  }

  return `https://${url}`;
};

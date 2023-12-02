export const getIsMobile = () => {
  const isIos = window.navigator.userAgent.match(/ipad|iphone/i) !== null;
  const isAndroid = window.navigator.userAgent.match(/Android/i) !== null;

  if (isIos || isAndroid) {
    return true;
  }

  return false;
};

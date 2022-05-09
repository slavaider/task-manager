const getHost = () => {
  return `${window.location.protocol}//${window.location.host}`;
};

export const BASE_URL = getHost();

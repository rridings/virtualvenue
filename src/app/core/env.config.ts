const _isDev = window.location.port.indexOf('3000') > -1;
const getHost = () => {
  const protocol = window.location.protocol;
  const host = window.location.host;
  return `${protocol}//${host}`;
};
const apiURI = _isDev ? 'http://localhost:3000/' : `/`;

export const ENV = {
  BASE_URI: getHost(),
  BASE_API: apiURI
};

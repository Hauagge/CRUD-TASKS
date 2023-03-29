export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z\\-_]+)/g;
  const pathWithParams = path.replaceAll(
    routeParametersRegex,
    `(?<$1>[a-z0-9z\\-_]+)`
  );
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);
  return pathRegex;
}

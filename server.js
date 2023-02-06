import http from "node:http";

const server = http.createServer((req, res) => {
  const { method, url } = req;

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);
    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query;
    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

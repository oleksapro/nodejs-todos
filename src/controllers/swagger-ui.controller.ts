import type { IncomingMessage } from "node:http";
import fs from "node:fs";
import path from "node:path";
import swaggerUI from "swagger-ui-dist";

import type { Response } from "../modules/router/types.ts";
import { handleError } from "../utils/http.ts";

const { SwaggerUIBundle } = swaggerUI;

const swaggerHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>API Docs</title>
  <link rel="stylesheet" href="/swagger-ui/swagger-ui.css">
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="/swagger-ui/swagger-ui-bundle.js"></script>
  <script>
    ${SwaggerUIBundle.toString()}
    const ui = SwaggerUIBundle({
      url: "/swagger-ui/openapi.json",
      dom_id: '#swagger-ui',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIBundle.SwaggerUIStandalonePreset
      ],
    });
  </script>
</body>
</html>
`;

export const getHtml = (_req: IncomingMessage, res: Response) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(swaggerHtml);
};

export const getOpenapiJson = (_req: IncomingMessage, res: Response) => {
  fs.readFile(path.resolve("./openapi.json"), (err, spec) => {
    if (err) {
      return handleError(res, err);
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(spec);
  });
};

export const getCss = (_req: IncomingMessage, res: Response) => {
  fs.readFile(
    path.join(path.resolve("./node_modules/swagger-ui-dist/swagger-ui.css")),
    (err, css) => {
      if (err) {
        return handleError(res, err);
      }

      res.writeHead(200, {
        "Content-Type": "text/css; charset=utf-8",
        "Cache-Control": "public, max-age=31536000, immutable",
      });
      res.end(css);
    },
  );
};

export const getJS = (_req: IncomingMessage, res: Response) => {
  fs.readFile(
    path.join(
      path.resolve("./node_modules/swagger-ui-dist/swagger-ui-bundle.js"),
    ),
    "utf8",
    (err, js) => {
      if (err) {
        return handleError(res, err);
      }

      res.writeHead(200, {
        "Content-Type": "text/javascript; charset=utf-8",
        "Cache-Control": "public, max-age=31536000, immutable",
      });
      res.end(js);
    },
  );
};

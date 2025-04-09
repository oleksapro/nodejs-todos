import { IncomingMessage, ServerResponse } from "node:http";

export type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

export type ResponseMod = ServerResponse<IncomingMessage> & {
  req: IncomingMessage;
};
export type RequestMod = IncomingMessage & {
  context: { user?: Record<string, unknown> };
};

export type RouteParams = Record<string, string>;
export type QueryParams = Record<string, string>;
export type RequestBody = Record<string, unknown>;
export type RequestContext = {
  params: RouteParams;
  queryParams: QueryParams;
  body?: RequestBody;
};

export type Handler = (
  req: IncomingMessage,
  res: ResponseMod,
  context: RequestContext,
) => void;

export type Route = { path: string; method: HttpMethod; handler: Handler };

import { Context, MiddlewareHandler, Next } from "hono";
import { verify } from "hono/jwt";

const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization") || "";
  const token = authHeader?.split(" ").at(-1);

  if (!token) {
    c.status(403);
    return c.json({
      success: false,
      message: "Auth token not provided",
    });
  }

  const decoded: {
    id: string;
    email: string;
  } = await verify(token, c.env.JWT_SECRET);

  c.set("userId", decoded.id);
  await next();
};

export default authMiddleware;

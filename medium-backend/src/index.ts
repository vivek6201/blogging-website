import { Hono } from "hono";
import routes from "./routes";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.route("/api/v1", routes);

export default app;

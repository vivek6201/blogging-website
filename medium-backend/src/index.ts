import { Hono } from "hono";
import routes from "./routes";
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.use('/api/*', cors())

app.route("/api/v1", routes);

export default app;

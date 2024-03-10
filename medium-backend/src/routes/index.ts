import { Hono } from "hono";
import { userRoutes } from "./userRoutes";
import { postRoutes } from "./postRoutes";

const routes = new Hono();

routes.route("/user", userRoutes);
routes.route("/posts", postRoutes);

export default routes;

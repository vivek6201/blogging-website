import { Hono } from "hono";
import {
  createPostController,
  deletPostController,
  getAllPostController,
  getPostController,
  getSinglePostController,
  updatePostController,
} from "../controllers/postController";
import authMiddleware from "../middlewares/authMiddleware";

export const postRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

postRoutes.get("/all",getAllPostController);

//apply auth middleware
postRoutes.use("/*",authMiddleware);

postRoutes.get("/by-user", getPostController);
postRoutes.get("/:id", getSinglePostController);
postRoutes.post("/create", createPostController);
postRoutes.put("/update/:id", updatePostController);
postRoutes.delete("/delete", deletPostController);

import { Hono } from "hono";
import {
  getUserController,
  signinController,
  signupController,
} from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

export const userRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

//routes
userRoutes.get("/", authMiddleware, getUserController);
userRoutes.post("/signup", signupController);
userRoutes.post("/signin", signinController);

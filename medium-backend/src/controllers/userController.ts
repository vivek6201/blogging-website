import { signinValidations, signupValidations } from "@vivek6201/common";
import { Context } from "hono";
import { hash } from "bcryptjs";
import { sign } from "hono/jwt";
import getPrismaClient from "../config/db";

export const getUserController = async (c: Context) => {
  const userId = c.get("userId");

  try {
    const user = await getPrismaClient(c).user.findFirst({
      where: {
        id: userId,
      },
      select: {
        createdAt: true,
        email: true,
        firstName: true,
        id: true,
        lastName: true,
        profile: true,
      },
    });

    if (!user) {
      c.status(404);
      return c.json({
        success: false,
        message: "user not found",
      });
    }

    c.status(200);
    return c.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({
      success: false,
      message: "internal server error",
    });
  }
};

export const signupController = async (c: Context) => {
  const body = await c.req.json();

  const validatedBody = signupValidations.safeParse(body);

  if (!validatedBody.success) {
    c.status(400);
    return c.json({
      success: false,
      message: validatedBody.error.issues.map((issue) => {
        return {
          path: issue.path[0],
          message: issue.message,
        };
      }),
    });
  }

  const hashedPass = await hash(validatedBody.data.password, 10);

  try {
    const newUser = await getPrismaClient(c).user.create({
      data: {
        email: validatedBody.data.email,
        firstName: validatedBody.data.firstName,
        lastName: validatedBody.data.lastName,
        password: hashedPass,
      },
    });

    const payload = {
      id: newUser.id,
      email: newUser.email,
    };

    const token = await sign(payload, c.env.JWT_SECRET);

    c.status(201);
    return c.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error(error);
    c.status(403);
    return c.json({
      success: false,
      message: "Failed to create db entry",
    });
  }
};

export const signinController = async (c: Context) => {
  const body = await c.req.json();
  const validatedBody = signinValidations.safeParse(body);

  if (!validatedBody.success) {
    return c.json({
      success: false,
      message: validatedBody.error.issues.map((issue) => {
        return {
          path: issue.path[0],
          message: issue.message,
        };
      }),
    });
  }

  try {
    const userExists = await getPrismaClient(c).user.findFirst({
      where: {
        email: validatedBody.data.email,
      },
    });

    if (!userExists) {
      c.status(403);
      return c.json({
        success: false,
        messagE: "user not found",
      });
    }

    const payload = {
      id: userExists.id,
      email: userExists.email,
    };

    const token = await sign(payload, c.env.JWT_SECRET);

    c.status(200);
    return c.json({
      success: true,
      id: userExists.id,
      token,
    });
  } catch (error) {
    c.status(500);
    return c.json({
      success: false,
      message: "Internal server error",
    });
  }
};

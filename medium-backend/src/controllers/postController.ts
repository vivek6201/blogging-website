import { Context } from "hono";
import getPrismaClient from "../config/db";
import { createBlog } from "@vivek6201/common";

export const getAllPostController = async (c: Context) => {
  try {
    const posts = await getPrismaClient(c).post.findMany({
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    c.status(200);
    return c.json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error(error);
    return c.json({
      success: false,
      message: "Error while fetching posts",
    });
  }
};

export const getPostController = async (c: Context) => {
  try {
    const userId = c.get("userId");
    const posts = await getPrismaClient(c).post.findMany({
      where: {
        authorId: userId,
      },
    });

    c.status(200);
    return c.json({
      success: true,
      posts,
    });
  } catch (error) {
    return c.json({
      success: false,
      message: "Failed to fetch posts",
    });
  }
};

export const createPostController = async (c: Context) => {
  const body = await c.req.json();

  const validatedBody = createBlog.safeParse(body);

  if (!validatedBody.success) {
    return c.json({
      success: false,
      error: validatedBody.error.issues.map((issue) => {
        return {
          path: issue.path[0],
          message: issue.message,
        };
      }),
    });
  }

  const userId = c.get("userId");

  try {
    const newPost = await getPrismaClient(c).post.create({
      data: {
        content: validatedBody.data.content,
        published: validatedBody.data.published,
        title: validatedBody.data.title,
        authorId: userId,
      },
    });

    c.status(201);
    return c.json({
      success: true,
      newPost,
    });
  } catch (error) {
    console.error(error);
    return c.json({
      success: false,
      message: "failed to create entry",
    });
  }
};

export const updatePostController = async (c: Context) => {
  const body = await c.req.json();
  const id = c.req.param("id");
  const validatedBody = createBlog.partial().safeParse(body);
  const userId = c.get("userId");

  if (!validatedBody.success) {
    return c.json({
      success: false,
      error: validatedBody.error.issues.map((issue) => {
        return {
          path: issue.path[0],
          message: issue.message,
        };
      }),
    });
  }

  try {
    const updatedPost = await getPrismaClient(c).post.update({
      where: {
        id,
        authorId: userId,
      },
      data: validatedBody.data,
    });

    c.status(200);
    return c.json({
      success: true,
      updatedPost,
    });
  } catch (error) {
    console.error(error);
    return c.json({
      success: false,
      message: "failed to update data",
    });
  }
};

export const getSinglePostController = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const post = await getPrismaClient(c).post.findFirst({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    c.status(200);
    return c.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error(error);
    return c.json({
      success: false,
      message: "failed to fetch data",
    });
  }
};

export const deletPostController = async (c: Context) => {};

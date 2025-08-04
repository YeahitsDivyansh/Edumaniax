import prisma from "../utils/prisma.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Get all blogs
export const getAllBlogs = async (req, res) => {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      module: true,
      introduction: true,
      imageUrl: true,
      createdAt: true,
      readTime: true,
    },
  });
  res.json(blogs);
};

// Get single blog by ID + similar blogs
export const getBlogById = async (req, res) => {
  const blog = await prisma.blog.findUnique({
    where: { id: req.params.id },
    include: { comments: true },
  });

  const similar = await prisma.blog.findMany({
    where: {
      module: blog.module,
      NOT: { id: blog.id },
    },
    take: 5,
  });

  res.json({ blog, similar });
};

// Post a blog
export const createBlog = async (req, res) => {
  try {
    let {
      title,
      module,
      metaDescription,
      tableOfContents,
      introduction,
      readTime,
    } = req.body;

    if (
      !title ||
      !module ||
      !metaDescription ||
      !tableOfContents ||
      !introduction ||
      !readTime ||
      !req.file
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Parse and validate tableOfContents
    if (typeof tableOfContents === "string") {
      try {
        tableOfContents = JSON.parse(tableOfContents);
        const isValid =
          Array.isArray(tableOfContents) &&
          tableOfContents.every(
            (point) =>
              typeof point === "object" &&
              (point.heading === undefined ||
                typeof point.heading === "string") &&
              (point.explanation === undefined ||
                Array.isArray(point.explanation)) &&
              (point.reflection === undefined ||
                typeof point.reflection === "string")
          );
        if (!isValid) throw new Error();
      } catch (err) {
        return res
          .status(400)
          .json({ message: "Invalid tableOfContents format" });
      }
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      cloud_name: process.env.CLOUD_NAME,
      api_secret: process.env.CLOUD_API_SECRET,
      api_key: process.env.CLOUD_API_KEY,
      resource_type: "image",
      secure: true,
      folder: "blogs",
    });

    fs.unlinkSync(req.file.path); // delete local file

    const blog = await prisma.blog.create({
      data: {
        title,
        module,
        metaDescription,
        tableOfContents,
        introduction,
        imageUrl: result.secure_url,
        imageId: result.public_id,
        readTime,
      },
    });

    res.status(201).json({ message: "Blog created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: req.params.id },
    });

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // 1. Delete associated comments
    await prisma.comment.deleteMany({
      where: { blogId: req.params.id },
    });

    // 2. Delete from Cloudinary
    await cloudinary.uploader.destroy(blog.imageId, {
      cloud_name: process.env.CLOUD_NAME,
      api_secret: process.env.CLOUD_API_SECRET,
      api_key: process.env.CLOUD_API_KEY,
      resource_type: "image",
      secure: true,
      folder: "blogs",
    });

    // 2. Delete from DB
    await prisma.blog.delete({ where: { id: req.params.id } });

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Post a comment
export const postComment = async (req, res) => {
  const { blogId, name, content } = req.body;
  const comment = await prisma.comment.create({
    data: { blogId, name, content },
  });
  res.json(comment);
};

export const getCommentsByUser = async (req, res) => {
  try {
    const name = req.params.name;

    const comments = await prisma.comment.findMany({
      where: { name },
      include: {
        blog: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { date: "desc" },
    });

    const formatted = comments.map((c) => ({
      blogId: c.blog.id,
      blogTitle: c.blog.title,
      comment: c.content,
      date: c.date,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching user comments:", err);
    res.status(500).json({ message: "Server error" });
  }
};

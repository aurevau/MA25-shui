import { z } from "zod";

export const postSchema = z.object({
    title: z.string().trim().min(1).max(100),
    content: z.string().trim().min(1).max(2000),
});

export const listPostsQuerySchema = z.object({
    username: z.string().min(1).optional()
}).strict();

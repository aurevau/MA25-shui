import { randomUUID } from "node:crypto";
import * as commentRepository from "../repositores/comments.mjs";
import { getPost } from "./post-service.mjs";

export const createComment = async (postId, { content }, user) => {
    await getPost(postId);
    const comment = {
        id: `comment-${randomUUID()}`,
        postId,
        username: user.username,
        content,
        createdAt: new Date().toISOString(),
    };
    await commentRepository.createComment(comment);
    return { message: 'Comment created successfully', comment };
};

export const getComments = async (postId) => {
    await getPost(postId);
    return commentRepository.getComments(postId);
}
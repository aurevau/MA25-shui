import { randomUUID } from 'node:crypto';
import * as posts from '../repositores/posts-repository.mjs';
import { generateGuestName } from '../utils/guest-name.mjs';
import { createError } from '@middy/util';

export const createPost = async ({ title, content }, user) => {
    const now = new Date().toISOString();
    const post = {
        id: `post-${randomUUID()}`,
        username: user ? user.username : generateGuestName(),
        isGuest: !user,
        title,
        content,
        createdAt: now,
        updatedAt: now,
    };
    await posts.createPost(post);
    return { message: 'Post created successfully', post };
};

export const listPosts = (username) => posts.listPosts(username);

export const getPost = async (postId) => {
    const post = await posts.getPost(postId);
    if (!post) throw createError(404, 'Post not found');
    return post;
};

export const updatePost = async (post, { title, content }) =>
    posts.updatePost({
        ...post, title, content, updatedAt: new Date().toISOString()
    });


export const deletePost = async (postId) => {
    await posts.deletePostWithComments(postId);
};
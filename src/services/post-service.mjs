import { randomUUID } from 'node:crypto';
import * as posts from '../repositores/posts.mjs';
import { generateGuestName } from '../utils/guest-name.mjs';

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
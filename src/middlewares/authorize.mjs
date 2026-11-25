import { createError } from "@middy/util";
import { getRawPost } from "../repositores/posts-repository.mjs";

export const authorizePostOwner = () => ({
    before: async ({ event }) => {
        const post = await getRawPost(event.pathParameters.postId);
        if (!post) throw createError(404, 'Post not found');
        if (post.isGuest || post.username !== event.user.username) {
            throw createError(403, 'You are not allowed to modify this post');
        }
        event.post = post;
    },
});
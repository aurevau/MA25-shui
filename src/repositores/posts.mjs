import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLE } from "./db.mjs";

const key = (id) => ({
    PK: `POST#${id}`,
    SK: 'META'
});

export const createPost = async (post) => {
    await db.send(
        new PutCommand({
            TableName: TABLE,
            Item: {
                ...key(post.id),
                GSI1PK: 'POSTS',
                GSI1SK: post.createdAt,
                GSI2PK: `USER#${post.username}`,
                GSI2SK: post.createdAt,
                ...post,
            },
        })
    );
    return post;
};
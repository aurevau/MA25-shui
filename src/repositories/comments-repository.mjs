import { QueryCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLE } from "./db.mjs";

export const createComment = async (comment) => {
    await db.send(
        new PutCommand({
            TableName: TABLE,
            Item: {
                PK: `POST#${comment.postId}`,
                SK: `COMMENT#${comment.createdAt}#${comment.id}`,
                ...comment,
            }
        })
    );
    return comment;
}

const toComment = ({ id, postId, username, content, createdAt }) => ({
    id, 
    postId,
    username,
    content,
    createdAt
});

export const getComments = async (postId) => {
    const { Items } = await db.send(
        new QueryCommand({
            TableName: TABLE,
            KeyConditionExpression: 'PK = :pk AND begins_with(SK, :c)',
            ExpressionAttributeValues: {':pk': `POST#${postId}`, ':c': 'COMMENT#'},
        })
    );
    return Items.map(toComment);
};



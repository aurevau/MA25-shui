import { PutCommand } from "@aws-sdk/lib-dynamodb";
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
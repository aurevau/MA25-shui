import { QueryCommand, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
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

const toPost = ({ id, username, isGuest, title, content, createdAt, updatedAt }) => ({
    id,
    username,
    isGuest,
    title,
    content,
    createdAt,
    updatedAt,
});

export const getPost = async (id) => {
    const { Item } = await db.send(new GetCommand({
        TableName: TABLE,
        Key: key(id)
    }));
    return Item ? toPost(Item) : null;
}

export const listPosts = async (username) => {
    const index = username
        ? { IndexName: 'GSI2', pk: 'GSI2PK', value: `USER#${username}` }
        : { IndexName: 'GSI1', pk: 'GSI1PK', value: 'POSTS' };

    const { Items } = await db.send(
        new QueryCommand({
            TableName: TABLE,
            IndexName: index.IndexName,
            KeyConditionExpression: `${index.pk} = :pk`,
            ExpressionAttributeValues: { ':pk': index.value },
            ScanIndexForward: false,
        })
    );
    return Items.map(toPost);
}
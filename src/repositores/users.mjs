import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLE } from './db.mjs';

// Returns false if username already exists 
export const createUser = async ({ username, passwordHash }) => {
    try {
        await db.send(
            new PutCommand({
                TableName: TABLE,
                Item: {
                    PK: `USER#${username}`,
                    SK: 'PROFILE',
                    username,
                    passwordHash,
                    createdAt: new Date().toISOString(),
                },
                ConditionExpression: 'attribute_not_exists(PK)',
            })
        );
        return true;
    } catch (error) {
        if (error.name == 'ConditionalCheckFailedException') return false;
        throw error;
    }
};
# MA25 - Shui

A REST API for a message board. Users can register, log in, write posts and comment on them. Guests can also write posts and gets a generated username based on animals combined with numbers. 

Built with AWS Lambda, API Gateway, and DynamoDB using the Serverless Framework. 

**API URL**
https://j0gezj2010.execute-api.eu-north-1.amazonaws.com

## Run it
1. Install the packages:
   
   ```bash 
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in the values:
   
   ```bash
   cp .env.example .env
   ```
   - `AWS_ORG`: your Serverless org
   - `AWS_ROLE`: the ARN of the IAM role
   - `TABLE_NAME`: name of the DynamoDB table
   - `JWT_SECRET`: a long random string
4. Deploy:
   
   ```bash
   sls deploy
   ```

## Endpoints
- POST - https://j0gezj2010.execute-api.eu-north-1.amazonaws.com/auth/register
- POST - https://j0gezj2010.execute-api.eu-north-1.amazonaws.com/auth/login
- POST - https://j0gezj2010.execute-api.eu-north-1.amazonaws.com/posts
- GET - https://j0gezj2010.execute-api.eu-north-1.amazonaws.com/posts
- GET - https://j0gezj2010.execute-api.eu-north-1.amazonaws.com/posts/{postId}
- PUT - https://j0gezj2010.execute-api.eu-north-1.amazonaws.com/posts/{postId}
- DELETE - https://j0gezj2010.execute-api.eu-north-1.amazonaws.com/posts/{postId}
- POST - https://j0gezj2010.execute-api.eu-north-1.amazonaws.com/posts/{postId}/comments
- GET - https://j0gezj2010.execute-api.eu-north-1.amazonaws.com/posts/{postId}/comments


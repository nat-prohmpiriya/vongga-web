# Backend Architecture Documentation

## Clean Architecture Overview

The backend follows Clean Architecture principles with the following layers:

### 1. Entities (Core Business Objects)
- User
- Post
- Comment
- Like
- Page
- Event
- Shop
- Article
- Chat

### 2. Use Cases (Application Business Rules)
- Authentication Service
- Post Service
- Comment Service
- Feed Service
- Event Service
- Chat Service
- Media Service
- Shop Service

### 3. Interface Adapters
- REST Controllers
- GraphQL Resolvers
- Socket.IO Event Handlers
- Repository Implementations
- External Service Adapters (Firebase, etc.)

### 4. Frameworks & Drivers
- Go Fiber Framework
- PostgreSQL Driver
- Redis Client
- Firebase Admin SDK

## Database Schema

### PostgreSQL Tables

```sql
-- Core User Management
users
  - id (UUID)
  - email
  - phone_number
  - firebase_uid
  - created_at
  - updated_at

profiles
  - user_id (FK)
  - display_name
  - avatar_url
  - bio
  - settings (JSONB)

-- Content Management
posts
  - id
  - user_id (FK)
  - content
  - media_urls (ARRAY)
  - privacy_level
  - created_at
  - updated_at

comments
  - id
  - post_id (FK)
  - user_id (FK)
  - parent_id (FK, self-reference)
  - content
  - created_at

likes
  - id
  - user_id (FK)
  - target_id
  - target_type (post/comment)
  - created_at

-- Pages & Events
pages
  - id
  - owner_id (FK)
  - name
  - description
  - category
  - settings (JSONB)

events
  - id
  - page_id (FK)
  - title
  - description
  - start_time
  - end_time
  - location

-- Shop System
shops
  - id
  - page_id (FK)
  - name
  - description
  - settings (JSONB)

products
  - id
  - shop_id (FK)
  - name
  - description
  - price
  - stock
  - status

-- Articles
articles
  - id
  - user_id (FK)
  - title
  - content
  - status
  - published_at
```

### Redis Data Structures

1. **Caching**
   ```
   user:{id}:profile -> Hash (user profile data)
   post:{id} -> Hash (post data)
   feed:{user_id} -> Sorted Set (post IDs with timestamps)
   ```

2. **Real-time Features**
   ```
   online_users -> Set (user IDs)
   user:{id}:sessions -> Set (session IDs)
   chat:{room_id}:messages -> List (recent messages)
   ```

3. **Rate Limiting**
   ```
   ratelimit:{ip} -> String (counter with TTL)
   ratelimit:{user_id}:{action} -> String (counter with TTL)
   ```

## API Endpoints

### RESTful API

```
/api/v1
├── /auth
│   ├── POST /login
│   ├── POST /register
│   └── POST /refresh-token
│
├── /users
│   ├── GET /:id
│   ├── PUT /:id
│   └── GET /:id/profile
│
├── /posts
│   ├── GET /
│   ├── POST /
│   ├── GET /:id
│   ├── PUT /:id
│   └── DELETE /:id
│
├── /comments
│   ├── GET /post/:postId
│   ├── POST /
│   └── DELETE /:id
```

### GraphQL Schema

```graphql
type User {
  id: ID!
  email: String
  profile: Profile
  posts: [Post]
  pages: [Page]
}

type Post {
  id: ID!
  author: User!
  content: String!
  mediaUrls: [String]
  likes: Int!
  comments: [Comment]
  createdAt: DateTime!
}

type Comment {
  id: ID!
  post: Post!
  author: User!
  content: String!
  replies: [Comment]
}
```

### Socket.IO Events

```
Connection Events:
- connect
- disconnect

Chat Events:
- join_room
- leave_room
- new_message
- message_read

Real-time Updates:
- post_created
- comment_added
- like_updated
```

## Authentication Flow

1. **Firebase Authentication**
   - Client authenticates with Firebase
   - Firebase returns ID token
   - Backend verifies token using Firebase Admin SDK
   - Backend creates/updates user session

2. **Session Management**
   - JWT tokens for API authentication
   - Redis for session storage
   - Refresh token rotation

## Deployment Architecture

```
Client -> CDN -> Load Balancer -> API Servers -> Services
                                             -> PostgreSQL
                                             -> Redis
                                             -> Firebase
```

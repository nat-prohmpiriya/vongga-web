# API Documentation

## Authentication

### Firebase Authentication Endpoints

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/verify-phone
POST /api/v1/auth/refresh-token
```

## Social Features

### Posts

```http
GET /api/v1/posts
POST /api/v1/posts
GET /api/v1/posts/{id}
PUT /api/v1/posts/{id}
DELETE /api/v1/posts/{id}
```

#### Request Body (Create Post)
```json
{
  "content": "string",
  "mediaUrls": ["string"],
  "privacy": "public|friends|private",
  "location": {
    "lat": number,
    "lng": number,
    "name": "string"
  }
}
```

### Comments

```http
GET /api/v1/posts/{postId}/comments
POST /api/v1/comments
PUT /api/v1/comments/{id}
DELETE /api/v1/comments/{id}
```

### Likes

```http
POST /api/v1/likes
DELETE /api/v1/likes/{id}
GET /api/v1/posts/{postId}/likes
```

### Feed

```http
GET /api/v1/feed
GET /api/v1/feed/trending
GET /api/v1/feed/following
```

## Pages & Events

### Pages

```http
POST /api/v1/pages
GET /api/v1/pages/{id}
PUT /api/v1/pages/{id}
DELETE /api/v1/pages/{id}
GET /api/v1/pages/{id}/followers
```

### Events

```http
POST /api/v1/events
GET /api/v1/events/{id}
PUT /api/v1/events/{id}
DELETE /api/v1/events/{id}
POST /api/v1/events/{id}/rsvp
```

## Shop

### Products

```http
GET /api/v1/products
POST /api/v1/products
GET /api/v1/products/{id}
PUT /api/v1/products/{id}
DELETE /api/v1/products/{id}
```

### Orders

```http
POST /api/v1/orders
GET /api/v1/orders/{id}
PUT /api/v1/orders/{id}/status
GET /api/v1/orders/my-orders
```

## Chat

### WebSocket Events

```javascript
// Connection
socket.on('connect', callback)
socket.on('disconnect', callback)

// Chat
socket.on('message', callback)
socket.emit('send_message', data)
socket.on('typing', callback)
socket.emit('typing_start', data)
socket.emit('typing_end', data)

// Presence
socket.on('user_online', callback)
socket.on('user_offline', callback)
```

## GraphQL Schema

### Queries

```graphql
type Query {
  user(id: ID!): User
  post(id: ID!): Post
  posts(filter: PostFilter): [Post!]!
  feed(cursor: String, limit: Int): FeedConnection!
  page(id: ID!): Page
  event(id: ID!): Event
  products(filter: ProductFilter): [Product!]!
}

type Mutation {
  createPost(input: CreatePostInput!): Post!
  updatePost(id: ID!, input: UpdatePostInput!): Post!
  deletePost(id: ID!): Boolean!
  
  createComment(input: CreateCommentInput!): Comment!
  toggleLike(targetId: ID!, targetType: LikeTargetType!): Like
  
  createPage(input: CreatePageInput!): Page!
  createEvent(input: CreateEventInput!): Event!
}

type Subscription {
  messageReceived(chatId: ID!): Message!
  postCreated: Post!
  notificationReceived: Notification!
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 400  | Bad Request - Invalid input parameters |
| 401  | Unauthorized - Authentication required |
| 403  | Forbidden - Insufficient permissions |
| 404  | Not Found - Resource doesn't exist |
| 409  | Conflict - Resource already exists |
| 422  | Unprocessable Entity - Validation failed |
| 429  | Too Many Requests - Rate limit exceeded |
| 500  | Internal Server Error |

## Rate Limiting

- API requests: 100 requests per minute per IP
- Login attempts: 5 attempts per 15 minutes
- Media upload: 50 uploads per hour per user

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": {
      // Additional error details
    }
  }
}
```

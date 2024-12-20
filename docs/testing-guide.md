# Testing Guide

## Testing Strategy

### 1. Unit Testing

#### Backend (Go)
```go
// user_service_test.go
func TestCreateUser(t *testing.T) {
    tests := []struct {
        name    string
        input   CreateUserInput
        want    *User
        wantErr bool
    }{
        {
            name: "valid user",
            input: CreateUserInput{
                Email: "test@example.com",
                Name:  "Test User",
            },
            want: &User{
                Email: "test@example.com",
                Name:  "Test User",
            },
            wantErr: false,
        },
    }
    
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := service.CreateUser(tt.input)
            if (err != nil) != tt.wantErr {
                t.Errorf("CreateUser() error = %v, wantErr %v", err, tt.wantErr)
                return
            }
            if !reflect.DeepEqual(got, tt.want) {
                t.Errorf("CreateUser() = %v, want %v", got, tt.want)
            }
        })
    }
}
```

#### Frontend (React)
```typescript
// Post.test.tsx
import { render, fireEvent } from '@testing-library/react';

describe('Post Component', () => {
    it('should render post content', () => {
        const post = {
            id: '1',
            content: 'Test post',
            author: {
                name: 'Test User'
            }
        };
        
        const { getByText } = render(<Post post={post} />);
        expect(getByText('Test post')).toBeInTheDocument();
    });

    it('should handle like action', () => {
        const onLike = jest.fn();
        const { getByTestId } = render(
            <Post post={post} onLike={onLike} />
        );
        
        fireEvent.click(getByTestId('like-button'));
        expect(onLike).toHaveBeenCalled();
    });
});
```

### 2. Integration Testing

#### API Testing
```typescript
// api.test.ts
describe('Post API', () => {
    it('should create a new post', async () => {
        const response = await request(app)
            .post('/api/v1/posts')
            .send({
                content: 'Test post',
                mediaUrls: []
            })
            .set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(201);
        expect(response.body.data.content).toBe('Test post');
    });
});
```

#### Database Testing
```go
// repository_test.go
func TestPostRepository(t *testing.T) {
    db := setupTestDB()
    defer db.Close()
    
    repo := NewPostRepository(db)
    
    t.Run("CreatePost", func(t *testing.T) {
        post := &Post{
            Content: "Test post",
            AuthorID: 1,
        }
        
        err := repo.Create(post)
        assert.NoError(t, err)
        assert.NotZero(t, post.ID)
    })
}
```

### 3. End-to-End Testing

```typescript
// Cypress test
describe('Feed Page', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/feed');
    });

    it('should create and display a new post', () => {
        // Create post
        cy.get('[data-testid="post-input"]')
            .type('New test post');
        cy.get('[data-testid="post-submit"]')
            .click();

        // Verify post appears in feed
        cy.get('[data-testid="post-content"]')
            .should('contain', 'New test post');
    });

    it('should like and comment on a post', () => {
        // Like post
        cy.get('[data-testid="like-button"]')
            .first()
            .click();

        // Add comment
        cy.get('[data-testid="comment-input"]')
            .first()
            .type('Test comment');
        cy.get('[data-testid="comment-submit"]')
            .first()
            .click();

        // Verify comment appears
        cy.get('[data-testid="comment-content"]')
            .should('contain', 'Test comment');
    });
});
```

## Performance Testing

### 1. Load Testing (k6)

```javascript
// load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 50 },  // Ramp up
        { duration: '3m', target: 50 },  // Stay at 50 users
        { duration: '1m', target: 0 },   // Ramp down
    ],
};

export default function () {
    const res = http.get('https://api.vongga.com/feed');
    
    check(res, {
        'is status 200': (r) => r.status === 200,
        'response time < 500ms': (r) => r.timings.duration < 500,
    });
    
    sleep(1);
}
```

### 2. Stress Testing

```javascript
// stress-test.js
export const options = {
    scenarios: {
        stress: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '2m', target: 100 },
                { duration: '5m', target: 100 },
                { duration: '2m', target: 200 },
                { duration: '5m', target: 200 },
                { duration: '2m', target: 300 },
                { duration: '5m', target: 300 },
                { duration: '2m', target: 0 },
            ],
        },
    },
};
```

## Security Testing

### 1. Authentication Testing
```typescript
describe('Authentication', () => {
    it('should prevent unauthorized access', async () => {
        const response = await request(app)
            .get('/api/v1/protected-route');
        
        expect(response.status).toBe(401);
    });

    it('should validate JWT token', async () => {
        const response = await request(app)
            .get('/api/v1/protected-route')
            .set('Authorization', 'Bearer invalid-token');
        
        expect(response.status).toBe(401);
    });
});
```

### 2. Authorization Testing
```typescript
describe('Authorization', () => {
    it('should prevent access to other user\'s data', async () => {
        const response = await request(app)
            .get('/api/v1/users/123/private-data')
            .set('Authorization', `Bearer ${userToken}`);
        
        expect(response.status).toBe(403);
    });
});
```

## Test Coverage

### Backend
```bash
# Go test coverage
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out -o coverage.html
```

### Frontend
```bash
# Jest coverage
npm test -- --coverage
```

## Continuous Testing

### GitHub Actions Configuration
```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Go
      uses: actions/setup-go@v2
      with:
        go-version: 1.21
    
    - name: Run backend tests
      run: |
        cd backend
        go test -v ./...
    
    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '20'
    
    - name: Run frontend tests
      run: |
        cd frontend
        npm install
        npm test
    
    - name: Run E2E tests
      run: |
        npm run cypress:run
```

## Test Data Management

### 1. Fixtures
```json
{
    "users": [
        {
            "id": 1,
            "email": "test@example.com",
            "name": "Test User"
        }
    ],
    "posts": [
        {
            "id": 1,
            "content": "Test post",
            "authorId": 1
        }
    ]
}
```

### 2. Factories
```typescript
// factories/user.ts
export const createUser = (overrides = {}) => ({
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    name: faker.name.findName(),
    ...overrides
});

// factories/post.ts
export const createPost = (overrides = {}) => ({
    id: faker.datatype.uuid(),
    content: faker.lorem.paragraph(),
    authorId: faker.datatype.uuid(),
    createdAt: faker.date.recent(),
    ...overrides
});
```

# Architecture Diagrams

## System Architecture

```mermaid
graph TD
    Client[Client Applications] --> LB[Load Balancer]
    LB --> API[API Gateway]
    
    subgraph Services
        API --> Auth[Auth Service]
        API --> Post[Post Service]
        API --> User[User Service]
        API --> Feed[Feed Service]
        API --> Chat[Chat Service]
        API --> Shop[Shop Service]
        API --> Media[Media Service]
    end
    
    subgraph Storage
        Auth --> Firebase[Firebase]
        Post --> DB[(PostgreSQL)]
        User --> DB
        Feed --> Cache[(Redis)]
        Chat --> Cache
        Shop --> DB
        Media --> S3[Object Storage]
    end
```

## Database Schema

```mermaid
erDiagram
    users ||--o{ posts : creates
    users ||--o{ comments : writes
    users ||--o{ likes : gives
    users ||--o{ pages : owns
    
    posts ||--o{ comments : has
    posts ||--o{ likes : receives
    posts ||--o{ media : contains
    
    pages ||--o{ posts : contains
    pages ||--o{ events : organizes
    pages ||--o{ products : sells
    
    comments ||--o{ likes : receives
    comments ||--o{ comments : has

    USERS {
        uuid id PK
        string email
        string phone_number
        string firebase_uid
        timestamp created_at
    }
    
    POSTS {
        uuid id PK
        uuid user_id FK
        text content
        json media_urls
        string privacy_level
        timestamp created_at
    }
    
    COMMENTS {
        uuid id PK
        uuid post_id FK
        uuid user_id FK
        uuid parent_id FK
        text content
        timestamp created_at
    }
```

## Authentication Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant API as API Gateway
    participant Auth as Auth Service
    participant FB as Firebase
    participant DB as Database
    
    C->>FB: Login with provider
    FB-->>C: Return Firebase token
    C->>API: Request with Firebase token
    API->>Auth: Validate token
    Auth->>FB: Verify token
    FB-->>Auth: Token info
    Auth->>DB: Get/Create user
    Auth-->>API: User info + JWT
    API-->>C: Response with JWT
```

## Real-time Communication

```mermaid
sequenceDiagram
    participant C as Client
    participant WS as WebSocket Server
    participant Redis as Redis PubSub
    participant SVC as Services
    
    C->>WS: Connect with JWT
    WS->>WS: Authenticate
    WS->>Redis: Subscribe to user channels
    
    loop Real-time updates
        SVC->>Redis: Publish event
        Redis->>WS: Forward event
        WS->>C: Send event
    end
```

## Clean Architecture

```mermaid
flowchart TD
    subgraph External Layer
        UI[UI/Controllers]
        DB[(Database)]
        Ext[External Services]
    end
    
    subgraph Adapter Layer
        Ctrl[Controllers]
        Pres[Presenters]
        Gate[Gateways]
    end
    
    subgraph Use Case Layer
        Inter[Interactors]
        InPort[Input Ports]
        OutPort[Output Ports]
    end
    
    subgraph Entity Layer
        Model[Domain Models]
        Rule[Business Rules]
    end
    
    UI --> Ctrl
    Ctrl --> InPort
    InPort --> Inter
    Inter --> OutPort
    OutPort --> Pres
    Inter --> Model
    Model --> Rule
    Gate --> DB
    Gate --> Ext
```

## Data Flow

```mermaid
graph LR
    subgraph Client
        UI[User Interface]
        State[State Management]
    end
    
    subgraph API Layer
        REST[REST API]
        GQL[GraphQL]
        WS[WebSocket]
    end
    
    subgraph Services
        Auth[Auth Service]
        Post[Post Service]
        Feed[Feed Service]
    end
    
    subgraph Storage
        Cache[(Redis)]
        DB[(PostgreSQL)]
        Files[File Storage]
    end
    
    UI <--> State
    State <--> REST
    State <--> GQL
    State <--> WS
    
    REST --> Services
    GQL --> Services
    WS --> Services
    
    Services --> Cache
    Services --> DB
    Services --> Files
```

## Deployment Architecture

```mermaid
graph TD
    subgraph Client Zone
        Client[Client Apps]
        CDN[CDN]
    end
    
    subgraph Load Balancing
        LB[Load Balancer]
        LB --> API1[API Server 1]
        LB --> API2[API Server 2]
        LB --> API3[API Server 3]
    end
    
    subgraph Database
        PG_Master[(PostgreSQL Master)]
        PG_Slave1[(PostgreSQL Slave 1)]
        PG_Slave2[(PostgreSQL Slave 2)]
        
        PG_Master --> PG_Slave1
        PG_Master --> PG_Slave2
    end
    
    subgraph Caching
        Redis_Master[(Redis Master)]
        Redis_Slave[(Redis Slave)]
        
        Redis_Master --> Redis_Slave
    end
    
    Client --> CDN
    CDN --> LB
    
    API1 --> PG_Master
    API2 --> PG_Master
    API3 --> PG_Master
    
    API1 --> Redis_Master
    API2 --> Redis_Master
    API3 --> Redis_Master
```

## Monitoring Setup

```mermaid
graph TD
    subgraph Applications
        App1[API Server 1]
        App2[API Server 2]
        App3[API Server 3]
    end
    
    subgraph Monitoring
        Prom[Prometheus]
        Graf[Grafana]
        Alert[Alertmanager]
    end
    
    subgraph Logging
        Elastic[Elasticsearch]
        Kibana[Kibana]
        Logstash[Logstash]
    end
    
    App1 --> Prom
    App2 --> Prom
    App3 --> Prom
    
    Prom --> Graf
    Prom --> Alert
    
    App1 --> Logstash
    App2 --> Logstash
    App3 --> Logstash
    
    Logstash --> Elastic
    Elastic --> Kibana
```

## CI/CD Pipeline

```mermaid
graph LR
    subgraph Version Control
        Git[GitHub]
    end
    
    subgraph CI/CD
        Actions[GitHub Actions]
        Tests[Tests]
        Build[Build]
        Push[Push Images]
    end
    
    subgraph Deployment
        K8s[Kubernetes]
        Prod[Production]
        Stage[Staging]
    end
    
    Git --> Actions
    Actions --> Tests
    Tests --> Build
    Build --> Push
    Push --> K8s
    K8s --> Stage
    K8s --> Prod
```

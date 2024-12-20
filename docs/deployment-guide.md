# Deployment Guide

## Infrastructure Overview

```
                                   [CDN/CloudFlare]
                                          ↓
[Client] → [Load Balancer] → [API Gateway] → [Services]
                                          ↓
                            [PostgreSQL] [Redis] [Firebase]
```

## Prerequisites

- Docker and Docker Compose
- Kubernetes cluster
- Cloud provider account (AWS/GCP/Azure)
- Domain name and SSL certificates
- Firebase project credentials

## Environment Variables

### Backend
```env
# Server
PORT=8080
ENV=production
API_VERSION=v1

# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=vongga
POSTGRES_USER=admin
POSTGRES_PASSWORD=secret

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=secret

# Firebase
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=24h

# Storage
STORAGE_BUCKET=your-storage-bucket
```

### Frontend
```env
NEXT_PUBLIC_API_URL=https://api.vongga.com
NEXT_PUBLIC_SOCKET_URL=wss://api.vongga.com
NEXT_PUBLIC_FIREBASE_CONFIG={...}
```

## Docker Configuration

### Backend
```dockerfile
# Backend Dockerfile
FROM golang:1.21-alpine

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o main .

EXPOSE 8080
CMD ["./main"]
```

### Frontend
```dockerfile
# Frontend Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## Kubernetes Deployment

### Backend Service
```yaml
# backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vongga-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: vongga-backend
  template:
    metadata:
      labels:
        app: vongga-backend
    spec:
      containers:
      - name: vongga-backend
        image: vongga/backend:latest
        ports:
        - containerPort: 8080
        env:
        - name: POSTGRES_HOST
          valueFrom:
            secretKeyRef:
              name: db-secrets
              key: host
```

### Frontend Service
```yaml
# frontend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vongga-frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: vongga-frontend
  template:
    metadata:
      labels:
        app: vongga-frontend
    spec:
      containers:
      - name: vongga-frontend
        image: vongga/frontend:latest
        ports:
        - containerPort: 3000
```

## Database Migration

```bash
# Create migration
migrate create -ext sql -dir migrations -seq create_users_table

# Run migration
migrate -database ${POSTGRESQL_URL} -path migrations up

# Rollback
migrate -database ${POSTGRESQL_URL} -path migrations down
```

## Monitoring & Logging

### Prometheus Configuration
```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'vongga-backend'
    static_configs:
      - targets: ['localhost:8080']
```

### Grafana Dashboards
- System metrics
- API endpoints performance
- Error rates
- User activity

## CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Build and push Docker images
        run: |
          docker build -t vongga/backend ./backend
          docker build -t vongga/frontend ./frontend
          docker push vongga/backend
          docker push vongga/frontend
      
      - name: Deploy to Kubernetes
        run: |
          kubectl apply -f k8s/
```

## Backup Strategy

### Database Backup
```bash
# Automated backup script
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"

# Backup PostgreSQL
pg_dump -U $DB_USER -h $DB_HOST $DB_NAME > $BACKUP_DIR/postgres_$TIMESTAMP.sql

# Backup Redis
redis-cli -h $REDIS_HOST SAVE

# Upload to cloud storage
aws s3 cp $BACKUP_DIR/postgres_$TIMESTAMP.sql s3://vongga-backups/
```

## Security Measures

1. **SSL/TLS Configuration**
   - Force HTTPS
   - HSTS enabled
   - Modern cipher suites only

2. **API Security**
   - Rate limiting
   - JWT token validation
   - Input sanitization
   - CORS configuration

3. **Database Security**
   - Encrypted connections
   - Regular security patches
   - Access control lists

4. **Infrastructure Security**
   - Network segmentation
   - Firewall rules
   - Regular security audits

## Scaling Strategy

1. **Horizontal Scaling**
   - Auto-scaling groups
   - Load balancer configuration
   - Session management

2. **Database Scaling**
   - Read replicas
   - Connection pooling
   - Sharding strategy

3. **Caching Strategy**
   - Redis cluster
   - CDN configuration
   - Browser caching

## Troubleshooting Guide

1. **Common Issues**
   - Connection timeouts
   - Database deadlocks
   - Memory leaks
   - High CPU usage

2. **Debugging Tools**
   - Log analysis
   - Profiling tools
   - Monitoring alerts

3. **Recovery Procedures**
   - Service restart
   - Database rollback
   - Cache invalidation

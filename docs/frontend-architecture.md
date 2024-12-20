# Frontend Architecture Documentation

## Web Application (Next.js)

### Project Structure
```
src/
├── app/                    # App router pages
├── components/            
│   ├── common/            # Shared components
│   ├── features/          # Feature-specific components
│   └── layouts/           # Layout components
├── hooks/                 # Custom React hooks
├── services/              # API services
├── store/                 # State management
├── styles/                # Global styles
├── types/                 # TypeScript types
└── utils/                 # Utility functions
```

### Core Technologies
- Next.js 14+
- TypeScript
- TailwindCSS
- React Query
- Zustand (State Management)
- Socket.IO Client
- Firebase SDK

### Key Features Implementation

#### Authentication
```typescript
// services/auth.ts
export const authService = {
  loginWithGoogle: async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  },
  
  loginWithApple: async () => {
    const provider = new OAuthProvider('apple.com');
    return signInWithPopup(auth, provider);
  },
  
  loginWithEmail: async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  },
  
  loginWithPhone: async (phoneNumber: string) => {
    // Phone authentication implementation
  }
};
```

#### Real-time Features
```typescript
// hooks/useSocket.ts
export const useSocket = () => {
  const socket = useMemo(() => {
    return io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      auth: {
        token: getAuthToken()
      }
    });
  }, []);

  return socket;
};
```

#### State Management
```typescript
// store/userStore.ts
interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null })
}));
```

## Mobile Application (React Native)

### Project Structure
```
src/
├── assets/               # Images, fonts, etc.
├── components/          
│   ├── common/          # Shared components
│   ├── features/        # Feature-specific components
│   └── screens/         # Screen components
├── navigation/          # Navigation configuration
├── services/           # API services
├── store/              # State management
├── theme/              # Theme configuration
├── types/              # TypeScript types
└── utils/              # Utility functions
```

### Core Technologies
- React Native
- TypeScript
- React Navigation
- React Native Paper
- React Query
- Zustand
- Socket.IO Client
- Firebase SDK

### Key Features Implementation

#### Navigation
```typescript
// navigation/AppNavigator.tsx
export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

#### Media Handling
```typescript
// services/mediaService.ts
export const mediaService = {
  uploadImage: async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage().ref().child(`images/${Date.now()}`);
    await ref.put(blob);
    return ref.getDownloadURL();
  },
  
  uploadVideo: async (uri: string) => {
    // Video upload implementation
  }
};
```

### Shared Components

#### Post Component
```typescript
// components/features/Post.tsx
interface PostProps {
  post: Post;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
}

export const Post: React.FC<PostProps> = ({
  post,
  onLike,
  onComment,
  onShare
}) => {
  // Post component implementation
};
```

### API Integration

#### API Client
```typescript
// services/api.ts
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

#### GraphQL Integration
```typescript
// services/graphql.ts
export const graphqlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_URL,
  {
    headers: {
      'Content-Type': 'application/json'
    }
  }
);
```

## Shared Features

### Error Handling
```typescript
// utils/errorHandler.ts
export const handleError = (error: any) => {
  if (error.response) {
    // Handle API errors
    return {
      message: error.response.data.message,
      status: error.response.status
    };
  }
  
  if (error.request) {
    // Handle network errors
    return {
      message: 'Network error occurred',
      status: 500
    };
  }
  
  // Handle other errors
  return {
    message: error.message,
    status: 500
  };
};
```

### Authentication Flow
```typescript
// hooks/useAuth.ts
export const useAuth = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  
  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      return response;
    } catch (error) {
      handleError(error);
    }
  };
  
  return {
    user,
    login,
    // Other auth methods
  };
};
```

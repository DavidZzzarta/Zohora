# Zohora API Documentation

## Overview

Zohora is a comprehensive expense tracking application with a robust REST API built using Node.js, Express, and TypeScript. This documentation provides detailed information about all available endpoints, authentication methods, and data models.

## Table of Contents

- [Authentication](#authentication)
- [User Management](#user-management)
- [Financial Management](#financial-management)
- [Error Handling](#error-handling)

## Authentication

### JWT Token Authentication

Zohora uses JWT (JSON Web Tokens) for secure authentication. Tokens are automatically set as HTTP-only cookies when users log in.

**Token Format:**
```json
{
  "user_id": "uuid-string",
  "jti": "unique-token-id",
  "iat": 1234567890,
  "exp": 1234567890
}
```

**Cookie Settings:**
- **Name**: `access_token`
- **HttpOnly**: `true`
- **Secure**: `true` (in production)
- **SameSite**: `strict`
- **MaxAge**: 1 hour

### Google OAuth 2.0

For enhanced security and convenience, Zohora also supports Google OAuth 2.0 authentication.

**OAuth Flow:**
1. User clicks "Sign in with Google"
2. Redirected to Google consent screen
3. User authorizes the application
4. Google redirects back with authorization code
5. Server exchanges code for access token
6. User is authenticated and redirected to dashboard

## User Management

### Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| `POST` | `/auth/login` | User login | None |
| `POST` | `/auth/` | User registration | None |
| `POST` | `/auth/verification` | OTP verification | None |
| `GET` | `/auth/` | Get user info | Required |
| `PATCH` | `/auth/` | Update user data | Required |
| `DELETE` | `/auth/` | Delete user | Required |

### Request/Response Examples

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

** 🔓 Success Response (200):**
```json
{
  "token": "jwt-token-string",
  "message": "Login successful"
}
```

** ❌ Error Response (400):**
```json
{
  "error": "Email or password are wrong"
}
```

## Financial Management

### Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| `GET` | `/account` | Get user accounts | Required |
| `POST` | `/account` | Create account | Required |
| `DELETE` | `/account/:id` | Delete account | Required |
| `GET` | `/transaction/:account_id` | Get transactions | Required |
| `POST` | `/transaction` | Create transaction | Required |
| `DELETE` | `/transaction/:id` | Delete transaction | Required |

### Data Models

#### Account Model
```typescript
interface Account {
  account_id: string;
  user_id: string;
  name: string;
  description?: string;
  current_balance: number;
  created_at: Date;
  updated_at: Date;
}
```

#### Transaction Model
```typescript
interface Transaction {
  transaction_id: string;
  account_id: string;
  amount: number;
  description?: string;
  transaction_date: Date;
  created_at: Date;
  updated_at: Date;
}
```

## Error Handling

### Error Response Format
```json
{
  "error": "Human-readable error message",
  "code": "ERROR_CODE",
  "details": "Additional error details"
}
```

### Common Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `AUTH_FAILED` | Authentication failed | 401 |
| `VALIDATION_ERROR` | Input validation failed | 400 |
| `NOT_FOUND` | Resource not found | 404 |
| `RATE_LIMITED` | Too many requests | 429 |
| `INTERNAL_ERROR` | Server error | 500 |

## Development

### Environment Variables
```env
# Database
PG_NAME=zohora
PG_PASSWORD=your_password
PG_HOST=localhost
PG_USER=postgres
PG_PORT=5432

# JWT
SECRET_JWT_KEY=your_jwt_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret

# Session
SESSION_SECRET=your_session_secret
```

### Running the API
```bash
# Development
pnpm dev

# Production
pnpm build
pnpm start
```

## Support

For questions or issues:
- **Email**: jhottfriend@gmail.com

---

*Generated with ❤️ using TypeDoc*
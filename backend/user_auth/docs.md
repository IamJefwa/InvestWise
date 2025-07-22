# InvestWise API Documentation

This document provides instructions and examples for using the InvestWise API.

## Base URL
```
http://localhost:8000/api/auth/
```

## Authentication

### 1. Register User

Creates a new user account. An OTP is sent to the user's email for verification.

- **URL:** `/api/auth/register/`
- **Method:** `POST`
- **Permissions:** `AllowAny`

**Request Body:**

```json
{
  "email": "user@example.com",
  "name": "Test User",
  "password": "yourpassword123",
  "is_investor": true,
  "is_individual": true
}
```

**Success Response (201 CREATED):**

```json
{
  "message": "User registered successfully. Please check your email for the OTP to verify your account.",
  "email": "user@example.com"
}
```

**Error Responses:**

- `400 Bad Request`: Validation errors (duplicate email, weak password)
- `500 Internal Server Error`: Email sending failed

### 2. Verify OTP

Verifies the user's email with the provided OTP.

- **URL:** `/api/auth/verify-otp/`
- **Method:** `POST`
- **Permissions:** `AllowAny`

**Request Body:**

```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Success Response (200 OK):**

```json
{
  "message": "Email verified successfully. You can now login to your account."
}
```

**Error Responses:**

- `400 Bad Request`: Invalid OTP, expired OTP, or missing email/OTP
  ```json
  {
    "error": "Invalid or expired OTP.",
    "remaining_attempts": 3
  }
  ```
- `404 Not Found`: User not found
- `423 Locked`: Account temporarily locked due to too many failed attempts

### 3. Resend OTP

Resends a new OTP to the user's email address.

- **URL:** `/api/auth/resend-otp/`
- **Method:** `POST`
- **Permissions:** `AllowAny`

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Success Response (200 OK):**

```json
{
  "message": "New OTP sent successfully. Please check your email."
}
```

**Error Responses:**

- `400 Bad Request`: Account already verified, missing email
- `404 Not Found`: User not found
- `423 Locked`: Account temporarily locked
- `429 Too Many Requests`: Rate limited
  ```json
  {
    "error": "Please wait 45 seconds before requesting a new OTP."
  }
  ```

### 4. User Login

Authenticates a user and returns JWT tokens.

- **URL:** `/api/auth/login/`
- **Method:** `POST`
- **Permissions:** `AllowAny`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "yourpassword123"
}
```

**Success Response (200 OK):**

```json
{
  "message": "Login successful",
  "refresh": "<refresh_token>",
  "access": "<access_token>",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "Test User",
    "is_investor": true,
    "is_individual": true,
    "investorprofile": {
      "contact_info": "",
      "address_info": "",
      "is_local": true,
      "avatar": null,
      "interests": []
    }
  }
}
```

**Error Responses:**

- `403 Forbidden`: Email not verified
  ```json
  {
    "error": "Please verify your email before logging in.",
    "action_required": "email_verification"
  }
  ```
- `423 Locked`: Account temporarily locked due to failed attempts

### 5. User Logout

Logs out the user by blacklisting the refresh token.

- **URL:** `/api/auth/logout/`
- **Method:** `POST`
- **Permissions:** `IsAuthenticated`
- **Authorization Header:** `Authorization: Bearer <access_token>`

**Request Body:**

```json
{
  "refresh": "<refresh_token>"
}
```

**Success Response (200 OK):**

```json
{
  "message": "Successfully logged out."
}
```

## Password Management

### 1. Forgot Password

Initiates password reset process by sending a reset link to the user's email.

- **URL:** `/api/auth/forgot-password/`
- **Method:** `POST`
- **Permissions:** `AllowAny`

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Response (200 OK):**

```json
{
  "message": "If this email exists in our system, you will receive password reset instructions."
}
```

### 2. Reset Password

Resets the user's password using the token received via email.

- **URL:** `/api/auth/reset-password/`
- **Method:** `POST`
- **Permissions:** `AllowAny`

**Request Body:**

```json
{
  "email": "user@example.com",
  "token": "abc123def456ghi789",
  "new_password": "newpassword123"
}
```

**Success Response (200 OK):**

```json
{
  "message": "Password reset successfully. You can now login with your new password."
}
```

**Error Responses:**

- `400 Bad Request`: Invalid token, expired token, or validation errors
  ```json
  {
    "error": "Invalid or expired reset token.",
    "remaining_attempts": 3
  }
  ```
- `423 Locked`: Account locked due to too many failed attempts

### 3. Change Password

Changes the password for an authenticated user.

- **URL:** `/api/auth/change-password/`
- **Method:** `POST`
- **Permissions:** `IsAuthenticated`
- **Authorization Header:** `Authorization: Bearer <access_token>`

**Request Body:**

```json
{
  "current_password": "currentpassword123",
  "new_password": "newpassword123"
}
```

**Success Response (200 OK):**

```json
{
  "message": "Password changed successfully."
}
```

**Error Responses:**

- `400 Bad Request`: Current password incorrect, passwords are the same, or validation errors

## Profile Management

### 1. View Profile

Retrieves the authenticated user's profile.

- **URL:** `/api/auth/profile/`
- **Method:** `GET`
- **Permissions:** `IsAuthenticated`
- **Authorization Header:** `Authorization: Bearer <access_token>`

**Success Response (200 OK):**

For Investor:
```json
{
  "id": 1,
  "email": "investor@example.com",
  "name": "John Investor",
  "is_investor": true,
  "is_individual": true,
  "investorprofile": {
    "contact_info": "123-456-7890",
    "address_info": "123 Main St, City",
    "is_local": true,
    "avatar": null,
    "interests": [1, 2, 3]
  }
}
```

For Business:
```json
{
  "id": 2,
  "email": "business@example.com",
  "name": "Jane Business",
  "is_investor": false,
  "is_individual": false,
  "businessprofile": {
    "business_name": "Tech Startup Inc.",
    "contact_info": "987-654-3210",
    "address_info": "456 Oak Ave, City",
    "is_local": true,
    "avatar": null,
    "category": 1
  }
}
```

### 2. Update Profile

Updates the authenticated user's profile.

- **URL:** `/api/auth/profile/`
- **Method:** `PUT`, `PATCH`
- **Permissions:** `IsAuthenticated`
- **Authorization Header:** `Authorization: Bearer <access_token>`

**Request Body for Investor Profile Update:**

```json
{
  "contact_info": "555-123-4567",
  "address_info": "789 Pine St, New City",
  "is_local": false,
  "interests": [1, 3, 5]
}
```

**Request Body for Business Profile Update:**

```json
{
  "business_name": "Updated Business Name",
  "contact_info": "555-987-6543",
  "address_info": "321 Elm St, New City",
  "is_local": false,
  "category": 2
}
```

**Success Response (200 OK):**

Returns the complete updated user profile in the same format as the GET request.

## Sectors

### 1. List Sectors

Retrieves a list of all available investment sectors/categories.

- **URL:** `/api/auth/sectors/`
- **Method:** `GET`
- **Permissions:** `AllowAny`

**Success Response (200 OK):**

```json
[
  {
    "id": 1,
    "name": "Technology",
    "description": "Software, hardware, and tech services"
  },
  {
    "id": 2,
    "name": "Healthcare",
    "description": "Medical devices, pharmaceuticals, and health services"
  },
  {
    "id": 3,
    "name": "Finance",
    "description": "Banking, insurance, and financial services"
  },
  {
    "id": 4,
    "name": "Real Estate",
    "description": "Property development and real estate investment"
  }
]
```

## Error Handling

The API uses standard HTTP status codes and returns error messages in JSON format:

### Common Error Responses:

- `400 Bad Request`: Invalid request data or validation errors
- `401 Unauthorized`: Missing or invalid authentication token
- `403 Forbidden`: Access denied (e.g., unverified email)
- `404 Not Found`: Resource not found
- `423 Locked`: Account temporarily locked
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

### Error Response Format:

```json
{
  "error": "Error message description",
  "details": "Additional error details (optional)"
}
```

## Rate Limits

- **OTP Resend**: 60 seconds between requests
- **Password Reset**: 5 minutes between requests
- **Failed Login Attempts**: Account locked for 1 hour after 5 failed attempts
- **Failed OTP Attempts**: Account locked for 1 hour after 5 failed attempts
- **Failed Password Reset**: Account locked for 2 hours after 5 failed attempts

## Authentication Headers

For protected endpoints, include the JWT access token in the Authorization header:

```
Authorization: Bearer <access_token>
```

## Token Refresh

JWT access tokens have a limited lifespan. Use the refresh token to obtain new access tokens when they expire. This is typically handled by your frontend application automatically.
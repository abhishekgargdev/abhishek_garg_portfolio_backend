export const ResponseMessages = {
  // Auth Messages
  LOGIN_SUCCESS: 'Login successful',
  LOGIN_FAILED: 'Invalid email or password',
  LOGOUT_SUCCESS: 'Logout successful',
  REGISTRATION_SUCCESS: 'User registered successfully',
  TOKEN_REFRESH_SUCCESS: 'Token refreshed successfully',
  TOKEN_INVALID: 'Invalid or expired token',
  UNAUTHORIZED: 'Unauthorized access',

  // Password Messages
  PASSWORD_RESET_EMAIL_SENT: 'Password reset email sent successfully',
  PASSWORD_RESET_SUCCESS: 'Password reset successful',
  PASSWORD_RESET_TOKEN_INVALID: 'Invalid or expired reset token',
  PASSWORD_REQUIREMENTS_NOT_MET: 'Password does not meet requirements',

  // User Messages
  USER_FOUND: 'User retrieved successfully',
  USER_NOT_FOUND: 'User not found',
  USER_ALREADY_EXISTS: 'User with this email already exists',
  USER_CREATED: 'User created successfully',
  USER_UPDATED: 'User updated successfully',
  USER_DELETED: 'User deleted successfully',

  // Validation Messages
  VALIDATION_ERROR: 'Validation error',
  INVALID_EMAIL: 'Invalid email format',
  REQUIRED_FIELD: 'This field is required',

  // General Messages
  SUCCESS: 'Operation successful',
  ERROR: 'An error occurred',
  INTERNAL_ERROR: 'Internal server error',
  BAD_REQUEST: 'Bad request',
  NOT_FOUND: 'Resource not found',
} as const;

export type ResponseMessage =
  (typeof ResponseMessages)[keyof typeof ResponseMessages];

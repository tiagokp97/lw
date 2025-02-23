export class AuthError extends Error {
  static errors = {
    USERNAME_EXISTS: { message: 'Username already exists', code: 409 },
    USER_NOT_FOUND: { message: 'User not found', code: 404 },
    INVALID_PASSWORD: { message: 'Invalid password', code: 401 },
  };

  constructor(errorKey) {
    if (!AuthError.errors[errorKey]) {
      throw new Error(`AuthError: Invalid error key '${errorKey}'`);
    }

    const { message, code } = AuthError.errors[errorKey];
    super(message);
    this.name = 'AuthError';
    this.statusCode = code;
  }
}

export class TransactionError extends Error {
  static errors = {
    ACCOUNT_NOT_FOUND: { message: 'Account not found', code: 404 },
    INSUFFICIENT_BALANCE: { message: 'Insufficient balance', code: 400 },
    ACCOUNT_ID_REQUIRED: { message: 'Account ID is required', code: 400 },
    ORIGIN_ACCOUNT_NOT_FOUND: {
      message: 'Origin account not found',
      code: 404,
    },
    DESTINATION_ACCOUNT_NOT_FOUND: {
      message: 'Destination account not found',
      code: 404,
    },
  };

  constructor(errorKey) {
    if (!TransactionError.errors[errorKey]) {
      throw new Error(`TransactionError: Invalid error key '${errorKey}'`);
    }

    const { message, code } = TransactionError.errors[errorKey];
    super(message);
    this.name = 'TransactionError';
    this.statusCode = code;
  }
}

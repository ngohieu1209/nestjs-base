export const commonHttpErrors = {
  UNKNOWN_ERROR: {
    message: 'internal server error',
    code: "ERROR_00000",
  },
  WRONG_EMAIL_OR_PASSWORD: {
    message: 'wrong email or password',
    code: "USER_00001",
  },
  UNAUTHORIZED: {
    message: 'unauthorized',
    code: "USER_00002",
  },
  FORBIDDEN: {
    message: 'forbidden',
    code: "USER_00003",
  },
  TOO_MANY_REQUESTS: {
    message: 'too many requests',
    code: "USER_00004",
  },
  REFRESH_TOKEN_FAIL: {
    message: 'refresh token fail',
    code: "USER_00005",
  },
  REFRESH_TOKEN_EXPIRED: {
    message: 'refresh token expired',
    code: "USER_00006",
  },
  USER_NOT_EXIST: {
    message: 'user not exist',
    code: 'USER_00007'
  },
  USER_EXISTED: {
    message: 'user existed',
    code: 'USER_00008'
  },
};

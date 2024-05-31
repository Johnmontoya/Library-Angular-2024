export interface IApiResponse {
  token: string;
  isSuccess: true;
  message: string;
  refreshToken: string;
  errors: ErrorList
}

export type ErrorList = {
  code: string,
  errorMessage: string
}

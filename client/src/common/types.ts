export interface LoginDTO {
  username: string;
  password: string;
}

export interface RegisterDTO {
  username: string;
  password: string;
}




export interface ServerError {
  statusCode: number;
  message: string;
}

export type AuthResponse = { token: string;};
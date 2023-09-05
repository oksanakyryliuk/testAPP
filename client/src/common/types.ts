export interface LoginDTO {
  login: string;
  password: string;
}

export interface UserDTO {
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  birth: string;
  password: string;
  tgUserId?: number;
}

export interface User extends UserDTO {
  id: number;
}

export interface TrainingDTO {
  name: string;
  duration: number;
  maxPeople: number;
  price: number;
  organizationId: number;
}



export interface ServerError {
  statusCode: number;
  message: string;
}

export type AuthResponse = { token: string;};
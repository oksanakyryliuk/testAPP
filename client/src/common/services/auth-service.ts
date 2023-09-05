import { AuthResponse,  LoginDTO , RegisterDTO} from '../types';
import { httpClient } from '../http-client';

export function apiLogin(data: LoginDTO) {
  return httpClient<AuthResponse>({
      method: 'post',
      url: '/auth/login',
      data,
  }).then(({ data }) => data);
}
export function apiRegister(data: RegisterDTO) {
  return httpClient<AuthResponse>({
      method: 'post',
      url: '/auth/signup',
      data,
  }).then(({ data }) => data);
}


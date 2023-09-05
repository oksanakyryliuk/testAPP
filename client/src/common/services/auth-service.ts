import { AuthResponse,  LoginDTO, User } from '../types';
import { httpClient } from '../http-client';

export function apiLogin(data: LoginDTO) {
  return httpClient<AuthResponse>({
      method: 'post',
      url: '/auth/login',
      data,
  }).then(({ data }) => data);
}
// export function apiRegister(data: RegisterDTO) {
//   return httpClient<AuthResponse>({
//       method: 'post',
//       url: '/auth/register',
//       data,
//   }).then(({ data }) => data);
// }

// export function getLoggedInUser() {
//   return httpClient<LoggedInUser>({
//       method: 'get',
//       url: `/auth/user`,
//   }).then(({ data }) => data);
// }
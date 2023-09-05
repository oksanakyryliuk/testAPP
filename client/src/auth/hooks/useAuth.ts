import { LoginDTO, ServerError, RegisterDTO } from '../../common/types';
import { apiLogin } from '../../common/services/auth-service';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppModules } from '../../common/enums/AppModules';
import { useLocalStorage } from 'usehooks-ts';
import { apiRegister } from '../../common/services/auth-service';

export const TOKEN_STORAGE_KEY = 'authData';

export function useAuth() {
  const [token, setToken] = useLocalStorage<string>(TOKEN_STORAGE_KEY, '');
  const navigate = useNavigate();
  const isLoggedIn = !!token;
  const registerUser = (data: RegisterDTO) => {
    apiRegister(data)
        .then(() => {
          navigate(AppModules.Login);
        })
        .catch(({ response }: AxiosError<ServerError>) => {
          console.log(response?.data.message);
        });
};
  const login = (data: LoginDTO) => {
    apiLogin(data)
      .then(({ token}) => {
        setToken(token);
        navigate(AppModules.Home);
      })
      .catch(({ response }: AxiosError<ServerError>) => {
        console.log(response?.data.message);
      });
  };

  const logout = () => {
    setToken('');
    navigate(AppModules.Login);
  };

  return { login, logout, isLoggedIn, token, registerUser };
}
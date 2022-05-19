export interface IAuthRegister {
  name: string;
  login: string;
  password: string;
}

export interface IAuthRegisterRes {
  id: string;
  name: string;
  login: string;
}

export interface IAuthLogin {
  login: string;
  password: string;
}

export interface IAuthLoginRes {
  token: string;
}

export enum LoginFieldNames {
  username = 'username',
  password = 'password',
}

export interface LoginFormData {
  [LoginFieldNames.username]: string;
  [LoginFieldNames.password]: string;
}

export interface User {
  id: number;
  username: string;
}

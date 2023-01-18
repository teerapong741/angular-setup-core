export type Role = 'ADMIN' | 'DCC' | 'MANAGEMENT';

export interface Auth {
  token: string;
  refresh_token: string;
}

export interface User {
  id: string;
  name: string;
  role: Role;
  img_profile?: string;
}

export interface AuthStateModel {
  auth: Auth | null;
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  error: string | null;
}

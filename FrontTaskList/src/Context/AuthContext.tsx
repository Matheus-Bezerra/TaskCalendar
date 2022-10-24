import { createContext, ReactNode, useState } from 'react';

type User = {
  name: string;
};

type AuthContextData = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

let dataUserLocal = sessionStorage.getItem('user@dielTask');

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({
    name: dataUserLocal ? dataUserLocal : '',
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

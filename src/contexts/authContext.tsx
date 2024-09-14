import { poolData } from '@/config/cognito';
import { User } from '@/models/User';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { useRouter } from 'next/navigation';
import React, { createContext, useState, useEffect, useContext } from 'react';

interface AuthContextData {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const userPool = new CognitoUserPool(poolData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('@medcloud:user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    const userData = {
      Username: email,
      Pool: userPool,
    };

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser(userData);

    return new Promise<void>((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          const accessToken = result.getAccessToken().getJwtToken();

          const loggedInUser = {
            id: result.getAccessToken().payload.sub,
            email,
          };

          setUser(loggedInUser);
          localStorage.setItem('@medcloud:user', JSON.stringify(loggedInUser));
          localStorage.setItem('@medcloud:token', accessToken);

          resolve();
        },
        onFailure: (err) => {
          console.error('Erro ao autenticar:', err);
          reject(err);
        },
      });
    });
  };

  const signOut = () => {
    const storedUser = localStorage.getItem('@medcloud:user');

    if (storedUser) {
      const email = JSON.parse(storedUser).email;
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      cognitoUser.signOut();
    }

    setUser(null);
    localStorage.removeItem('@medcloud:user');
    localStorage.removeItem('@medcloud:accessToken');

    router.replace('/');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth precisa estar dentro de um AuthProvider');
  }
  return context;
}

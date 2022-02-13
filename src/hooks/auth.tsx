import React, {
    createContext,
    useState,
    useContext,
    ReactNode
} from 'react';
import { Alert } from 'react-native';
import { api } from '../services/api';

interface User {
    id: string;
    email: string;
    name: string;
    driver_license: string;
    avatar: string;
}

interface AuthState {
    token: string;
    user: User;
}

interface SignInCredencials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: User;
    signIns: (credentials: SignInCredencials) => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({children}: AuthProviderProps) {
    const [data, setData] = useState<AuthState>({} as AuthState);

    async function signIns({email, password}: SignInCredencials) {
        const response = await api.post('/sessions', {
            email,
            password
        });

        const {token, user } = response.data;
        api.defaults.headers.authorization = `Bearer ${token}`;
        setData({token, user});
    }

    return (
        <AuthContext.Provider value={{
            user: data.user,
            signIns
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
    return context;
}

export {AuthProvider, useAuth};
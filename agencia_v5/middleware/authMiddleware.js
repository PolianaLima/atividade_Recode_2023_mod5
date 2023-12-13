import {useAuth} from '/context/authContext';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

const AuthMiddleware = ({ children }) => {
    const { token } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/');
        }
    }, [token, router]);

    return token ? children : null;
};

export default AuthMiddleware;

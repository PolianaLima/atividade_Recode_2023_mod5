import Cookies from "js-cookie";

export const saveUserToCookie = (userData, expirationMinutes = 2)=>{

    Cookies.set('user', JSON.stringify(userData), {expires:expirationMinutes / 24})

    setTimeout(()=>{
        removeUserFromCookie();

    },expirationMinutes * 24 * 60 *60 *1000 );
}


export const getUserFromCookie = ()=>{
    const userData = Cookies.get('user');
    return userData ? JSON.parse(userData) : null;
}

export const removeUserFromCookie=()=>{
    return Cookies.remove('user')
}
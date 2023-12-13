import Cookies from "js-cookie";

export const saveUserToCookie = (userData, expirationDays = 1)=>{

    Cookies.set('user', JSON.stringify(userData), {expires:expirationDays})

    setTimeout(()=>{
        removeUserFromCookie();

    },expirationDays * 24 * 60 *60 *1000 );
}


export const getUserFromCookie = ()=>{
    const userData = Cookies.get('user');
    return userData ? JSON.parse(userData) : null;
}

export const removeUserFromCookie=()=>{
    return Cookies.remove('user')
}
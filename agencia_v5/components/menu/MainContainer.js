import React from 'react';
import {useAuth} from "@/context/authContext";
import MenuSiteBackOffice from "@/components/menu/MenuSiteBackOffice";
import MenuSite from "@/components/menu/MenuSite";
import Footer from "@/components/menu/Footer";

function MainContainer({children}) {
    const {token, user} = useAuth();
    return (
        <>
            {token != null && user.role === "ADMIN" ? (
                <MenuSiteBackOffice/>
            ) : (
                <MenuSite/>
            )}

            <div className="min-heigth mt-3">{children}</div>

            <Footer/>
        </>
    );
}

export default MainContainer;
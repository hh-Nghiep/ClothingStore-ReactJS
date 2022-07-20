import { React } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useLocation } from 'react-router-dom';

export default function Layout({ children }) {
    const location = useLocation();
    console.log('current Pathname 👉️', location.slice(0, 6));
    if (
        location === "/shop" ||
        location === "/about" ||
        location === "/yourorder" ||
        location === "/cart" ||
        location === "/account" ||
        location === "/"
    ) {
        return (
            <>
                <Header />
                {children}
                <Footer />
            </>
        );
    } else if (location === "/login") {
        return <>{children}</>;
    } else {
        return (
            <div>
                <>{children}</>
            </div>
        );
    }
}

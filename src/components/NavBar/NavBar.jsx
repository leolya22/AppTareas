import { useAuthStore } from "../../hooks/useAuthStore";
import './NavBar.css'


export const NavBar = () => {

    const { user, startLogout } = useAuthStore();

    return (
        <div className="navbar">
            <span className="username">{ user.name }</span>
            <span className="logout_button" onClick={ startLogout }>Salir</span>
        </div>
    );
};
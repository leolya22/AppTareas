import { useAuthStore } from "../../hooks/useAuthStore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import './NavBar.css'


export const NavBar = () => {

    const { user, startLogout } = useAuthStore();

    return (
        <div className="navbar">
            <span className="username">{ user.name }</span>
            <span className="logout_button" onClick={ startLogout }>
                <FontAwesomeIcon icon={ faSignOutAlt } /> Salir
            </span>
        </div>
    );
};
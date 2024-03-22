import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import './LoginPage.css';
import { useAuthStore } from '../../../hooks/useAuthStore'


export const LoginPage = () => {
    const { errorMessage } = useSelector( state => state.auth );
    const { 
        register, 
        handleSubmit, 
        setError: setFormError, 
        formState: { errors } 
    } = useForm();
    const { startLogin } = useAuthStore();

    useEffect( () => {
        errorMessage && setFormError( 'password', { 
            type: 'manual', 
            message: errorMessage 
        });
    }, [ errorMessage ]);

    const handleLogin = ({ email, password }) => {
        startLogin({ email, password });
    };

    return (
        <div className="container">
            <h1 className="texto">
                Ingrese al sitio
            </h1>
            <form 
                className="form" 
                onSubmit={ handleSubmit( handleLogin ) }
            >
                <div className="formGroup">
                    <label className="label">
                        Email:
                    </label>
                    <input 
                        type="text" 
                        { ...register( 'email', { required: 'Ingrese su email' })}
                        className="input"
                    />
                    { errors.email && <span className="error">{ errors.email.message }</span> }
                </div>
                <div className="formGroup">
                    <label className="label">
                        Contraseña:
                    </label>
                    <input 
                        type="password" 
                        { ...register( 'password', { required: 'Ingrese su contraseña' })} 
                        className="input"
                    />
                    { errors.password && <span className="error"> { errors.password.message }</span> }
                </div>
                <button type="submit" className="button">
                    Ingresar
                </button>
            </form>
            <br />
            <p>
                Aun no tiene usuario en el sitio?
                <Link className="texto" to={ '/register' }>
                    Registrarse
                </Link>
            </p>
        </div>
    );
};
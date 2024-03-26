import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import './LoginPage.css';
import { useAuthStore } from '../../../hooks/useAuthStore'


export const LoginPage = () => {
    const { startLogin, errorMessage } = useAuthStore();
    const { 
        register, 
        handleSubmit, 
        setError: setFormError, 
        formState: { errors } 
    } = useForm();

    useEffect( () => {
        errorMessage && setFormError( 'password', { 
            type: 'manual', 
            message: errorMessage 
        });
    }, [ errorMessage ]);

    const handleLogin = async ({ email, password }) => {
        await startLogin({ email, password });
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
                        { ...register( 'password', {
                            required: 'Ingrese su contraseña',
                            minLength: {
                                value: 6,
                                message: 'La contraseña debe tener al menos 6 caracteres'
                            }
                        })} 
                        className="input"
                        autoComplete="ebp_password"
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
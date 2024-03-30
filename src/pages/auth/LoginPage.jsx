import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { useAuthStore } from '../../hooks/useAuthStore'


export const LoginPage = () => {
    const { startLogin, errorMessage, onInputChange } = useAuthStore();
    const { 
        register, 
        handleSubmit, 
        setError: setFormError, 
        formState: { errors },
        setValue,
        watch,
        clearErrors
    } = useForm();

    useEffect( () => {
            for( let error in errorMessage?.errors ) {
                setFormError( error, { 
                    type: 'manual', 
                    message: errorMessage.errors[ error ].msg
                });
            }
            for( let value in errorMessage?.values ) {
                setValue( value, errorMessage.values[ value ] )
            }
    }, [ errorMessage ]);

    useEffect( () => {
        if( errorMessage != null ) {
            const subscription = watch( () => {
                onInputChange();
                clearErrors()
            });
            return () => subscription.unsubscribe();
        }
    }, [ watch, errorMessage ]);

    const handleLogin = async ({ email, password }) => {
        await startLogin({ email, password });
    };

    return (
        <div className="auth-container">
            <h1 className="auth-text">
                Ingrese al sitio
            </h1>
            <form 
                className="auth-form" 
                onSubmit={ handleSubmit( handleLogin ) }
            >
                <div className="auth-form-group">
                    <label className="auth-label">
                        Email:
                    </label>
                    <input 
                        type="email" 
                        { ...register( 'email', { required: 'Ingrese su email' })}
                        className="auth-input"
                    />
                    { errors.email && <span className="auth-error">{ errors.email.message }</span> }
                </div>
                <div className="auth-form-group">
                    <label className="auth-label">
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
                        className="auth-input"
                        autoComplete="ebp_password"
                    />
                    { errors.password && <span className="auth-error"> { errors.password.message }</span> }
                </div>
                <button type="submit" className="auth-button">
                    Ingresar
                </button>
            </form>
            <br />
            <p>
                Aun no tiene usuario en el sitio? 
                <Link className="auth-text" to={ '/register' }>
                    Registrarse
                </Link>
            </p>
        </div>
    );
};
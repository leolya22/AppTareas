import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { useAuthStore } from '../../hooks/useAuthStore'


export const LoginPage = () => {
    const { startLogin, formValidationEffect } = useAuthStore();
    const { 
        register, 
        handleSubmit, 
        setError: setFormError, 
        formState: { errors },
        setValue,
        watch,
        clearErrors
    } = useForm();

    formValidationEffect( setFormError, setValue, watch );

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
                        { ...register( 'email', { 
                                required: 'Ingrese su email',
                                onChange: () => clearErrors('email')
                        })}
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
                            },
                            onChange: () => clearErrors('password')
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
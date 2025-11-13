// LoginPage.jsx
import React, { useState } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

const LoginPage = ({ navegarA }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateField = (name, value) => {
        if (name === 'email') {
            if (!value) {
                setEmailError('El email es requerido.');
            } else if (!EMAIL_REGEX.test(value)) {
                setEmailError('Formato de email incorrecto.');
            } else {
                setEmailError('');
            }
        } else if (name === 'password') {
            if (value.length < 6) {
                setPasswordError('La contraseña debe tener al menos 6 caracteres.');
            } else {
                setPasswordError('');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
        
        validateField(name, value);
    };

    const isFormValid = !emailError && !passwordError && email && password;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        validateField('email', email);
        validateField('password', password);

        if (isFormValid) {
            alert(`Simulación de Login: Email: ${email}`);
            navegarA('HOME');
        }
    };

    return (
        <div className="main-content-wrapper">
            <section className="login-form-container">
                <h2>Iniciar Sesión</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="usuario@dominio.com"
                            className={emailError ? 'input-error' : ''}
                        />
                        {emailError && <p className="error-message">{emailError}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Mínimo 6 caracteres"
                            className={passwordError ? 'input-error' : ''}
                        />
                        {passwordError && <p className="error-message">{passwordError}</p>}
                    </div>

                    <button type="submit" disabled={!isFormValid}>
                        ENTRAR
                    </button>
                </form>
                <p className="registro-link">¿No tienes cuenta? <a href="#" onClick={() => alert('Simulación: Redirigir a Registro')}>Regístrate aquí</a></p>
            </section>
            
        </div>
    );
};

export default LoginPage;
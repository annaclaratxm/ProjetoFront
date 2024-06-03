import React from 'react';
import './LoginComponent.css'; // Importando o arquivo CSS

export default function LoginComponent() {
    return (
        <div className="login-container">
            <div>
                <h2>Login</h2>
            </div>
            <div className="login-form">
                <form>
                    <label>Usuário:</label>
                    <input type="text" />
                    <label>Senha:</label>
                    <input type="password" />
                    <a href="#" className="forgot-password-link">Esqueci minha senha</a>
                    <input type="submit" value="Entrar" />
                </form>
                <div className="login-buttons">
                    <button className="register-button">Registrar-se</button>
                </div>
            </div>
        </div>
    )
}

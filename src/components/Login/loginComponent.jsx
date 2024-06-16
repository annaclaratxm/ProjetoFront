import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginComponent.css';

export default function LoginComponent() {
  const [usuarios, setUsuarios] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate(); // Use navigate hook to redirect

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("../../../data/db.json");
        const data = await response.json();
        setUsuarios(data.users);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };
    fetchUsuarios();
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    let valid = true;
    if (!username) {
      setUsernameError(true);
      valid = false;
    } else {
      setUsernameError(false);
    }
    if (!password) {
      setPasswordError(true);
      valid = false;
    } else {
      setPasswordError(false);
    }
    if (!valid) {
      return;
    }
    const user = usuarios.find(u => u.username === username);
    if (user) {
      if (user.password === password) {
        console.log("Usuário logado com sucesso: ", user);
        setErrorMessage('Usuário logado com sucesso.');
        setShowModal(true);
        navigate('/app/home'); // Redirect to /app/home on successful login
      } else {
        setErrorMessage('Senha incorreta.');
        setShowModal(true);
      }
    } else {
      setErrorMessage('Usuário não encontrado.');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="login-container">
      <div>
        <h2>Login</h2>
      </div>
      <div className="login-form">
        <form onSubmit={handleLogin}>
          <label>Usuário:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={usernameError ? 'error-input' : ''}
          />
          {usernameError && <span className="error-message">Campo obrigatório</span>}
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={passwordError ? 'error-input' : ''}
          />
          {passwordError && <span className="error-message">Campo obrigatório</span>}
          <a href="#" className="forgot-password-link">Esqueci minha senha</a>
          <input type="submit" value="Entrar" />
        </form>
        <div className="login-buttons">
          <button className="register-button">Registrar-se</button>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

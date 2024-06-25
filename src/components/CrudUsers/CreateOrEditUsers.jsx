import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import './CreateServices.css';

export default function CreateOrEditUsers() {
  const [currentUser, setCurrentUser] = useState({ username: '', password: '', fullName: '', email: ''});
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch product by ID
      const fetchUser = async () => {
        try {
          const response = await fetch(`http://localhost:3000/users/${id}`);
          const user = await response.json();
          setCurrentUser(user);
          setIsEditing(true);
        } catch (error) {
          console.error("Erro ao buscar usuário:", error);
        }
      };

      fetchUser();
    }
  }, [id]);

  const handleSaveUser = async (e) => {
    e.preventDefault();

    const url = isEditing ? `http://localhost:3000/users/${id}` : 'http://localhost:3000/users';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentUser)
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`);
      }

      console.log("User saved", currentUser);
      navigate('/app/users');
    } catch (error) {
      console.error("Um erro ocorreu enquanto o usuário era salvo:", error);
    }
  };

  return (
    <div className="create-user">
      <h2>{isEditing ? 'Editar Usuário' : 'Criar Novo Usuário'}</h2>
      <form onSubmit={handleSaveUser}>
        <label>Nome de usuário:</label>
        <input name="username" type="text" value={currentUser.username} onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })} required />
        <label>Senha:</label>
        <input name="password" type="password" value={currentUser.password} onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })} required />
        <label>Nome completo:</label>
        <input name="fullName" type="text" value={currentUser.fullName} onChange={(e) => setCurrentUser({ ...currentUser, fullName: e.target.value })} required />
        <label>E-mail:</label>
        <input name="email" type="email" value={currentUser.email} onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} required />      
        <button type="submit">{isEditing ? 'Salvar Alterações' : 'Salvar'}</button>
        <button type="button" onClick={() => navigate('/app/users')}>Cancelar</button>
      </form>
    </div>
  );
}
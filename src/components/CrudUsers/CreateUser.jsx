import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import './CreateUser.css';

export default function CreateUser() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

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

  const confirmarExclusao = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usário?")) {
      try {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          const novosUsuarios = usuarios.filter((user) => user.id !== id);
          setUsuarios(novosUsuarios);
          console.log("Usuário com ID", id, "foi excluído.");
        } else {
          console.error('Erro ao excluir usuário:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      }
    }
  };

  const handleCreateUser = () => {
    navigate('/app/users/create');
  };

  const handleEditUser = (id) => {
    navigate(`/app/users/edit/${id}`)
  };

  const classe = {
    CreateUser: "create-user",
    TabelaCrudUser: "crud-user-table",
    actions: "user-actions",
    createButton: "create-button",
  };

  return (
    <div className={classe.CreateUser}>
      <h2>Usuários do Sistema</h2>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className={classe.createButton} onClick={handleCreateUser}>Criar Novo Usuário</button>
      </div>
      <table className={classe.TabelaCrudUser}>
        <thead>
          <tr>
            <th>Nome de usuário</th>
            <th>Nome Completo</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.username}</td>
              <td>{usuario.fullName}</td>
              <td>{usuario.email}</td>
              <td className={classe.actions}>
                <button onClick={() => handleEditUser(usuario.id)}>
                  Editar
                </button>
                <button onClick={() => confirmarExclusao(usuario.id)}>
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

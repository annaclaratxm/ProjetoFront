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

  const editarUsuario = (id) => {
    console.log("Editar usuário com ID:", id);
  };

  const confirmarExclusao = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      const novosUsuarios = usuarios.filter((usuario) => usuario.id !== id);
      setUsuarios(novosUsuarios);
      console.log("Usuário com ID", id, "foi excluído.");
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
  };

  return (
    <div className={classe.CreateUser}>
      <h2>Usuários do Sistema</h2>
      <button className={classe.createButton} onClick={handleCreateUser}>Criar Novo Serviço</button>
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

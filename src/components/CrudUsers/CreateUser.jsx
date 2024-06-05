import React, { useState } from "react";

export default function CreateUser() {
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      username: "ivete_sangalo",
      password: "1234",
      fullName: "Ivete Sangalo",
      email: "ivete@example.com",
    },
    {
      id: 2,
      username: "paula_fernandes",
      password: "1234",
      fullName: "Paula Fernandes",
      email: "paula@example.com",
    },
    {
      id: 3,
      username: "fatima_bernardes",
      password: "1234",
      fullName: "Fátima Bernardes",
      email: "fatima@example.com",
    },
    {
      id: 4,
      username: "roberto_carlos",
      password: "1234",
      fullName: "Roberto Carlos",
      email: "roberto@example.com",
    },
    {
      id: 5,
      username: "carlos_alberto",
      password: "1234",
      fullName: "Carlos Alberto",
      email: "carlos@example.com",
    },
  ]);

  const editarUsuario = (id) => {
    console.log("Editar usuário com ID:", id);
  };

  const excluirUsuario = (id) => {
    console.log("Excluir usuário com ID:", id);
  };

  const classe = {
    CreateUser: "create-user",
    TabelaCrudUser: "crud-user-table",
    actions: "user-actions"
  };

  return (
    <div className={classe.CreateUser}>
      <h2>Usuários do Sistema</h2>
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
                <button onClick={() => editarUsuario(usuario.id)}>Editar</button>
                <button onClick={() => excluirUsuario(usuario.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

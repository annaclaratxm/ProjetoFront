import React, { useState } from 'react';


export default function CreateUser() {
    <div className={classe.CreateUser}>
        <h2>Usuários do Sistema</h2>
        <table className={classe.TabelaCrudUser}>
            <thead>
                <tr>
                    <th>Nome de usuário</th>
                    <th>Senha</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                        <td>{usuario.username}</td>
                        <td>{usuario.password}</td>
                        <td className={classe.actions}>
                            <button onClick={() => editarUsuario(usuario.id)}>Editar</button>
                            <button onClick={() => excluirUsuario(usuario.id)}>Excluir</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

}

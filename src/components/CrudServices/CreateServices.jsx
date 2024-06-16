import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import './CreateServices.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("../../../data/products.json");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  const editarProduto = (id) => {
    console.log("Editar produto com ID:", id);
  };

  const confirmarExclusao = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      const novosProdutos = products.filter((product) => product.id !== id);
      setProducts(novosProdutos);
      console.log("Produto com ID", id, "foi excluído.");
    }
  };

  const classe = {
    ProductList: "product-list",
    TabelaCrudProduct: "crud-product-table",
    actions: "product-actions",
  };

  return (
    <div className={classe.ProductList}>
      <h2>Lista de Produtos</h2>
      <table className={classe.TabelaCrudProduct}>
        <thead>
          <tr>
            <th>Nome do Produto</th>
            <th>Modelo/Plataforma</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.platform}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td className={classe.actions}>
                <button onClick={() => editarProduto(product.id)}>
                  Editar
                </button>
                <button onClick={() => confirmarExclusao(product.id)}>
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

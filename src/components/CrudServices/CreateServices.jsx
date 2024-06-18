import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import * as Dialog from '@radix-ui/react-dialog';
import { useNavigate } from 'react-router-dom';
import './CreateServices.css';
import './ModalPhoto.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({ photo: "", name: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("../../../data/db.json");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  const confirmarExclusao = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      const novosProdutos = products.filter((product) => product.id !== id);
      setProducts(novosProdutos);
      console.log("Produto com ID", id, "foi excluído.");
    }
  };

  const abrirModal = (photo, name) => {
    setSelectedProduct({ photo, name });
  };

  const fecharModal = () => {
    setSelectedProduct({ photo: "", name: "" });
  };

  const handleCreateProduct = () => {
    navigate('/app/services/create');
  };

  const handleEditProduct = (id) => {
    navigate(`/app/services/edit/${id}`);
  };

  const classe = {
    ProductList: "create-service",
    TabelaCrudProduct: "crud-service-table",
    actions: "service-actions",
    createButton: "create-button"
  };

  return (
    <div className={classe.ProductList}>
      <h2>Lista de Produtos</h2>
      <button className={classe.createButton} onClick={handleCreateProduct}>Criar Novo Serviço</button>
      <table className={classe.TabelaCrudProduct}>
        <thead>
          <tr>
            <th>Nome do Produto</th>
            <th>Modelo/Plataforma</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Foto</th>
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
              <td><img src={product.photo} alt={product.name} onClick={() => abrirModal(product.photo, product.name)} style={{ cursor: 'pointer' }} className="product-image" /></td>
              <td className={classe.actions}>
                <button onClick={() => handleEditProduct(product.id)}>
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
      <Dialog.Root open={!!selectedProduct.photo} onOpenChange={fecharModal}>
        <Dialog.Overlay className="modal-overlay">
          <Dialog.Content className="modal-content">
            <Dialog.Close className="modal-close">
              x
            </Dialog.Close>
            <h2>{selectedProduct.name}</h2>
            <img src={selectedProduct.photo} alt={selectedProduct.name} />
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Root>
    </div>
  );
}
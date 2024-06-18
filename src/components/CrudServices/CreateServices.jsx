import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import * as Dialog from '@radix-ui/react-dialog';
import './CreateServices.css';
import './ModalPhoto.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({ photo: "", name: "" });
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

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

  const editarProduto = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    setIsCreating(true);
  };

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
    setIsCreating(true);
    setIsEditing(false);
    setCurrentProduct(null);
  };

  const handleSaveProduct = (newProduct) => {
    if (isEditing) {
      const updatedProducts = products.map((product) => 
        product.id === currentProduct.id ? { ...product, ...newProduct } : product
      );
      setProducts(updatedProducts);
    } else {
      setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    }
    setIsCreating(false);
    setIsEditing(false);
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
      {isCreating && (
        <div className="create-form">
          <h3>{isEditing ? 'Editar Produto' : 'Criar Novo Produto'}</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const newProduct = Object.fromEntries(formData);
            handleSaveProduct(newProduct);
          }}>
            <label>Nome:</label>
            <input name="name" type="text" defaultValue={currentProduct ? currentProduct.name : ''} required />
            <label>Modelo/Plataforma:</label>
            <input name="platform" type="text" defaultValue={currentProduct ? currentProduct.platform : ''} required />
            <label>Preço:</label>
            <input name="price" type="text" defaultValue={currentProduct ? currentProduct.price : ''} required />
            <label>Estoque:</label>
            <input name="stock" type="text" defaultValue={currentProduct ? currentProduct.stock : ''} required />
            <label>Foto URL:</label>
            <input name="photo" type="text" defaultValue={currentProduct ? currentProduct.photo : ''} required />
            <button type="submit">{isEditing ? 'Salvar Alterações' : 'Salvar'}</button>
            <button type="button" onClick={() => setIsCreating(false)}>Cancelar</button>
          </form>
        </div>
      )}
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
                <button onClick={() => editarProduto(product)}>
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

import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import './CreateServices.css';
import './ModalPhoto.css';

export default function CreateOrEditProduct() {
  const [currentProduct, setCurrentProduct] = useState({ name: '', platform: '', price: '', stock: '', photo: '' });
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch product por ID
      const fetchProduct = async () => {
        try {
          const response = await fetch(`http://localhost:3000/products/${id}`);
          const product = await response.json();
          setCurrentProduct(product);
          setIsEditing(true);
        } catch (error) {
          console.error("Erro ao buscar produto:", error);
        }
      };

      fetchProduct();
    }
  }, [id]);

  const handleSaveProduct = async (e) => {
    e.preventDefault();

    const url = isEditing ? `http://localhost:3000/products/${id}` : 'http://localhost:3000/products';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentProduct)
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`);
      }

      console.log("Produto salvo!", currentProduct);
      navigate('/app/services');
    } catch (error) {
      console.error("Um erro ocorreu enquanto o produto era salvo:", error);
    }
  };

  return (
    <div className="create-service">
      <h2>{isEditing ? 'Editar Produto' : 'Criar Novo Produto'}</h2>
      <form onSubmit={handleSaveProduct}>
        <label>Nome:</label>
        <input name="name" type="text" value={currentProduct.name} onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })} required />
        <label>Modelo/Plataforma:</label>
        <input name="platform" type="text" value={currentProduct.platform} onChange={(e) => setCurrentProduct({ ...currentProduct, platform: e.target.value })} required />
        <label>Preço:</label>
        <input
          name="price"
          type="number"
          value={currentProduct.price}
          onChange={(e) => setCurrentProduct({
            ...currentProduct,
            price: e.target.value === '' ? '' : Number(e.target.value)
          })}
          required
        />
        <label>Estoque:</label>
        <input name="stock" type="text" value={currentProduct.stock} onChange={(e) => setCurrentProduct({ ...currentProduct, stock: e.target.value })} required />
        <label>Foto URL:</label>
        <input name="photo" type="text" value={currentProduct.photo} onChange={(e) => setCurrentProduct({ ...currentProduct, photo: e.target.value })} required />
        <button type="submit">{isEditing ? 'Salvar Alterações' : 'Salvar'}</button>
        <button type="button" onClick={() => navigate('/app/services')}>Cancelar</button>
      </form>
    </div>
  );
}
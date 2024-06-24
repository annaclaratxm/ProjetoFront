import "./style.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3000/products");
                const data = await response.json();
                setProducts(data.slice(0, 3)); 
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="home-div">

            <section className="games-section" id="games">
                <h2>Catálogo</h2>
                <div className="games-gallery">
                    {products.map((product) => (
                        <div className="game-card" key={product.id}>
                            <div className="product-image-container">
                                <Link to={`/app/services`}>
                                    <img src={product.photo} className="product-image" alt={product.name} />
                                </Link>
                            </div>
                            <h3>{product.name}</h3>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

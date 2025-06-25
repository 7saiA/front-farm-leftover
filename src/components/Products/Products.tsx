import { useEffect, useState } from "react";
import { base_url } from "../../utils/constants.ts";
import "./Product.css";

interface UserForProductDto {
    id: number;
    name: string;
    email: string;
    phone: string;
    city: string | null;
    street: string | null;
}

interface Product {
    productId: number;
    productName: string;
    pricePerUnit: number;
    unit: string;
    availableQuantity: number;
    userForProductDto: UserForProductDto;
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [flippedProductId, setFlippedProductId] = useState<number | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${base_url}/products`);
                if (!response.ok) throw new Error(`Error response ${response.status}`);
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const toggleFlip = (id: number) => {
        setFlippedProductId(flippedProductId === id ? null : id);
    };

    const deleteProduct = async (id: number) => {
        try {
            const response = await fetch(`${base_url}/products/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error(`Error delete: ${response.status}`);
            setProducts(prev => prev.filter(product => product.productId !== id));
        } catch (err) {
            console.error("Error delete product:", err);
        }
    };

    return (
        <div>
            <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Products List</h2>

            {loading ? (
                <p>Loading...</p>
            ) : products.length === 0 ? (
                <p>Here is no Products</p>
            ) : (
                <div className="product-grid">
                    {products.map(product => (
                        <div
                            key={product.productId}
                            className={`card ${flippedProductId === product.productId ? "flipped" : ""}`}
                        >
                            <div className="card-inner">
                                {/* Front side */}
                                <div className="card-front">
                                    <h3>{product.productName}</h3>
                                    <p><strong>Price:</strong> {product.pricePerUnit} per {product.unit}</p>
                                    <p><strong>Available:</strong> {product.availableQuantity}</p>
                                    <p>
                                        <strong>Farm:</strong>{" "}
                                        <span
                                            className="farm-link"
                                            onClick={() => toggleFlip(product.productId)}
                                        >
                                            {product.userForProductDto.name}
                                        </span>
                                    </p>
                                    <button className="delete-btn" onClick={() => deleteProduct(product.productId)}>
                                        Delete
                                    </button>
                                </div>

                                {/* Back side */}
                                <div className="card-back">
                                    <div className="farm-header">
                                        <strong
                                            onClick={() => toggleFlip(product.productId)}
                                            className="product-name-back"
                                        >
                                            {product.productName}
                                        </strong>
                                    </div>
                                    <h4>{product.userForProductDto.name}</h4>
                                    <p><strong>City:</strong> {product.userForProductDto.city ?? "nope"}</p>
                                    <p><strong>Street:</strong> {product.userForProductDto.street ?? "nope"}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
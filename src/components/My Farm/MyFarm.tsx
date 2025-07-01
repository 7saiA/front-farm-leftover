import { useAppSelector } from "../../app/hooks.ts";
import { useEffect, useState } from "react";
import type { Product } from "../../types/Product.ts";
import { base_url } from "../../utils/constants.ts";
import AddProductForm from "./AddProductForm.tsx";
import "./MyFarm.css"

const MyFarm = () => {
    const { token } = useAppSelector((state) => state.auth);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${base_url}/products/myProducts`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch your products");
                }

                const data = await res.json();
                setProducts(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [token]);

    const handleAddProduct = (newProduct: Product) => {
        setProducts((prev) => [...prev, newProduct]);
    };

    if (loading) return <p>Loading your products...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="my-farm-container">
            <h2>My Farm Products</h2>
            <AddProductForm onAdd={handleAddProduct} />

            <div className="farm-products-list">
                {products.map((product) => (
                    <div key={product.productId} className="product-card">
                        <h3>{product.productName}</h3>
                        <p><strong>Price:</strong> {product.pricePerUnit} ₪ / {product.unit}</p>
                        <p><strong>Available:</strong> {product.availableQuantity}</p>
                        <button className="delete-btn" onClick={() => deleteProduct(product.productId)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyFarm;
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import { useEffect, useState } from "react";
import type { Product } from "../../types/Product.ts";
import { base_url } from "../../utils/constants.ts";
import AddProductForm from "./AddProductForm.tsx";
import "./MyFarm.css"
import FarmProduct from "./FarmProduct.tsx";
import {fetchWithAuth} from "../../utils/fetchWithAuth.ts";

const MyFarm = () => {
    const dispatch = useAppDispatch();
    const { token } = useAppSelector((state) => state.auth);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleAddProduct = (newProduct: Product) => {
        setProducts((prev) => [...prev, newProduct]);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetchWithAuth(`${base_url}/products/myProducts`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                },dispatch);

                if (!res.ok) throw new Error("Failed to fetch your products");
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [token,dispatch]);

    if (loading) return <p>Loading your products...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;


    return (
        <div className="my-farm-container">
            <h2>My Farm Products</h2>
            <AddProductForm onAdd={handleAddProduct} />
            <div className="farm-products-list">
                {products.map((product) => (
                    <FarmProduct
                        key={product.productId}
                        product={product}
                        onDelete={(id) => setProducts((prev) => prev.filter(p => p.productId !== id))}
                        onUpdate={(updated) => setProducts((prev) =>
                            prev.map(p => p.productId === updated.productId ? updated : p)
                        )}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyFarm;
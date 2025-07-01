import { useEffect, useState } from "react";
import { base_url } from "../../utils/constants.ts";
import "./Product.css";
import ProductsList from "./ProductsList.tsx";
import type {Product} from "../../types/Product.ts";

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [flippedId, setFlippedId] = useState<number | null>(null);

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
        setFlippedId(flippedId === id ? null : id);
    };



    return (
        <div>
            <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Products List</h2>

            {loading ? (
                <p>Loading...</p>
            ) : products.length === 0 ? (
                <p>Here is no Products</p>
            ) : (
                <ProductsList
                    products={products}
                    flippedId={flippedId}
                    toggleFlip={toggleFlip}
                />
            )}
        </div>
    );
};

export default Products;
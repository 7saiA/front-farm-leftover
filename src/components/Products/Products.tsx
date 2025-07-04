import {useEffect, useState} from "react";
import {base_url} from "../../utils/constants.ts";
import "./Product.css";
import ProductsList from "./ProductsList.tsx";
import type {Product} from "../../types/Product.ts";
import ProductSelector from "./ProductSelector.tsx";

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [flippedId, setFlippedId] = useState<number | null>(null);
    const [searchNameProduct, setSearchNameProduct] = useState<string>("");

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
        <div className="products-page-container">
            <form className="product-form">
                <ProductSelector value={searchNameProduct} onChange={setSearchNameProduct}/>
            </form>

            {loading ? (
                <p>Loading...</p>
            ) : products.length === 0 ? (
                <p>Here is no Products</p>
            ) : (
                <ProductsList
                    products={products}
                    searchNameProduct={searchNameProduct}
                    flippedId={flippedId}
                    toggleFlip={toggleFlip}
                />
            )}
        </div>
    );
};

export default Products;
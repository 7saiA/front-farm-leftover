import {useEffect, useState} from "react";
import {base_url} from "../../utils/constants.ts";
import "./Product.css";
import ProductsList from "./ProductsList.tsx";
import type {Product} from "../../types/Product.ts";
import ProductSelector from "./ProductSelector.tsx";
import {ProductSortSelector} from "./ProductSortSelector.tsx";

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [flippedId, setFlippedId] = useState<number | null>(null);
    const [searchNameProduct, setSearchNameProduct] = useState<string>("");
    const [sortOption, setSortOption] = useState<string>("newest");

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${base_url}/products?sort=${sortOption}`);
                if (!response.ok) throw new Error(`Error response ${response.status}`);
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products", err);
            } finally {
                setLoading(false);
            }
        })();
    }, [sortOption]);

    const toggleFlip = (id: number) => {
        setFlippedId(flippedId === id ? null : id);
    };

    const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchNameProduct.toLowerCase())
    )

    return (
        <div className="products-page-container">
            <form className="product-form space-y-4">
                <div className="flex justify-between">
                    <ProductSelector value={searchNameProduct} onChange={setSearchNameProduct} />
                    <ProductSortSelector value={sortOption} onChange={setSortOption} />
                </div>
            </form>

            {loading ? (
                <p>Loading...</p>
            ) : filteredProducts.length === 0 ? (
                <p>Here is no Products</p>
            ) : (
                <ProductsList
                    products={filteredProducts}
                    searchNameProduct={searchNameProduct}
                    flippedId={flippedId}
                    toggleFlip={toggleFlip}
                />
            )}
        </div>
    );
};

export default Products;
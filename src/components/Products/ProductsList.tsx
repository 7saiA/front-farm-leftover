import type {Product} from "../../types/Product.ts";
import ProductCards from "./ProductCards.tsx";

interface ProductsListProps {
    products: Product[];
    searchNameProduct: string;
    flippedId: number | null;
    toggleFlip: (id: number) => void;
}

const ProductsList = ({products, searchNameProduct, flippedId, toggleFlip}: ProductsListProps) => {
    const filteredProducts = searchNameProduct
        ? products.filter(product =>
            product.productName.toLowerCase().includes(searchNameProduct.toLowerCase())
        )
        : products;

    if (filteredProducts.length === 0) {
        return (
            <div className="no-products-message">
                <p>No matching products available for sale.</p>
            </div>
        );
    }

    return (
        <div className="product-grid">
            {filteredProducts.map(product => (
                <ProductCards
                    key={product.productId}
                    product={product}
                    isFlipped={flippedId === product.productId}
                    onFlip={toggleFlip}
                />
            ))}
        </div>
    )
}

export default ProductsList;
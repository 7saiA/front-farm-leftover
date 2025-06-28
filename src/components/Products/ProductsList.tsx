import type {Product} from "../../types/Product.ts";
import ProductCards from "./ProductCards.tsx";

interface ProductsListProps {
    products: Product[];
    flippedId: number | null;
    toggleFlip: (id: number) => void;
    deleteProduct: (id: number) => void;
}

const ProductsList = ({products, flippedId, toggleFlip, deleteProduct}: ProductsListProps) => {
    return (
        <div className="product-grid">
            {products.map(product => (
                <ProductCards
                    key={product.productId}
                    product={product}
                    isFlipped={flippedId === product.productId}
                    onFlip={toggleFlip}
                    onDelete={deleteProduct}
                />
            ))}
        </div>
    )
}

export default ProductsList;
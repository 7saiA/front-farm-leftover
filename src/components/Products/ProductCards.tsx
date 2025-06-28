import type {Product} from "../../types/Product.ts";
import ProductCardFront from "./ProductCardFront.tsx";
import ProductCardBack from "./ProductCardBack.tsx";

interface ProductCardsProps {
    product: Product;
    isFlipped: boolean;
    onFlip: (id: number) => void;
    onDelete: (id: number) => void;
}

const ProductCards = ({product, isFlipped, onFlip, onDelete}: ProductCardsProps) => {
    return (
        <div className={`card ${isFlipped ? "flipped" : ""}`}>
            <div className="card-inner">
                <ProductCardFront product={product} onFlip={onFlip} onDelete={onDelete}/>
                <ProductCardBack product={product} onFlip={onFlip}/>
            </div>
        </div>
    )
}

export default ProductCards;
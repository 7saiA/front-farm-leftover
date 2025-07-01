import type {Product} from "../../types/Product.ts";

interface Props {
    product: Product;
    onFlip: (id: number) => void;
}

const ProductCardFront = ({product, onFlip}: Props) => {
    return (
        /* Front side */
        <div className="card-front">
            <h3>{product.productName}</h3>
            <p><strong>Price:</strong> {product.pricePerUnit} per {product.unit}</p>
            <p><strong>Available:</strong> {product.availableQuantity}</p>
            <p>
                <strong>Farm:</strong>{" "}
                <span className="farm-link" onClick={() => onFlip(product.productId)}>
                            {product.userForProductDto.login}
                        </span>
            </p>
        </div>
    )
}

export default ProductCardFront
import type {Product} from "../../types/Product.ts";
import {productOptionsWithImages} from "../../utils/constants.ts";

interface Props {
    product: Product;
    onFlip: (id: number) => void;
}

const ProductCardFront = ({product, onFlip}: Props) => {
    return (
        /* Front side */
        <div className="card-front">
            <h3>{product.productName}</h3>
            <div className="product-image-wrapper">
                <img
                    src={productOptionsWithImages.find(p => p.name === product.productName)?.image}
                    alt={product.productName}
                    className="product-preview-image"
                />
            </div>
            <p><strong>Price:</strong> {product.pricePerUnit} per {product.unit}</p>
            <p><strong>Available:</strong> {product.availableQuantity}</p>
            <div className="farm-name-button-wrapper">
            <span className="farm-name-label">Farm Name: </span>
                <button
                    className="greenButton smallButton"
                    onClick={() => {
                        onFlip(product.productId)
                    }}
                >
                    {product.userForProductDto.farmName}
                </button>
            </div>
        </div>
    )
}

export default ProductCardFront
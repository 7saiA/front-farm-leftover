import type {Product} from "../../types/Product.ts";

interface Props {
    product: Product;
    onFlip: (id: number) => void;
}

const ProductCardBack = ({product, onFlip}: Props) => {
    return (
        /* Back side */
        <div className="card-back">
            <div className="farm-header">
                <button
                    className="product-name-back-button"
                    onClick={() => {
                        onFlip(product.productId)
                    }}
                >
                    {product.productName}
                </button>
            </div>
            <h2>{product.userForProductDto.farmName}</h2>
            <p><strong>City:</strong> {product.userForProductDto.city ?? "N/A"}</p>
            <p><strong>Street:</strong> {product.userForProductDto.street ?? "N/A"}</p>
            <p><strong>Email:</strong> {product.userForProductDto.email}</p>
            <p><strong>Phone:</strong> {product.userForProductDto.phone}</p>
        </div>
    )
}

export default ProductCardBack;
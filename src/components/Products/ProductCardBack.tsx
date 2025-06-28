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
    <strong onClick={() => onFlip(product.productId)} className="product-name-back">
        {product.productName}
        </strong>
        </div>
        <h4>{product.userForProductDto.login}</h4>
        <p><strong>City:</strong> {product.userForProductDto.city ?? "nope"}</p>
    <p><strong>Street:</strong> {product.userForProductDto.street ?? "nope"}</p>
    </div>
    )
}

export default ProductCardBack;
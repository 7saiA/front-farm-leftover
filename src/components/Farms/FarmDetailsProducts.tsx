import {productOptionsWithImages} from "../../utils/constants.ts";
import type {ProductForFarmDto} from "../../types/Farm.ts";
import "./Farms.css";

const FarmDetailsProducts = ({product}: {product: ProductForFarmDto}) => {
    const productImage = productOptionsWithImages.find(p => p.name === product.productName)?.image;

    return (
        <div className="farm-product-card">
            <img
                src={productImage}
                alt={product.productName}
                className="farm-product-image"
            />
            <div className="farm-product-info">
                <h3 className="farm-product-title">{product.productName}</h3>
                <p><strong>Price:</strong> {product.pricePerUnit} ₪ / {product.unit}</p>
                <p><strong>Available:</strong> {product.availableQuantity}</p>
            </div>
        </div>
    );
};

export default FarmDetailsProducts;
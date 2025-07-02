import type {Product} from "../../types/Product.ts";
import ProductForm from "./ProductForm.tsx";

interface Props{
    product: Product;
    onUpdate: (product: Product) => void;
    onCancel: () => void;
}

const EditProductForm = ({product,onUpdate, onCancel}: Props) => {
    return (
        <ProductForm mode={"edit"}
                     initialProduct={product}
                     onSuccess={onUpdate}
                     onCancel={onCancel}
        />
    )
}

export default EditProductForm;
import ProductForm from "./ProductForm";
import type { Product } from "../../types/Product";

const AddProductForm = ({ onAdd }: { onAdd: (product: Product) => void }) => {
    return <ProductForm mode="add" onSuccess={onAdd} />;
};

export default AddProductForm;
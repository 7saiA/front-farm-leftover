import { useState } from "react";
import { base_url } from "../../utils/constants.ts";
import { useAppSelector } from "../../app/hooks.ts";
import type { Product } from "../../types/Product.ts";

const AddProductForm = ({ onAdd }: { onAdd: (product: Product) => void }) => {
    const { token, login } = useAppSelector(state => state.auth);
    const [productName, setProductName] = useState("");
    const [pricePerUnit, setPricePerUnit] = useState("");
    const [unit, setUnit] = useState("");
    const [availableQuantity, setAvailableQuantity] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${base_url}/products/${login}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productName,
                    pricePerUnit: parseFloat(pricePerUnit),
                    unit,
                    availableQuantity: parseInt(availableQuantity),
                }),
            });

            if (!res.ok) throw new Error("Failed to add product");

            const newProduct = await res.json();
            onAdd(newProduct); // передаём продукт наверх

            // сброс формы
            setProductName("");
            setPricePerUnit("");
            setUnit("");
            setAvailableQuantity("");
        } catch (err) {
            alert((err as Error).message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-product-form">
            <input placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} required />
            <input placeholder="Price per Unit" type="number" step="0.01" value={pricePerUnit} onChange={(e) => setPricePerUnit(e.target.value)} required />
            <input placeholder="Unit" value={unit} onChange={(e) => setUnit(e.target.value)} required />
            <input placeholder="Available Quantity" type="number" value={availableQuantity} onChange={(e) => setAvailableQuantity(e.target.value)} required />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddProductForm;
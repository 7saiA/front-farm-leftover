import type { Product } from "../../types/Product";
import {useState} from "react";
import * as React from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {base_url} from "../../utils/constants.ts";
import FarmProductSelector from "./FarmProductSelector.tsx";
import {fetchWithAuth} from "../../utils/fetchWithAuth.ts";

const AddProductForm = ({ onAdd }: { onAdd: (product: Product) => void }) => {
    const {login } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [productName, setProductName] = useState("");
    const [pricePerUnit, setPricePerUnit] = useState("");
    const [unit, setUnit] = useState("");
    const [availableQuantity, setAvailableQuantity] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const productData = {
            productName,
            pricePerUnit: parseFloat(pricePerUnit),
            unit,
            availableQuantity: parseInt(availableQuantity),
        }

        try {
            const res = await fetchWithAuth(`${base_url}/products/${login}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            },dispatch);

            if (!res.ok) throw new Error("Failed to add product");

            const result = await res.json();
            onAdd(result);

            setProductName("");
            setPricePerUnit("");
            setUnit("");
            setAvailableQuantity("");
        } catch (err) {
            alert((err as Error).message);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="product-form">
            <h3>Add Product</h3>
            <FarmProductSelector value={productName} onChange={setProductName}/>
            <input
                placeholder="Price per Unit"
                type="number"
                step="0.01"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value)}
                required
            />
            <select value={unit} onChange={(e) => setUnit(e.target.value)} required>
                <option value="">Select Unit</option>
                <option value="kg">kg</option>
                <option value="liters">liters</option>
                <option value="pcs">pcs</option>
                <option value="boxes">boxes</option>
                <option value="buckets">buckets</option>
            </select>
            <input
                placeholder="Available Quantity"
                type="number"
                value={availableQuantity}
                onChange={(e) => setAvailableQuantity(e.target.value)}
                required
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default AddProductForm;
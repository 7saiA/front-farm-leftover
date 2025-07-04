import type { Product } from "../../types/Product.ts";
import {base_url, productOptionsWithImages} from "../../utils/constants.ts";
import { useState } from "react";
import FarmProductSelector from "./FarmProductSelector.tsx";
import {fetchWithAuth} from "../../utils/fetchWithAuth.ts";
import {useAppDispatch} from "../../app/hooks.ts";

interface FarmProductProps {
    product: Product;
    onDelete: (productId: number) => void;
    onUpdate: (updated: Product) => void;
}

const FarmProduct = ({ product, onDelete, onUpdate }: FarmProductProps) => {
    const [editMode, setEditMode] = useState(false);
    const dispatch = useAppDispatch();
    const [productName, setProductName] = useState(product.productName);
    const [pricePerUnit, setPricePerUnit] = useState(product.pricePerUnit.toString());
    const [unit, setUnit] = useState(product.unit);
    const [availableQuantity, setAvailableQuantity] = useState(product.availableQuantity.toString());

    const handleDelete = async () => {
        try {
            const res = await fetchWithAuth(`${base_url}/products/${product.productId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            },dispatch);
            if (!res.ok) throw new Error("Failed to delete");
            onDelete(product.productId);
        } catch (err) {
            alert((err as Error).message);
        }
    };

    const handleUpdate = async () => {
        const updatedProduct = {
            productName,
            pricePerUnit: parseFloat(pricePerUnit),
            unit,
            availableQuantity: parseInt(availableQuantity)
        };

        try {
            const res = await fetchWithAuth(`${base_url}/products/${product.productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedProduct),
            },dispatch);

            if (!res.ok) throw new Error("Failed to update product");

            const result = await res.json();
            onUpdate(result);
            setEditMode(false);
        } catch (err) {
            alert((err as Error).message);
        }
    };

    return (
        <div className="product-card">
            {editMode ? (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate();
                }} className="product-form">
                    <h3>Edit Product</h3>
                    <FarmProductSelector value={productName} onChange={setProductName}/>
                    <input
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
                        type="number"
                        value={availableQuantity}
                        onChange={(e) => setAvailableQuantity(e.target.value)}
                        required
                    />

                    <div className="product-form-buttons">
                        <button type="button" className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
                        <button type="submit" className="save-btn">Save</button>
                    </div>
                </form>
            ) : (
                <>
                    <h3>{product.productName}</h3>
                    <img
                        src={
                            productOptionsWithImages.find(p => p.name === product.productName)?.image
                        }
                        alt={product.productName}
                        className="product-preview-image"
                    />
                    <p><strong>Price:</strong> {product.pricePerUnit} ₪ / {product.unit}</p>
                    <p><strong>Available:</strong> {product.availableQuantity}</p>
                    <button className="delete-btn" onClick={handleDelete}>Delete</button>
                    <button className="edit-btn" onClick={() => setEditMode(true)}>Edit</button>
                </>
            )}
        </div>
    );
};

export default FarmProduct;
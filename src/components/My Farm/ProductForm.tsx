import type {Product} from "../../types/Product.ts";
import {useAppSelector} from "../../app/hooks.ts";
import {useEffect, useState} from "react";
import * as React from "react";
import {base_url} from "../../utils/constants.ts";

interface ProductFormProps {
    mode: "add" | "edit";
    initialProduct?: Product;
    onSuccess: (product: Product) => void;
    onCancel?: () => void;
}

const ProductForm = ({mode, initialProduct, onSuccess, onCancel}: ProductFormProps) => {
    const {token, login} = useAppSelector((state) => state.auth);

    const [productName, setProductName] = useState("");
    const [pricePerUnit, setPricePerUnit] = useState("");
    const [unit, setUnit] = useState("");
    const [availableQuantity, setAvailableQuantity] = useState("");

    useEffect(() => {
        if(mode === "edit" && initialProduct){
            setProductName(initialProduct.productName);
            setPricePerUnit(initialProduct.pricePerUnit.toString());
            setUnit(initialProduct.unit);
            setAvailableQuantity(initialProduct.availableQuantity.toString());
        }
    }, [mode, initialProduct]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const productData = {
            productName,
            pricePerUnit: parseFloat(pricePerUnit),
            unit,
            availableQuantity: parseInt(availableQuantity),
        }

        const url = mode === "add" ? `${base_url}/products/${login}`
            : `${base_url}/products/${initialProduct!.productId}`;
        const method = mode === "add" ? "POST" : "PUT";

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json",
                },
                body: JSON.stringify(productData),
            });

            if(!res.ok) throw new Error("Failed to submit product!");

            const result = await res.json();
            onSuccess(result);

            if(mode === "add"){
                setProductName("");
                setPricePerUnit("");
                setUnit("");
                setAvailableQuantity("");
            }
        } catch (e) {
            alert((e as Error).message);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <h3>{mode === "add" ? "Add Product" : "Edit Product"}</h3>
            <input
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
            />
            <input
                placeholder="Price per Unit"
                type="number"
                step="0.01"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value)}
                required
            />
            <input
                placeholder="Unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                required
            />
            <input
                placeholder="Available Quantity"
                type="number"
                value={availableQuantity}
                onChange={(e) => setAvailableQuantity(e.target.value)}
                required
            />
            <button type="submit">{mode === "add" ? "Add" : "Save"}</button>
            {mode === "edit" && <button type="button" onClick={onCancel}>Cancel</button>}
        </form>
    );
}

export default ProductForm;
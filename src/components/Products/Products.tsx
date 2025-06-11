import {useEffect, useState} from "react";
import {base_url} from "../../utils/constants.ts";

interface Product {
    productId: string,
    farmId: string,
    productName: string,
    pricePerUnit: number,
    unit: string,
    availableQuantity: number,
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${base_url}/products`);
            if (!response.ok) {
                throw new Error(`Error response ${response.status}`);
            }
            const data: Product[] = await response.json();
            setProducts(data);
        } catch (err) {
            console.error("Error bug Products", err);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id: string) => {
        try {
            const response = await fetch(`${base_url}/products/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Ошибка при удалении: ${response.status}`);
            }
            setProducts(prev => prev.filter(product => product.productId !== id));
        } catch (err) {
            console.error("Ошибка при удалении продукта:", err);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Products List</h2>

            {loading ? (
                <p>Loading...</p>
            ) : products.length === 0 ? (
                <p>Here is no Products</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Product Id</th>
                        <th className="border p-2">Farm Id</th>
                        <th className="border p-2">Product Name</th>
                        <th className="border p-2">Price per unit</th>
                        <th className="border p-2">Unit</th>
                        <th className="border p-2">Available Quantity</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(product => (
                        <tr key={product.productId} className="text-center">
                            <td className="border p-2">{product.productId}</td>
                            <td className="border p-2">{product.farmId}</td>
                            <td className="border p-2">{product.productName}</td>
                            <td className="border p-2">{product.pricePerUnit}</td>
                            <td className="border p-2">{product.unit}</td>
                            <td className="border p-2">{product.availableQuantity}</td>
                            <td className="border p-2">
                                <button
                                    className="text-red-600 hover:underline"
                                    onClick={() => deleteProduct(product.productId)}
                                >
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Products;
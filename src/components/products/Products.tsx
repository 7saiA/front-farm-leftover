import {useGetProductsQuery} from "../../service/productsApi.ts";
import {useState} from "react";
import ProductList from "../product-list/ProductList.tsx";

const Product = () => {
    const [sortBy, setSortBy] = useState("newest");
    const { data, error, isLoading } = useGetProductsQuery({sort: sortBy});

    if (isLoading) {
        return (
            <div className="grid place-items-center h-screen">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        const errorMessage = 'status' in error
            ? error.data as string
            : 'An error occurred';
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-2xl font-bold animate-pulse">Error... {errorMessage}</div>
            </div>
        );
    }
    return (
        <div className="container-fluid">
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as string)}
                className={"flex flex-start left-2 mt-2 w-48 border-2 border-black  bg-gray-100 rounded-md shadow-lg py-1 mx-2"}
            >
                <option value="newest">Newest</option>
                <option value="price-low-high">Low to High</option>
                <option value="price-high-low">High to Low</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
            </select>
            <h1 className={"flex items-center justify-center text-2xl font-bold animate-pulse"}>
                Products List
            </h1>
            {data && data.length > 0 ? (
                <ProductList products={data}/>
            ) : (
                <p>No products found</p>
            )}
        </div>
    );
};

export default Product;
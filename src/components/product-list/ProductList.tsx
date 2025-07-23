import type {ProductDto} from "../../service/productsApi.ts";

interface Props {
    products: ProductDto[];
}

const ProductList = ({products}: Props) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
            {products.map((product) => (
                <div className="group transition-all duration-300 hover:scale-[1.02]"
                >
                    <div className="flex flex-col h-full p-3
                                    border border-gray-200
                                    rounded-lg shadow-sm
                                    group-hover:shadow-md transition-all duration-300">
                        <div className="aspect-auto mb-3 overflow-hidden rounded-lg">
                            <img
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                src="/images/pic.jpg"
                                alt={product.productName}
                            />
                        </div>

                        <div className="flex flex-col flex-grow px-1">
                            <h3 className="text-sm md:text-base lg:text-lg xl:text-xl
                                            font-semibold line-clamp-2 mb-1">
                                {product.productName}
                            </h3>
                            <p className="text-base md:text-lg lg:text-xl xl:text-2xl
                                            font-medium text-primary mb-2">
                                ${product.pricePerUnit}<span
                                className="text-xs md:text-sm text-gray-500">/{product.unit}</span>
                            </p>

                            <div className="mt-auto text-xs md:text-sm lg:text-md xl:text-lg space-y-1">
                                <p className="text-gray-600">
                                    <span className="font-medium">Available:</span> {product.availableQuantity}
                                </p>
                                <p className="text-gray-500">
                                    Added: {new Date(product.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <button className={"bg-blue-200 rounded-lg shadow-sm hover:shadow-md " +
                                "hover:bg-blue-300 transition-all duration-300"}
                                    onClick={() => {
                                    }}>
                                Buy
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductList;
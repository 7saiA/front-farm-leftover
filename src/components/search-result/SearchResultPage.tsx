import { useLocation } from 'react-router-dom';
import {useSearchQuery} from "../../service/productsApi.ts";

const SearchResultsPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q') || '';

    const { data, isLoading, error } = useSearchQuery(searchQuery,{
        skip: !searchQuery
    });

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                Search Results for "{searchQuery || '...'}"
            </h1>

            {isLoading && <p>Loading results...</p>}
            {error && <p>Error loading results</p>}

            {!searchQuery && (
                <p>Please enter a search term</p>
            )}

            {data && searchQuery && (
                <>
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-3">Farms</h2>
                        { (
                            data.farms.map(farm => (
                                <div key={farm.login}>{farm.farmName}</div>
                            ))
                        )}
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">Products</h2>
                        {(
                            data.products.map(product => (
                                <div key={product.productId}>{product.productName}</div>
                            ))
                        )}
                    </section>
                </>
            )}
        </div>
    );
};

export default SearchResultsPage;
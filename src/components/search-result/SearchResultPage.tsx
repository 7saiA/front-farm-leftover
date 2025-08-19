import { useLocation } from 'react-router-dom';
import {useSearchQuery} from "../../service/productsApi.ts";
import ErrorPage from "../error-page/ErrorPage.tsx";
import {withRememberMe} from "../../hoc/withRememberMe.tsx";
import {customCompose} from "../../utils/customCompose.ts";
import {withAuth} from "../../hoc/withAuth.tsx";

const SearchResultPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q') || '';

    const { data, isLoading, error } = useSearchQuery(searchQuery,{
        skip: !searchQuery
    });

    if (error) {
        const errorMessage = (
            error &&
            typeof error === 'object' &&
            'data' in error &&
            typeof error.data === 'string'
        )
            ? error.data
            : 'An error occurred';

        return <ErrorPage errorMessage={errorMessage} />;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                Search Results for "{searchQuery || '...'}"
            </h1>

            {isLoading && <p>Loading results...</p>}

            {!searchQuery && (
                <p>Please enter a search term</p>
            )}

            {data && searchQuery && (
                <>
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-3">Farms</h2>
                        { (
                            data.farms.map(farm => (
                                <div key={farm.phone}>{farm.farmName}</div>
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

export default customCompose(withRememberMe, withAuth)(SearchResultPage);
import {useLocation} from 'react-router-dom';
import {useSearchQuery} from "../../service/productsApi.ts";
import ErrorPage from "../error-page/ErrorPage.tsx";
import {withRememberMe} from "../../hoc/withRememberMe.tsx";
import {customCompose} from "../../utils/customCompose.ts";
import {withAuth} from "../../hoc/withAuth.tsx";
import IsLoading from "../is-loading-page/IsLoading.tsx";
import {Box, Button, Typography} from "@mui/material";
import ProductList from "../product-list/ProductList.tsx";
import FarmList from "../farm-list/FarmList.tsx";
import {useState} from "react";

const SearchResultPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q') || '';

    const {data, isLoading, error} = useSearchQuery(searchQuery, {
        skip: !searchQuery
    });

    const [selectedTab, setSelectedTab] = useState<'farms' | 'products'>('farms');

    if (isLoading) {
        return <IsLoading/>
    }

    if (error) {
        const errorMessage = (
            error &&
            typeof error === 'object' &&
            'data' in error &&
            typeof error.data === 'string'
        )
            ? error.data
            : 'An error occurred';

        return <ErrorPage errorMessage={errorMessage}/>;
    }

    return (
        <Box sx={{height: "100vh", display: "flex", flexDirection: "column"}}>
            <Typography
                variant="h4"
                fontWeight="bold"
                align="center"
                gutterBottom
                sx={{py: 2}}
            >
                Search Results for "{searchQuery || "..."}"
            </Typography>

            {!searchQuery && (
                <Typography color="info" align="center">
                    Please enter a search term
                </Typography>
            )}

            {data && searchQuery && (
                <Box sx={{flex: 1, display: "flex", flexDirection: "column", px: 2}}>
                    <Box sx={{display: "flex", justifyContent: "center", mb: 2}}>
                        <Button
                            onClick={() => setSelectedTab('farms')}
                            variant={selectedTab === 'farms' ? "contained" : "outlined"}
                            color={"success"}
                            sx={{mx: 2}}
                        >
                            Farms
                        </Button>
                        <Button
                            onClick={() => setSelectedTab('products')}
                            variant={selectedTab === 'products' ? "contained" : "outlined"}
                            color={"primary"}
                            sx={{mx: 2}}
                        >
                            Products
                        </Button>
                    </Box>

                    {selectedTab === 'farms' && (
                        data.farms && data.farms.length > 0 ? (
                            <FarmList farms={data.farms}/>
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mt: 8
                                }}
                            >
                                <Typography align="center" color="success" variant="h4">
                                    No farms found
                                </Typography>
                            </Box>
                        )
                    )}

                    {selectedTab === 'products' && (
                        data.products && data.products.length > 0 ? (
                            <ProductList products={data.products}/>
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mt: 8
                                }}
                            >
                                <Typography align="center" color="primary" variant="h4">
                                    No products found
                                </Typography>
                            </Box>
                        )
                    )}
                </Box>
            )}
        </Box>
    );
};

export default customCompose(withRememberMe, withAuth)(SearchResultPage);
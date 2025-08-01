import {
    Box,
    Fade,
    Typography
} from "@mui/material";
import {useParams} from "react-router-dom";
import IsLoading from "../is-loading-page/IsLoading.tsx";
import ErrorPage from "../error-page/ErrorPage.tsx";
import {useGetFarmByNameQuery} from "../../service/userApi.ts";
import FarmCard from "../farm-card/FarmCard.tsx";
import FarmProductList from "../farm-product-list/FarmProductList.tsx";

const FarmPage = () => {
    const {farmName} = useParams<{ farmName: string }>();
    const {data: farm, isLoading, error} = useGetFarmByNameQuery(farmName || '', {
        skip: !farmName
    });

    if (!farmName) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80vh',
                p: 3,
                textAlign: 'center'
            }}>
                <Typography color="error" variant="h4">
                    Farm name is missing
                </Typography>
            </Box>
        );
    }

    if (isLoading) {
        return <IsLoading/>
    }

    if (error) {
        const errorMessage = 'status' in error
            ? error.data as string
            : 'An error occurred';
        return <ErrorPage errorMessage={errorMessage}/>
    }

    if (!farm) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80vh',
                p: 3,
                textAlign: 'center'
            }}>
                <Typography color={"secondary"}
                            variant={"h3"}>
                    No Farms Found
                </Typography>
            </Box>
        )
    }

    return (
        <Box sx={{
            pt: 4,
            display: 'flex',
            flexDirection: 'column',
            mx: 4,
            gap: 4,
        }}>
            <Fade in={true} timeout={1000}>
                <Typography variant="h4"
                            align="center"
                            sx={{mt: 2}}>
                    {farm.farmName}
                </Typography>
            </Fade>
            <Box>
                <FarmCard farm={farm} isFarmPage={true}/>
            </Box>
            {farm.products && farm.products.length > 0 ? (
                <FarmProductList farmProducts={farm.products}/>
            ) : (
                <Typography color={"secondary"}
                            variant={"h3"}>
                    No Products Found
                </Typography>
            )}
        </Box>
    )
}

export default FarmPage;
import {Box, Fade, Typography} from "@mui/material";
import {customCompose} from "../../utils/customCompose.ts";
import {withRememberMe} from "../../hoc/withRememberMe.tsx";
import {withAuth} from "../../hoc/withAuth.tsx";
import {useGetOrderQuery} from "../../service/orderApi.ts";
import IsLoading from "../is-loading-page/IsLoading.tsx";
import ErrorPage from "../error-page/ErrorPage.tsx";
import {useParams} from "react-router-dom";
import OrderCard from "./OrderCard.tsx";
import OrderProductList from "./OrderProductList.tsx";

const OrderInfo = () => {
    const {orderId} = useParams<{orderId: string}>()
    const {data, isLoading, error} = useGetOrderQuery(orderId || '', {
        skip: !orderId
    });

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

        return <ErrorPage errorMessage={errorMessage} />;
    }

    return (
        <Box
            sx={{
                pt: 4,
                display: "flex",
                flexDirection: "column",
                mx: 4,
                gap: 4,
            }}
        >
            {data ? (
                <>
                    <Fade in timeout={1000}>
                        <Typography variant="h4" align="center" sx={{ mt: 2 }}>
                            Order Info
                        </Typography>
                    </Fade>

                    <Box>
                        <OrderCard order={data} />
                    </Box>

                    {data.items && data.items.length > 0 ? (
                        <OrderProductList items={data.items} />
                    ) : (
                        <Typography color="secondary" variant="h3">
                            No Orders Found
                        </Typography>
                    )}
                </>
            ) : (
                <Typography color="secondary" variant="h3">
                    No Orders Found
                </Typography>
            )}
        </Box>
    );
}

export default customCompose(withRememberMe, withAuth)(OrderInfo);
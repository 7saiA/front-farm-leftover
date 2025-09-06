import {Box, Typography} from "@mui/material";
import {customCompose} from "../../utils/customCompose.ts";
import {withRememberMe} from "../../hoc/withRememberMe.tsx";
import {withAuth} from "../../hoc/withAuth.tsx";
import {useGetOrderQuery} from "../../service/orderApi.ts";
import IsLoading from "../is-loading-page/IsLoading.tsx";
import ErrorPage from "../error-page/ErrorPage.tsx";
import {useParams} from "react-router-dom";

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
        <Box sx={{
            pt: 4,
            display: 'flex',
            flexDirection: 'column',
            mx: 4,
            gap: 4,
        }}>
            {data ? (
                <Typography>
                    {data.orderId}
                </Typography>
            ) : (
                <Typography color={"secondary"}
                            variant={"h3"}>
                    No Order Found
                </Typography>
            )}
        </Box>
    );
}

export default customCompose(withRememberMe, withAuth)(OrderInfo);
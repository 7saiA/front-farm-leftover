import {useGetMyOrdersQuery} from "../../service/orderApi.ts";
import {Box, Fade, Typography} from "@mui/material";
import IsLoading from "../is-loading-page/IsLoading.tsx";
import ErrorPage from "../error-page/ErrorPage.tsx";
import OrderList from "./OrderList.tsx";
import {customCompose} from "../../utils/customCompose.ts";
import {withRememberMe} from "../../hoc/withRememberMe.tsx";
import {withAuth} from "../../hoc/withAuth.tsx";

const Orders = () => {
    const {data, error, isLoading} = useGetMyOrdersQuery();

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
            <Fade in={true} timeout={1000}>
                <Typography variant="h4"
                            align="center"
                            sx={{mt: 2}}>
                    My Orders
                </Typography>
            </Fade>
            <OrderList orders={data}/>
        </Box>
    )
}

export default customCompose(withRememberMe, withAuth)(Orders);
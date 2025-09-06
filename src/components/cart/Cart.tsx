import {Box, Typography, Fade} from "@mui/material";
import {
    useGetCartQuery,
} from "../../service/cartApi.ts";
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import {withRememberMe} from "../../hoc/withRememberMe.tsx";
import {customCompose} from "../../utils/customCompose.ts";
import {withAuth} from "../../hoc/withAuth.tsx";
import IsLoading from "../is-loading-page/IsLoading.tsx";
import ErrorPage from "../error-page/ErrorPage.tsx";
import CartList from "./CartList.tsx";

const Cart = () => {
    const { data: cart, error, isLoading } = useGetCartQuery();

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

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
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
            }}
        >
            <Fade in={true} timeout={1000}>
                <Typography variant="h4" gutterBottom color={"primary"}>
                    Your Cart
                </Typography>
            </Fade>

            {cart?.items?.length ? (
                <CartList cart={cart} setSnackbar={setSnackbar}/>
            ) : (
                <Typography variant="body1">Your cart is empty</Typography>
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default customCompose(withRememberMe, withAuth)(Cart);
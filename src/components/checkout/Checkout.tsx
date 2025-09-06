import {useCancelReservationMutation, usePlaceOrderMutation} from "../../service/orderApi.ts";
import {useNavigate} from "react-router-dom";
import {Box, Button, Fade, Typography} from "@mui/material";
import {customCompose} from "../../utils/customCompose.ts";
import {withRememberMe} from "../../hoc/withRememberMe.tsx";
import {withAuth} from "../../hoc/withAuth.tsx";

const Checkout = () => {
    const [placeOrder] = usePlaceOrderMutation();
    const [cancelReservation] = useCancelReservationMutation();
    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        try {
            await placeOrder().unwrap();
            navigate('/orders')
        } catch (error) {
            console.error('Payment failed:', error);
            navigate('/cart')
            // const message = (error as ApiError).data.message ? (error as ApiError).data.message : "Unexpected error";
        }
    }

    const handleCancelReservation = async () => {
        try {
            await cancelReservation().unwrap();
            navigate('/cart')
        } catch (error) {
            console.error('Cancel reservation failed:', error);
            navigate('/')
        }
    }

    return (
        <Box
            sx={{
                pt: 4,
                display: 'flex',
                flexDirection: 'column',
                mx: 4,
                gap: 4,
            }}
        >
            <Fade in={true} timeout={1000}>
                <Typography variant="h4"
                            align="center"
                            sx={{mt: 2}}>
                    Fake Transaction
                </Typography>
            </Fade>
            <Fade in={true} timeout={1000}>
                <Typography variant="h4"
                            align="center"
                            sx={{mt: 2}}>
                    Just press button below to check it
                </Typography>
            </Fade>
            <Fade in={true} timeout={1000}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handlePlaceOrder}
                >
                    Confirm your order
                </Button>
            </Fade>
            <Fade in={true} timeout={1000}>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleCancelReservation}
                >
                    Back to cart
                </Button>
            </Fade>
        </Box>
    )
}

export default customCompose(withRememberMe, withAuth)(Checkout);
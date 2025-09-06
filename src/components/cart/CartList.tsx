import {
    Avatar,
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useClearCartMutation, useDeleteCartItemMutation} from "../../service/cartApi.ts";
import type {CartResponseDto} from "../../models/CartModels.ts";
import {useCreatePaymentMutation} from "../../service/paypalApi.tsx";
import IsLoading from "../is-loading-page/IsLoading.tsx";

interface SnackbarState {
    open: boolean;
    message: string;
    severity: 'success' | 'error';
}

interface Props {
    cart: CartResponseDto;
    setSnackbar: React.Dispatch<React.SetStateAction<SnackbarState>>;
}

const CartList = ({cart, setSnackbar}: Props) => {
    const [clearCart] = useClearCartMutation();
    const [deleteCartItem] = useDeleteCartItemMutation();
    const [createPayment, {isLoading}] = useCreatePaymentMutation();

    const handleClearCart = async () => {
        try {
            await clearCart().unwrap();
            setSnackbar({
                open: true,
                message: 'Cart cleared successfully',
                severity: 'success',
            });
        } catch (err) {
            console.error('Clearing cart failed:', err);
            setSnackbar({
                open: true,
                message: 'Failed to clear cart',
                severity: 'error',
            });
        }
    };

    const handleDeleteItem = async (cartItemId: number) => {
        try {
            await deleteCartItem({ cartItemId }).unwrap();
            setSnackbar({
                open: true,
                message: 'Item removed from cart',
                severity: 'success',
            });
        } catch (err) {
            console.error('Delete item failed:', err);
            setSnackbar({
                open: true,
                message: 'Failed to remove item',
                severity: 'error',
            });
        }
    };

    const handleCheckout = async () => {
        const urls = {
            successUrl: 'http://localhost:5174/paypal-success',
            cancelUrl: 'http://localhost:5174/cart',
        };

        try {
            const response = await createPayment(urls).unwrap();
            window.location.href = response.approvalUrl;
        } catch (err) {
            console.error('PayPal payment failed:', err);
            setSnackbar({
                open: true,
                message: 'Payment failed. Try again.',
                severity: 'error',
            });
        }
    };

    if (isLoading) {
        return <IsLoading/>
    }

    return (
        <Box sx={{ width: "90%", mx: "auto", mt: 2 }}>
            <List>
                {cart.items.map((item) => (
                    <ListItem
                        key={item.cartItemId}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            borderBottom: "1px solid black",
                            py: 2,
                            minHeight: 80,
                            width: "100%",
                        }}
                        secondaryAction={
                            <IconButton
                                edge="end"
                                color="error"
                                onClick={() => handleDeleteItem(item.cartItemId)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <Avatar
                            src={item.imgUrl ? item.imgUrl : "/images/pic.jpg"}
                            alt={item.productName}
                            sx={{ width: 56, height: 56, mr: { xs: 1, sm: 2 } }}
                        />

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: {xs:"flex-start",md:"space-around"},
                                flexWrap: "wrap",
                                gap: { xs: 1, sm: 2 },
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                color={"primary"}
                                sx={{
                                    flexBasis: { xs: "100%", sm: "25%" },
                                    fontSize: { xs: "0.9rem", sm: "1rem" },
                                }}
                            >
                                {item.productName}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="black"
                                sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
                            >
                                {item.pricePerUnit}₪ per {item.unit}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color={"black"}
                                sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
                            >
                                Quantity: {item.quantity}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                color={"secondary"}
                                sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
                            >
                                Subtotal: {item.subtotal}₪
                            </Typography>
                        </Box>
                    </ListItem>
                ))}
            </List>

            <Box
                sx={{
                    mt: 3,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "stretch", sm: "center" },
                    gap: { xs: 2, sm: 0 },
                }}
            >
                <Typography
                    variant="h6"
                    color="success"
                    sx={{
                        fontSize: { xs: "1rem", sm: "1.25rem" },
                        textAlign: { xs: "center", sm: "left" },
                    }}
                >
                    Total: {cart.totalPrice}₪
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: { xs: 1, sm: 2 },
                        justifyContent: { xs: "center", sm: "flex-end" },
                        flexWrap: "wrap",
                    }}
                >
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleCheckout}
                        sx={{
                            fontSize: { xs: "0.75rem", sm: "0.9rem" },
                            px: { xs: 2, sm: 3 },
                            py: { xs: 0.5, sm: 1 },
                        }}
                    >
                        Checkout
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleClearCart}
                        sx={{
                            fontSize: { xs: "0.75rem", sm: "0.9rem" },
                            px: { xs: 2, sm: 3 },
                            py: { xs: 0.5, sm: 1 },
                        }}
                    >
                        Clear Cart
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default CartList;
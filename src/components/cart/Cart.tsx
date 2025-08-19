import {Box, Typography, List, Button, IconButton, CardContent, Card} from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store.ts";
import {
    useGetCartQuery,
    useClearCartMutation,
    useDeleteCartItemMutation
} from "../../service/cartApi.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import {withRememberMe} from "../../hoc/withRememberMe.tsx";
import {customCompose} from "../../utils/customCompose.ts";
import {withAuth} from "../../hoc/withAuth.tsx";

const Cart = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const { data: cart } = useGetCartQuery();
    const [clearCart] = useClearCartMutation();
    const [deleteCartItem] = useDeleteCartItemMutation();

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

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

    if (!isAuthenticated) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Typography variant="h6">Please log in to view your cart</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>Your Cart</Typography>

            {cart?.items?.length ? (
                <>

                    <List sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
                        {cart.items.map((item) => (
                            <Card key={item.productId} variant="outlined" sx={{ mb: 2 }}>
                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">{item.productName}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.pricePerUnit} per {item.unit}
                                        </Typography>
                                        <Typography variant="body2">Qty: {item.quantity}</Typography>
                                        <Typography variant="subtitle2" color="text.primary" sx={{ mt: 0.5 }}>
                                            Subtotal: {item.subtotal}
                                        </Typography>
                                    </Box>

                                    <IconButton
                                        color="error"
                                        onClick={() => handleDeleteItem(item.cartItemId)}
                                        aria-label="delete"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </CardContent>
                            </Card>
                        ))}
                    </List>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleClearCart}
                        >
                            Clear Cart
                        </Button>
                        <Typography variant="h5">
                            Total: {cart.totalPrice}
                        </Typography>
                    </Box>
                </>
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
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default customCompose(withRememberMe, withAuth)(Cart);
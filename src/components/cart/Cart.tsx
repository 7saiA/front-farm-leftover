import { Box, Typography, List, ListItem, Divider, Button, IconButton } from "@mui/material";
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

const Cart = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const { data: cart, refetch } = useGetCartQuery();
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
            refetch();
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
            refetch();
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
                    <List>
                        {cart.items.map((item) => (
                            <Box key={item.productId}>
                                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Box>
                                        <Typography variant="h6">{item.productName}</Typography>
                                        <Typography variant="body2">
                                            {item.pricePerUnit} per {item.unit}
                                        </Typography>
                                    </Box>
                                    <Box textAlign="right" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box sx={{ mr: 2 }}>
                                            <Typography>Qty: {item.quantity}</Typography>
                                            <Typography>Subtotal: {item.subtotal}</Typography>
                                        </Box>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDeleteItem(item.cartItemId)}
                                            aria-label="delete"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </ListItem>
                                <Divider />
                            </Box>
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

export default Cart;
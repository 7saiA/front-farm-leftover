import type {ProductDto} from "../../service/productsApi.ts";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Fade, Paper, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useAddToCartMutation} from "../../service/cartApi.ts";
import { Snackbar, Alert } from '@mui/material';
import {useState} from "react";

interface Props {
    products: ProductDto[];
}

const ProductList = ({products}: Props) => {
    const navigate = useNavigate();

    const [addToCart] = useAddToCartMutation();
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

    const handleAddToCart = async (productId: string) => {
        try {
            await addToCart({ productId, quantity: 1 }).unwrap();
            setSnackbar({
                open: true,
                message: 'Added to cart!',
                severity: 'success',
            });
        } catch (error) {
            console.error('Add to cart failed:', error);
            setSnackbar({
                open: true,
                message: 'Failed to add to cart',
                severity: 'error',
            });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleFarmClick = (farmName: string) => {
        navigate(`/farm/${farmName}`);
    };

    return (
        <Box sx={{
            pt: 4,
            display: 'grid',
            gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
                xl: 'repeat(5, 1fr)'
            },
            mx: 4,
            gap: 4,
        }}>
            {products && products.length > 0 ? (
                products.map((product) => (
                    <Fade in={true} timeout={1000}>
                        <Paper elevation={8}
                               sx={{borderRadius: 2}}>
                            <Card variant="elevation"
                                  sx={{
                                      height: '100%',
                                      border: 1,
                                      borderColor: "purple",
                                      borderRadius: 2
                                  }}>
                                <CardMedia
                                    sx={{height: 160}}
                                    image={product.imgUrl ? product.imgUrl : "/images/pic.jpg"}
                                    title={"product"}/>
                                <CardContent>
                                    <Typography gutterBottom
                                                variant="h5"
                                                component="div">
                                        {product.productName}
                                    </Typography>
                                    <Typography variant={"body1"}>
                                        Price: {product.pricePerUnit}/{product.unit}
                                    </Typography>
                                    <Typography variant={"body1"}>
                                        Available: {product.availableQuantity}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{justifyContent: "center"}}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1
                                    }}>
                                        <Button size={"small"}
                                                variant={"contained"}
                                                color={"secondary"}
                                                onClick={() => handleFarmClick(product.farmName)}>
                                            {product.farmName}
                                        </Button>
                                        <Button size={"small"}
                                                variant={"contained"}
                                                onClick={() => handleAddToCart(product.productId)}>
                                            Add to Cart
                                        </Button>
                                    </Box>
                                </CardActions>
                            </Card>
                        </Paper>
                    </Fade>
                ))) : (
                <Typography color={"secondary"}
                            variant={"h3"}>
                    No Products Found
                </Typography>
            )}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default ProductList;
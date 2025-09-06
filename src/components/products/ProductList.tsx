import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Fade,
    IconButton,
    Paper,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useAddToCartMutation} from "../../service/cartApi.ts";
import { Snackbar, Alert } from '@mui/material';
import {useState} from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import type {ProductDto} from "../../models/ProductModels.ts";
import type {ApiError} from "../../models/ErrorInterfaces.ts";

interface Props {
    products: ProductDto[];
    isFarmPage: boolean;
}

const ProductList = ({products, isFarmPage}: Props) => {
    const navigate = useNavigate();

    const [addToCart] = useAddToCartMutation();
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

    const handleQuantityChange = (productId: string, delta: number) => {
        setQuantities((prev) => {
            const newValue = Math.max((prev[productId] || 1) + delta, 1);
            return { ...prev, [productId]: newValue };
        });
    };

    const handleAddToCart = async (productId: string) => {
        const quantity = quantities[productId] || 1;
        try {
            await addToCart({ productId, quantity}).unwrap();
            setSnackbar({
                open: true,
                message: `Added ${quantity} item(s) to cart!`,
                severity: 'success',
            });
        } catch (error) {
            console.error('Add to cart failed:', error);
            const message = (error as ApiError).data.message ? (error as ApiError).data.message : "Unexpected error";
            setSnackbar({
                open: true,
                message: message,
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
                    <Fade in={true} timeout={1000} key={product.productId}>
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
                                        Price: {product.pricePerUnit}₪ per {product.unit}
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
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1
                                            }}
                                        >
                                            <IconButton
                                                size="small"
                                                onClick={() => handleQuantityChange(product.productId, 1)}
                                            >
                                                <AddIcon />
                                            </IconButton>

                                            <Typography>{quantities[product.productId] || 1}</Typography>

                                            <IconButton
                                                size="small"
                                                onClick={() => handleQuantityChange(product.productId, -1)}
                                            >
                                                <RemoveIcon />
                                            </IconButton>
                                        </Box>
                                        <Button size={"small"}
                                                variant={"contained"}
                                                onClick={() => handleAddToCart(product.productId)}>
                                            Add to Cart
                                        </Button>
                                        {!isFarmPage && (
                                            <Button size={"small"}
                                                    variant={"contained"}
                                                    color={"secondary"}
                                                    onClick={() => handleFarmClick(product.farmName)}>
                                                {product.farmName}
                                            </Button>
                                        )}
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
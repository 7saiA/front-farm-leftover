import type {ProductDto} from "../../service/productsApi.ts";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Fade, Paper, Typography} from "@mui/material";

interface Props {
    products: ProductDto[];
}

const ProductList = ({products}: Props) => {

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
            {products.map((product) => (
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
                                image={"/images/pic.jpg"}
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
                                <Typography variant={"caption"}>
                                    Added: {new Date(product.createdAt).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{justifyContent: "center"}}>
                                <Button size={"small"}
                                        variant={"contained"}
                                        color="secondary"
                                        sx={{
                                            backgroundColor: 'purple.500',
                                            '&:hover': {
                                                backgroundColor: 'purple.700',
                                            }
                                        }}>
                                    Add to cart
                                </Button>
                            </CardActions>
                        </Card>
                    </Paper>
                </Fade>
            ))}
        </Box>
    )
}

export default ProductList;
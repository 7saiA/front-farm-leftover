import {Box, Button, Card, CardActions, CardContent, CardMedia, Fade, Paper, Typography} from "@mui/material";
import type {ProductForFarmDto} from "../../service/authApi.ts";

interface Props {
    farmProducts: ProductForFarmDto[];
    isMyFarmProfile?: boolean;
}

const ProductListFM = ({farmProducts, isMyFarmProfile}: Props) => {

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
            {farmProducts && farmProducts.length > 0 ? (
                farmProducts.map((product) => (
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
                                    {!isMyFarmProfile ? (
                                        <Button size={"small"}
                                                variant={"contained"}>
                                            Add to cart
                                        </Button>
                                    ) : (
                                        <Box>
                                            <Button size={"small"}
                                                    variant={"contained"}>
                                                Edit
                                            </Button>
                                            <Button size={"small"}
                                                    variant={"contained"}>
                                                Delete
                                            </Button>
                                        </Box>
                                    )}
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
        </Box>
    )
}

export default ProductListFM;
import {Card, CardContent, CardMedia, Fade, Paper, Typography} from "@mui/material";
import type {OrderResponseDto} from "../../models/OrderModels.ts";

interface Props {
    order: OrderResponseDto;
}

const OrderCard = ({order}: Props) => {
    return (
        <Fade in={true} timeout={1000}>
            <Paper elevation={8}
                   sx={{borderRadius: 2}}>
                <Card variant="elevation"
                      sx={{
                          height: '100%',
                          border: 1,
                          borderColor: "green",
                          borderRadius: 2
                      }}>
                    <CardMedia
                        sx={{height: 160}}
                        image={"/images/products/carrot.jpg"}
                        title={`${order.orderId}`}/>
                    <CardContent>
                        <Typography gutterBottom
                                    variant="h5"
                                    component="div">
                            Order Id: {order.orderId}
                        </Typography>
                        <Typography variant={"body1"}>
                            Status: {order.orderStatus}
                        </Typography>
                        <Typography variant={"body1"}>
                            Total price: {order.totalPrice}$
                        </Typography>
                        <Typography variant={"body1"}>
                            Farm name: {order.farmName}
                        </Typography>
                        <Typography variant={"body1"}>
                            Location: {order.city}, {order.street}
                        </Typography>
                    </CardContent>
                </Card>
            </Paper>
        </Fade>
    )
}

export default OrderCard;
import {Avatar, Box, List, ListItem, Typography} from "@mui/material";
import type {OrderItemDto} from "../../models/OrderModels.ts";

interface Props {
    items: OrderItemDto[];
}

const OrderProductList = ({items}: Props) => {
    return (
        <Box sx={{ width: "90%", mx: "auto", mt: 2 }}>
            <List>
                {items.map((item) => (
                    <ListItem
                        key={item.productId}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            borderBottom: "1px solid black",
                            py: 2,
                            minHeight: 80,
                            width: "100%",
                        }}
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
                                Price: {item.pricePerUnit}$ per {item.unit}
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
                                Subtotal: {item.subtotal}$
                            </Typography>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default OrderProductList;
import {
    Avatar,
    Box,
    List,
    ListItem,
    Typography,
    Popover, IconButton
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import type {OrderResponseDto} from "../../models/OrderModels.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

interface Props {
    orders: OrderResponseDto[] | undefined;
}

const OrderList = ({orders}: Props) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [popoverContent, setPopoverContent] = useState<string>("");
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLElement>, orderId: string) => {
        setAnchorEl(event.currentTarget);
        setPopoverContent(`${orderId}`);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <Box sx={{ width: "90%", mx: "auto", mt: 2 }}>
            <List>
                {orders && orders.length > 0 ? (
                    orders.map((order) => (
                        <ListItem
                            key={order.orderId}
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
                                    size="medium"
                                    color="info"
                                    onClick={() => navigate(`/orders/${order.orderId}`)}
                                >
                                    <InfoOutlinedIcon />
                                </IconButton>
                            }
                        >
                            <Avatar
                                src={"/images/products/strawberry.jpg"}
                                alt={`Order ${order.orderId}`}
                                sx={{ width: 56, height: 56, mr: { xs: 1, sm: 2 } }}
                            />

                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: { xs: "flex-start", md: "space-around" },
                                    flexWrap: "wrap",
                                    gap: { xs: 1, sm: 2 },
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                    color="primary"
                                    sx={{
                                        flexBasis: { xs: "100%", sm: "25%" },
                                        fontSize: { xs: "0.9rem", sm: "1rem" },
                                        cursor: "pointer",
                                        textDecoration: "underline",
                                        textUnderlineOffset: "4px",
                                    }}
                                    onClick={(e) => handleClick(e, order.orderId)}
                                >
                                    Order ID
                                </Typography>

                                <Typography
                                    variant="subtitle1"
                                    color="black"
                                    sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
                                >
                                    Status: {order.orderStatus}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="black"
                                    sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
                                >
                                    Farm: {order.farmName}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="secondary"
                                    sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
                                >
                                    Address: {order.city}, {order.street}
                                </Typography>
                            </Box>
                        </ListItem>
                    ))
                ) : (
                    <Typography
                        color="secondary"
                        variant="h3"
                        sx={{ textAlign: "center", mt: 4 }}
                    >
                        No Orders Found
                    </Typography>
                )}
            </List>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{ p: 1 }}>
                    <Typography variant="body2">{popoverContent}</Typography>
                </Box>
            </Popover>
        </Box>
    );
};

export default OrderList;
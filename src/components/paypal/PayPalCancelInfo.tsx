import {Box, Button, Typography} from "@mui/material";
import {usePayCancelMutation} from "../../service/paypalApi.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const PayPalCancelInfo = () => {
    const [payCancel] = usePayCancelMutation();
    const [message, setMessage] = useState<string>("Cancelling payment...");
    const navigate = useNavigate();

    useEffect(() => {
        const cancelPayment = async () => {
            try {
                const res = await payCancel().unwrap();
                setMessage(res.message || "Payment was cancelled");
            } catch (err) {
                console.error("Failed to cancel payment:", err);
                setMessage("Failed to cancel payment");
            }
        };

        cancelPayment();
    }, [payCancel]);

    return (
        <Box sx={{textAlign: "center", mt: 8}}>
        <Typography variant="h5" color="error">
            {message}
        </Typography>
        <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/cart")}
        >
            Back to Cart
        </Button>
    </Box>
    );
};

export default PayPalCancelInfo;
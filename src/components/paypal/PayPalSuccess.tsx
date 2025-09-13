import {useNavigate, useSearchParams} from "react-router-dom";
import {usePaySuccessMutation} from "../../service/paypalApi.ts";
// import {Box, Button, Typography} from "@mui/material";
import IsLoading from "../is-loading-page/IsLoading.tsx";
import {useEffect} from "react";
import {customCompose} from "../../utils/customCompose.ts";
import {withRememberMe} from "../../hoc/withRememberMe.tsx";
import {withAuth} from "../../hoc/withAuth.tsx";

const PayPalSuccess = () => {
    const [searchParams] = useSearchParams();
    const paymentId = searchParams.get("paymentId");
    const payerId = searchParams.get("PayerID");
    const [paySuccess] = usePaySuccessMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (paymentId && payerId) {
            const confirmPayment = async () => {
                console.log("paymentId:", paymentId, "PayerID:", payerId);
                try {
                    const res = await paySuccess({ paymentId, payerId }).unwrap();
                    if (res.message === "Payment successful!") {
                        navigate('/orders');
                    }
                } catch (e) {
                    console.error("Payment failed:", e);
                }
            };

            confirmPayment();
        }
    }, [paymentId, payerId, paySuccess, navigate]);

    return <IsLoading/>
};

export default customCompose(withRememberMe, withAuth)(PayPalSuccess);
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import IsLoading from "../is-loading-page/IsLoading.tsx";

const PayPalRedirect = () => {
    const [searchParams] = useSearchParams();
    const paymentId = searchParams.get("paymentId");
    const payerId = searchParams.get("PayerID");

    useEffect(() => {
        if (paymentId && payerId) {
            if (window.opener) {
                window.opener.postMessage(
                    {
                        type: "PAYPAL_FOR_SUCCESS",
                        paymentId,
                        payerId
                    },
                    window.location.origin
                );
                window.close();
            }
        }
    }, [paymentId, payerId]);

    return <IsLoading/>
};

export default PayPalRedirect;
import {useEffect} from "react";
import IsLoading from "../is-loading-page/IsLoading.tsx";

const PayPalCancelRedirect = () => {
    useEffect(() => {
        if (window.opener) {
            window.opener.postMessage(
                { type: "PAYPAL_FOR_CANCEL" },
                window.location.origin
            );
            window.close();
        }
    }, []);

    return <IsLoading />;
};

export default PayPalCancelRedirect;
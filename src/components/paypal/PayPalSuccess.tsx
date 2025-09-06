import {useNavigate, useSearchParams} from "react-router-dom";
import {usePaySuccessMutation} from "../../service/paypalApi.tsx";
import {useEffect} from "react";
import IsLoading from "../is-loading-page/IsLoading.tsx";
import ErrorPage from "../error-page/ErrorPage.tsx";
import {customCompose} from "../../utils/customCompose.ts";
import {withRememberMe} from "../../hoc/withRememberMe.tsx";
import {withAuth} from "../../hoc/withAuth.tsx";

const PayPalSuccess = () => {
    const [searchParams] = useSearchParams();
    const paymentId = searchParams.get("paymentId");
    const payerId = searchParams.get("PayerID");
    const navigate = useNavigate();

    const [paySuccess, { data, error, isLoading }] = usePaySuccessMutation();

    useEffect(() => {
        if (paymentId && payerId) {
            const executePayment = async () => {
                try {
                    const res = await paySuccess({paymentId, payerId}).unwrap();
                    console.log(res);
                    if(res.message === "Payment successful!") {
                        navigate("/orders");
                    }
                } catch (err) {
                    console.error('Payment failed:', err);
                }
            };
            executePayment();
        }
    }, [paymentId, payerId]);

    if (isLoading) {
        return <IsLoading/>
    }

    if (error) {
        const errorMessage = (
            error &&
            typeof error === 'object' &&
            'data' in error &&
            typeof error.data === 'string'
        )
            ? error.data
            : 'An error occurred';

        return <ErrorPage errorMessage={errorMessage} />;
    }

    return <div>{data ? data.message : "Waiting for payment confirmation..."}</div>;
}

export default customCompose(withRememberMe, withAuth)(PayPalSuccess);
import {useGetCurrentUserQuery} from "../../service/userApi.ts";
import IsLoading from "../is-loading-page/IsLoading.tsx";
import ErrorPage from "../error-page/ErrorPage.tsx";
import {
    Box,
    Typography
} from "@mui/material";
import ProfileCard from "../profile-card/ProfileCard.tsx";
import AddProduct from "../profile-add-product/AddProduct.tsx";
import ProfileProductList from "../profile-product-list/ProfileProductList.tsx";
import {withAuth} from "../../hoc/withAuth.tsx";

const Profile = () => {
    const {data, error, isLoading} = useGetCurrentUserQuery();

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

    return (
        <Box sx={{
            pt: 4,
            display: 'flex',
            flexDirection: 'column',
            mx: 4,
            gap: 4,
        }}>
            {data ? (
                <ProfileCard user={data}/>
            ) : (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '80vh',
                    p: 3,
                    textAlign: 'center'
                }}>
                    <Typography color={"secondary"}
                                variant={"h3"}>
                        No Farms Found
                    </Typography>
                </Box>
            )}
            {data && data.farmName && (<AddProduct/>)}
            {data && data.farmName && (<ProfileProductList/>)}
        </Box>
    )
}

export default withAuth(Profile);
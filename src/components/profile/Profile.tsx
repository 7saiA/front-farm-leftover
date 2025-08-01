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

const Profile = () => {
    const {data, error, isLoading} = useGetCurrentUserQuery();

    if (isLoading) {
        return <IsLoading/>
    }

    if (error) {
        const errorMessage = 'status' in error
            ? error.data as string
            : 'An error occurred';
        return <ErrorPage errorMessage={errorMessage}/>
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

export default Profile;
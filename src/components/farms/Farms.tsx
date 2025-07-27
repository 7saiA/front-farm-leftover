import {useGetFarmsQuery} from "../../service/userApi.ts";
import {Box, Fade, Typography} from "@mui/material";
import FarmList from "../farm-list/FarmList.tsx";
import IsLoading from "../is-loading-page/IsLoading.tsx";
import ErrorPage from "../error-page/ErrorPage.tsx";

const Farms = () => {
    const {data, error, isLoading} = useGetFarmsQuery();

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
            <Fade in={true} timeout={1000}>
                <Typography variant="h4"
                            align="center"
                            sx={{mt: 2}}>
                    Farms
                </Typography>
            </Fade>
            {data && data.length > 0 ? (
                <FarmList farms={data}/>
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
        </Box>
    )
}

export default Farms;
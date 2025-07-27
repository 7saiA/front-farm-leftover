import {useGetCurrentUserQuery} from "../../service/userApi.ts";
import IsLoading from "../is-loading-page/IsLoading.tsx";
import ErrorPage from "../error-page/ErrorPage.tsx";
import {Box, Card, CardContent, CardMedia, Fade, Paper, Typography} from "@mui/material";
// import {useAddProductMutation} from "../../service/productsApi.ts";

const Profile = () => {
    const {data, error, isLoading} = useGetCurrentUserQuery();
    // const [addProduct] = useAddProductMutation();
    //
    // const handleSubmit = async () => {
    //     try {
    //         const newProduct = {
    //             productName: 'Яблоки',
    //             pricePerUnit: 100,
    //             unit: 'кг',
    //             availableQuantity: 50
    //         };
    //         const createdProduct = await addProduct(newProduct).unwrap();
    //         console.log('Продукт создан:', createdProduct);
    //     } catch (error) {
    //         console.error('Ошибка создания продукта:', error);
    //     }
    // };

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
                <Fade in={true} timeout={1000} key={data.login}>
                    <Paper elevation={8}
                           sx={{borderRadius: 2}}>
                        <Card variant="elevation"
                              sx={{
                                  height: '100%',
                                  border: 1,
                                  borderColor: "green",
                                  borderRadius: 2
                              }}>
                            <CardMedia
                                sx={{height: 160}}
                                image={"/images/farm.jpg"}
                                title={"farm"}/>
                            <CardContent>
                                <Typography gutterBottom
                                            variant="h5"
                                            component="div">
                                    {data.farmName}
                                </Typography>
                                <Typography variant={"body1"}>
                                    Phone: {data.phone}
                                </Typography>
                                <Typography variant={"body1"}>
                                    Email: {data.email}
                                </Typography>
                                {data.farmName && (
                                    <Typography variant={"caption"}>
                                        Location: {data.city}, {data.street}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Paper>
                </Fade>
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

export default Profile;
import {useGetProductsQuery} from "../../service/productsApi.ts";
import {useState} from "react";
import ProductList from "./ProductList.tsx";
import {
    Box,
    Fade,
    FormControl,
    MenuItem, Paper,
    Select,
    type SelectChangeEvent,
    Typography
} from "@mui/material";
import IsLoading from "../is-loading-page/IsLoading.tsx";
import ErrorPage from "../error-page/ErrorPage.tsx";
import {withRememberMe} from "../../hoc/withRememberMe.tsx";
import {customCompose} from "../../utils/customCompose.ts";
import {withAuth} from "../../hoc/withAuth.tsx";

const Product = () => {
    const [sortBy, setSortBy] = useState("newest");
    const {data, error, isLoading} = useGetProductsQuery({sort: sortBy});

    const handleChange = (event: SelectChangeEvent) => {
        setSortBy(event.target.value);
    };

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
            <Fade in={true} timeout={1000}>
                <Paper elevation={8}
                       sx={{
                           border: 1,
                           borderColor: "purple",
                           borderRadius: 2
                       }}>
                    <FormControl variant="standard"
                                 sx={{
                                     m: 1,
                                     minWidth: 120
                                 }}>
                        <Select
                            labelId="id"
                            id="id"
                            value={sortBy}
                            onChange={handleChange}
                            label="filter"
                        >
                            <MenuItem value="newest">
                                <em>Newest</em>
                            </MenuItem>
                            <MenuItem value={"price-low-high"}>Low to High</MenuItem>
                            <MenuItem value={"price-high-low"}>High to Low</MenuItem>
                            <MenuItem value={"a-z"}>A-Z</MenuItem>
                            <MenuItem value={"z-a"}>Z-A</MenuItem>
                        </Select>
                    </FormControl>
                </Paper>
            </Fade>
            <Fade in={true} timeout={1000}>
                <Typography variant="h4"
                            align="center"
                            sx={{mt: 2}}>
                    Products List
                </Typography>
            </Fade>
            {data && data.length > 0 ? (
                <ProductList products={data} isFarmPage={false}/>
            ) : (
                <Typography color={"secondary"}
                            variant={"h3"}>
                    No Products Found
                </Typography>
            )}
        </Box>
    );
};

export default customCompose(withRememberMe, withAuth)(Product);
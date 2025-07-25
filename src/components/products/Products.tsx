import {useGetProductsQuery} from "../../service/productsApi.ts";
import {useState} from "react";
import ProductList from "../product-list/ProductList.tsx";
import {
    Box,
    CircularProgress, Fade,
    FormControl,
    MenuItem, Paper,
    Select,
    type SelectChangeEvent,
    Typography
} from "@mui/material";

const Product = () => {
    const [sortBy, setSortBy] = useState("newest");
    const {data, error, isLoading} = useGetProductsQuery({sort: sortBy});

    const handleChange = (event: SelectChangeEvent) => {
        setSortBy(event.target.value);
    };

    if (isLoading) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80vh',
                p: 3,
                textAlign: 'center'
            }}>
                <CircularProgress color="secondary"
                                  size={"3rem"}/>
            </Box>
        );
    }

    if (error) {
        const errorMessage = 'status' in error
            ? error.data as string
            : 'An error occurred';
        return (
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
                            variant={"h1"}>
                    Error: {errorMessage}
                </Typography>
            </Box>
        );
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
                            color={"secondary"}
                            sx={{
                                backgroundColor: 'purple.500'
                            }}
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
                <ProductList products={data}/>
            ) : (
                <p>No products found</p>
            )}
        </Box>
    );
};

export default Product;
import {useAddProductMutation} from "../../service/productsApi.ts";
import {useState} from "react";
import {
    Box,
    Button, Fade, FormControl,
    Grid, InputLabel, MenuItem,
    Paper, Select, type SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import {withAuth} from "../../hoc/withAuth.tsx";

const AddProduct = () => {
    const [addProduct] = useAddProductMutation();
    const [formData, setFormData] = useState({
        productName: '',
        pricePerUnit: '0',
        unit: '',
        availableQuantity: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { value } = e.target;
        setFormData(prev => ({ ...prev, unit: value }));
    };

    const handleSubmit = async () => {
        try {
            const newProduct = {
                productName: formData.productName,
                pricePerUnit: formData.pricePerUnit,
                unit: formData.unit,
                availableQuantity: formData.availableQuantity,
            };
            setFormData({
                productName: '',
                pricePerUnit: '',
                unit: '',
                availableQuantity: 0
            })
            const createdProduct = await addProduct(newProduct).unwrap();
            console.log('Product is created:', createdProduct);
        } catch (error) {
            console.error('Error create product:', error);
        }
    };

    return (
        <Fade in={true} timeout={1000} key={"addProduct"}>
            <Paper
                elevation={8}
                sx={{
                    borderRadius: 2
                }}
            >
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <Typography variant={"h4"}
                                sx={{
                                    textAlign: "center",
                                    py: 2
                                }}>
                        Add Product
                    </Typography>

                    <Grid container
                          spacing={2}
                          alignItems="center"
                          sx={{
                              px: {
                                  xs: 1,
                                  sm: 2,
                                  md: 3
                              }
                          }}
                    >
                        <Grid size={{
                            xs: 12,
                            sm: 12,
                            md: 3
                        }}>
                            <TextField
                                required
                                name="productName"
                                label="Product Name"
                                value={formData.productName}
                                variant="filled"
                                onChange={handleChange}
                                sx={{
                                    width: "100%"
                                }}
                            />
                        </Grid>
                        <Grid size={{
                            xs: 12,
                            sm: 12,
                            md: 3
                        }}>
                            <TextField
                                required
                                name="pricePerUnit"
                                label="Price Per Unit"
                                value={formData.pricePerUnit}
                                variant="filled"
                                onChange={handleChange}
                                sx={{
                                    width: "100%"
                                }}
                            />
                        </Grid>
                        <Grid size={{
                            xs: 12,
                            sm: 12,
                            md: 3
                        }}>
                            <FormControl fullWidth>
                                <InputLabel>Unit</InputLabel>
                                <Select
                                    value={formData.unit}
                                    label="Unit"
                                    onChange={handleSelectChange}
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderTopLeftRadius: '5px',
                                            borderTopRightRadius: '5px',
                                            borderBottomLeftRadius: '0',
                                            borderBottomRightRadius: '0'
                                        }
                                    }}

                                >
                                    <MenuItem value="kg">kg</MenuItem>
                                    <MenuItem value="piece">piece</MenuItem>
                                    <MenuItem value="box">box</MenuItem>
                                    <MenuItem value="liter">liter</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{
                            xs: 12,
                            sm: 12,
                            md: 3
                        }}>
                            <TextField
                                required
                                name="availableQuantity"
                                label="Available Quantity"
                                value={formData.availableQuantity}
                                variant="filled"
                                onChange={handleChange}
                                sx={{
                                    width: "100%"
                                }}
                            />
                        </Grid>
                        <Grid size={{xs: 12}}
                              sx={{
                                  display: 'flex',
                                  justifyContent: 'center',
                              }}>
                            <Button
                                size={"large"}
                                onClick={handleSubmit}
                                variant="contained"
                                color={"success"}
                                sx={{
                                    my: 2
                                }}
                            >
                                Add Product
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Fade>
    )
}

export default withAuth(AddProduct);
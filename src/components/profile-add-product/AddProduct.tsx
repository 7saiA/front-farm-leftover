import {useAddProductMutation} from "../../service/productsApi.ts";
import {useState} from "react";
import {
    Box,
    Button,
    Fade,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {withRememberMe} from "../../hoc/withRememberMe.tsx";
import {customCompose} from "../../utils/customCompose.ts";
import {withAuth} from "../../hoc/withAuth.tsx";

const AddProduct = () => {
    const [addProduct] = useAddProductMutation();
    const [selectedFile, setSelectedFile] = useState<File | undefined>();
    const [preview, setPreview] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        productName: '',
        pricePerUnit: '',
        unit: '',
        availableQuantity: 0
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                alert("File is too large. Maximum size is 5MB.");
                return;
            }

            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSelectChange = (e: any) => {
        const {value} = e.target;
        setFormData(prev => ({...prev, unit: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.unit) {
            alert('Please select a unit');
            return;
        }
        if (!formData.availableQuantity) {
            alert('Please select an available quantity');
            return;
        }
        try {
            const createdProduct = await addProduct({
                newProduct: formData,
                file: selectedFile
            }).unwrap();

            console.log('Product is created:', createdProduct);

            setFormData({
                productName: '',
                pricePerUnit: '',
                unit: '',
                availableQuantity: 0
            });
            setSelectedFile(undefined);
            setPreview(null);
        } catch (error) {
            console.error('Error create product:', error);
        }
    };

    return (
        <Fade in={true} timeout={1000} key={"addProduct"}>
            <Paper elevation={8} sx={{borderRadius: 2}}>
                <Box component="form" onSubmit={handleSubmit} autoComplete="off">
                    <Typography variant="h4" sx={{textAlign: "center", py: 2}}>
                        Add Product
                    </Typography>

                    <Grid container spacing={1} direction="column">
                        <Grid size={{xs: 12}}>
                            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", py: 1}}>
                                {preview && (
                                    <Box
                                        component="img"
                                        src={preview}
                                        alt="Product preview"
                                        sx={{
                                            width: 150,
                                            height: 150,
                                            objectFit: "cover",
                                            borderRadius: 2,
                                            mb: 2,
                                            boxShadow: 3
                                        }}
                                    />
                                )}
                                <Button
                                    component="label"
                                    variant="contained"
                                    startIcon={<CloudUploadIcon/>}
                                >
                                    Add product image
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={handleFileChange}
                                    />
                                </Button>
                            </Box>
                        </Grid>

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
                        </Grid>

                        <Grid sx={{display: 'flex', justifyContent: 'center', xs: 12}}>
                            <Button
                                size="large"
                                type="submit"
                                variant="contained"
                                color="success"
                                sx={{my: 2}}
                            >
                                Add Product
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Fade>
    );
};

export default customCompose(withRememberMe, withAuth)(AddProduct);
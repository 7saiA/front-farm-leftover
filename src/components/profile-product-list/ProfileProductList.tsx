import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    Fade, FormControl, InputLabel, MenuItem,
    Paper, Select, type SelectChangeEvent, TextField,
    Typography
} from "@mui/material";
import {
    type FarmProductDto,
    useDeleteProductMutation,
    useGetProductsForCurrentFarmQuery,
    useUpdateProductMutation
} from "../../service/productsApi.ts";
import IsLoading from "../is-loading-page/IsLoading.tsx";
import ErrorPage from "../error-page/ErrorPage.tsx";
import {useState} from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {withRememberMe} from "../../hoc/withRememberMe.tsx";
import {customCompose} from "../../utils/customCompose.ts";
import {withAuth} from "../../hoc/withAuth.tsx";

const ProfileProductList = () => {
    const [deleteProduct] = useDeleteProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const {data, error, isLoading} = useGetProductsForCurrentFarmQuery();

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [productToEdit, setProductToEdit] = useState<FarmProductDto | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const [selectedFile, setSelectedFile] = useState<File | undefined>();
    const [preview, setPreview] = useState<string | null>(null);

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

    const handleEditClick = (product: FarmProductDto) => {
        setProductToEdit(product);
        setOpenEditDialog(true);
    }

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setProductToEdit(prev => prev ? {...prev, [name]: value} : null);
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        const {value} = e.target;
        setProductToEdit(prev => prev ? {...prev, unit: value} : null);
    };

    const handleSaveEdit = async () => {
        if (!productToEdit) return;

        if (
            !productToEdit.productName.trim() ||
            !productToEdit.pricePerUnit ||
            !productToEdit.unit ||
            productToEdit.availableQuantity === null || productToEdit.availableQuantity === undefined
        ) {
            alert("Please fill in all fields before saving.");
            return;
        }
        setIsEditing(true);
        try {
            await updateProduct({
                productId: productToEdit.productId,
                product: {
                    productName: productToEdit.productName,
                    pricePerUnit: productToEdit.pricePerUnit,
                    unit: productToEdit.unit,
                    availableQuantity: productToEdit.availableQuantity
                },
                file: selectedFile,
            }).unwrap();
            setOpenEditDialog(false);
            setSelectedFile(undefined);
            setPreview(null);
        } catch (error) {
            console.error('Failed to update product:', error);
        } finally {
            setIsEditing(false);
        }
    };

    const handleCancelEdit = () => {
        setSelectedFile(undefined);
        setPreview(null);
        setOpenEditDialog(false);
        setProductToEdit(null);
    };

    const handleDeleteClick = (productId: string) => {
        setProductToDelete(productId);
        setOpenDeleteDialog(true);
    }

    const handleConfirmDelete = async () => {
        if (!productToDelete) { return; }
        try {
            await deleteProduct(productToDelete).unwrap();
            console.log('Product deleted successfully');
        } catch (error) {
            console.error('Failed to delete product:', error);
        } finally {
            setIsDeleting(false);
            setOpenDeleteDialog(false);
            setProductToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setOpenDeleteDialog(false)
        setProductToDelete(null);
    }

    const productName = productToDelete ?
        data?.find(p => p.productId === productToDelete)?.productName : '';

    return (
        <Box sx={{
            pt: 4,
            display: 'grid',
            gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
                xl: 'repeat(5, 1fr)'
            },
            mx: 4,
            gap: 4,
        }}>
            {data && data.length > 0 ? (
                data.map((product) => (
                    <Fade in={true} timeout={1000}>
                        <Paper elevation={8}
                               sx={{borderRadius: 2}}>
                            <Card variant="elevation"
                                  sx={{
                                      height: '100%',
                                      border: 1,
                                      borderColor: "purple",
                                      borderRadius: 2
                                  }}>
                                <CardMedia
                                    sx={{height: 160}}
                                    image={product.imgUrl ? product.imgUrl : "/images/pic.jpg"}
                                    title={"product"}/>
                                <CardContent>
                                    <Typography gutterBottom
                                                variant="h5"
                                                component="div">
                                        {product.productName}
                                    </Typography>
                                    <Typography variant={"body1"}>
                                        Price: {product.pricePerUnit}/{product.unit}
                                    </Typography>
                                    <Typography variant={"body1"}>
                                        Available: {product.availableQuantity}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{justifyContent: "center"}}>
                                    <Box>
                                        <Button size={"small"}
                                                variant={"contained"}
                                                onClick={() => handleEditClick(product)}
                                                color={"info"}
                                                sx={{mx: 1, my: 1}}
                                        >
                                            Edit
                                        </Button>
                                        <Button size={"small"}
                                                variant={"contained"}
                                                onClick={() => handleDeleteClick(product.productId)}
                                                color={"error"}
                                                sx={{mx: 1, my: 1}}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </CardActions>
                            </Card>
                        </Paper>
                    </Fade>
                ))) : (
                <Typography color={"secondary"}
                            variant={"h3"}>
                    No Products Found
                </Typography>
            )}

            <Dialog open={openEditDialog} onClose={handleCancelEdit} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    {productToEdit && (
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, pt: 2}}>
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
                            <TextField
                                label="Product Name"
                                name="productName"
                                value={productToEdit.productName}
                                onChange={handleEditChange}
                                fullWidth
                            />
                            <TextField
                                label="Price Per Unit"
                                name="pricePerUnit"
                                type="number"
                                value={productToEdit.pricePerUnit}
                                onChange={handleEditChange}
                                fullWidth
                            />
                            <FormControl fullWidth>
                                <InputLabel>Unit</InputLabel>
                                <Select
                                    value={productToEdit.unit}
                                    label="Unit"
                                    onChange={handleSelectChange}
                                >
                                    <MenuItem value="kg">kg</MenuItem>
                                    <MenuItem value="piece">piece</MenuItem>
                                    <MenuItem value="box">box</MenuItem>
                                    <MenuItem value="liter">liter</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Available Quantity"
                                name="availableQuantity"
                                type="number"
                                value={productToEdit.availableQuantity}
                                onChange={handleEditChange}
                                fullWidth
                            />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCancelEdit}
                        disabled={isEditing}
                        color={"error"}
                        variant={"contained"}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSaveEdit}
                        color={"success"}
                        disabled={isEditing}
                        variant={"contained"}
                    >
                        {isEditing ? 'Saving...' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openDeleteDialog}
                onClose={handleCancelDelete}
            >
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete product "{productName}"?
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCancelDelete}
                        disabled={isDeleting}
                        color={"info"}
                        variant={"contained"}
                    >
                        Cansel
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        disabled={isDeleting}
                        color={"error"}
                        variant={"contained"}
                        autoFocus
                    >
                        {isDeleting ? 'Deleting...' : 'Accept'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default customCompose(withRememberMe, withAuth)(ProfileProductList);

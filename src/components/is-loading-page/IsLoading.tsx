import {Box, CircularProgress} from "@mui/material";

const IsLoading = () => {
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
            <CircularProgress size={"3rem"}/>
        </Box>
    );
}

export default IsLoading;
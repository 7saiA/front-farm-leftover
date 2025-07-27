import {Box, Typography} from "@mui/material";

interface Props {
    errorMessage: string;
}

const ErrorPage = ({errorMessage}: Props) => {
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
                        variant={"h3"}>
                Error...
            </Typography>
        </Box>
    );
}

export default ErrorPage;
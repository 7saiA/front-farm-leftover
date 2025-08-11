import { Box, Typography } from "@mui/material";

const HomeFarmBody = () => {
    return (
        <Box
            sx={{
                mt: 8,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    textAlign: "center",
                    fontWeight: 700,
                    mb: 4,
                    fontSize: { xs: "1.8rem", md: "2.2rem" }
                }}
            >
                Welcome to Your Dashboard
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
                    gap: 4,
                    maxWidth: "lg"
                }}
            >
                <Box
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        backgroundColor: "rgba(255,255,255,0.7)",
                        boxShadow: 2
                    }}
                >
                    <Typography variant="h5" sx={{ mb: 1 }}>📦 Manage Your Products</Typography>
                    <Typography variant="body1" color="success">
                        Add new products, update availability, and keep your inventory up-to-date.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        backgroundColor: "rgba(255,255,255,0.7)",
                        boxShadow: 2
                    }}
                >
                    <Typography variant="h5" sx={{ mb: 1 }}>📊 Track Your Sales</Typography>
                    <Typography variant="body1" color="success">
                        See your recent orders, track revenue, and analyze performance.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        backgroundColor: "rgba(255,255,255,0.7)",
                        boxShadow: 2
                    }}
                >
                    <Typography variant="h5" sx={{ mb: 1 }}>🤝 Connect with Customers</Typography>
                    <Typography variant="body1" color="success">
                        Communicate directly with buyers and build long-term relationships.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default HomeFarmBody;
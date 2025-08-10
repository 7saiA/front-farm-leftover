import { Box, Typography } from "@mui/material";

const HomeUserBody = () => {
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
                Here's What's New for You
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
                    <Typography variant="h5" sx={{ mb: 1 }}>🛒 Easy Shopping</Typography>
                    <Typography variant="body1" color="success">
                        Browse fresh products, add them to your cart, and place orders in just a few clicks.
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
                    <Typography variant="h5" sx={{ mb: 1 }}>📦 Track Your Orders</Typography>
                    <Typography variant="body1" color="success">
                        Stay updated on your purchases from checkout to delivery.
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
                    <Typography variant="h5" sx={{ mb: 1 }}>🎁 Personalized Offers</Typography>
                    <Typography variant="body1" color="success">
                        Enjoy special discounts and recommendations tailored just for you.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default HomeUserBody;
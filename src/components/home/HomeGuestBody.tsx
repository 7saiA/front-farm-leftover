import {Box, Container, Typography} from "@mui/material";

const HomeGuestBody = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 8, flex: "1 0 auto" }}>
            <Typography
                variant="h4"
                sx={{
                    textAlign: "center",
                    fontWeight: 700,
                    mb: 6,
                    fontSize: { xs: "1.8rem", md: "2.2rem" }
                }}
            >
                Why Choose LeftOver?
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
                    gap: 4,
                    textAlign: "center"
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
                    <Typography variant="h5" sx={{ mb: 1 }}>🛒 Direct Purchase</Typography>
                    <Typography variant="body1" color="primary">
                        Buy directly from local farmers, cutting out the middlemen.
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
                    <Typography variant="h5" sx={{ mb: 1 }}>🌱 Fresh & Sustainable</Typography>
                    <Typography variant="body1" color="primary">
                        Enjoy fresh, eco-friendly products grown with care for the planet.
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
                    <Typography variant="h5" sx={{ mb: 1 }}>💰 Save More</Typography>
                    <Typography variant="body1" color="primary">
                        Get the best quality at a better price without extra fees.
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}

export default HomeGuestBody;
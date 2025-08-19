import {useSelector} from "react-redux";
import type {RootState} from "../../app/store.ts";
import {Box, Button, Typography, Container, Fade} from "@mui/material";
import {useNavigate} from "react-router-dom";
import HomeGuestBody from "./HomeGuestBody.tsx";
import HomeUserBody from "./HomeUserBody.tsx";
import HomeFarmBody from "./HomeFarmBody.tsx";
import {withRememberMe} from "../../hoc/withRememberMe.tsx";

const Home = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const role = useSelector((state: RootState) => state.auth.role);
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "50vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 6
            }}
        >
            <Container maxWidth="md">
                <Fade in timeout={1000}>
                    <Box
                        sx={{
                            textAlign: "center",
                            p: { xs: 3, sm: 5 },
                            borderRadius: 4,
                            boxShadow: 4
                        }}
                    >
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }
                            }}
                        >
                            {isAuthenticated ? "Welcome Back" : "LeftOver"}
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                mb: 4,
                                color: "text.secondary",
                                fontSize: { xs: "1rem", sm: "1.2rem" }
                            }}
                        >
                            {isAuthenticated
                                ? "Access your profile and manage your account."
                                : "Join now and discover something amazing."}
                        </Typography>

                        {isAuthenticated ? (
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                sx={{ px: 4, py: 1.2, fontWeight: 600 }}
                                onClick={() => navigate("/profile")}
                            >
                                Go to Profile
                            </Button>
                        ) : (
                            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{ px: 4, py: 1.2, fontWeight: 600 }}
                                    onClick={() => navigate("/register")}
                                >
                                    Get Started
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="success"
                                    size="large"
                                    sx={{ px: 4, py: 1.2, fontWeight: 600 }}
                                    onClick={() => navigate("/sign-in")}
                                >
                                    Sign In
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Fade>
            </Container>
            {!isAuthenticated ? <HomeGuestBody /> : role === "USER" ?
            <HomeUserBody/> : <HomeFarmBody/>}
        </Box>
    );
};

export default withRememberMe(Home);
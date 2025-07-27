import {useSelector} from "react-redux";
import type {RootState} from "../app/store.ts";
import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate("/profile")
    }

    return (
        <Box sx={{
            pt: 4,
            display: 'flex',
            flexDirection: 'column',
            mx: 4,
            gap: 4,
        }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}>
                <Box sx={{}}>
                    {user ? (
                        <Box>
                            <Typography variant={"h4"}>
                                Hello {user.login}
                            </Typography>
                            <Button variant={"contained"}
                                    color={"secondary"}
                                    onClick={() => handleProfileClick()}>
                                Profile
                            </Button>
                        </Box>
                    ) : (
                        <Typography variant={"h4"}>
                            LeftOver
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
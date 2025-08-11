import {useState} from 'react';
import {useSignInMutation} from '../../service/authApi';
import {useLocation, useNavigate} from 'react-router-dom';
import IsLoading from "../is-loading-page/IsLoading.tsx";
import ErrorPage from "../error-page/ErrorPage.tsx";
import {
    Box,
    Button,
    Checkbox, CircularProgress,
    Divider,
    Fade,
    FormControlLabel,
    Paper,
    TextField,
    Typography
} from "@mui/material";

const SignIn = () => {
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    });

    const [loginUser, {isLoading, error}] = useSignInMutation();
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await loginUser({
                login: formData.login,
                password: formData.password
            }).unwrap();

            navigate(location.state?.from || '/');
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    if (isLoading) {
        return <IsLoading/>
    }

    if (error) {
        const errorMessage = 'status' in error
            ? error.data as string
            : 'An error occurred';
        return <ErrorPage errorMessage={errorMessage}/>
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
            }}
        >
            <Fade in timeout={1000}>
                <Paper
                    elevation={6}
                    sx={{
                        width: '100%',
                        maxWidth: { xs: 450, md: 600, lg: 800 },
                        p: { xs: 3, md: 4, lg: 5 },
                        borderRadius: 3,
                        '& .MuiTypography-h4': {
                            fontSize: { xs: '1.8rem', md: '2.2rem', lg: '2.5rem' }
                        },
                        '& .MuiTypography-body1': {
                            fontSize: { xs: '1rem', md: '1.1rem', lg: '1.2rem' }
                        },
                        '& .MuiTextField-root': {
                            '& .MuiInputBase-root': {
                                fontSize: { xs: '0.9rem', md: '1rem', lg: '1.1rem' }
                            }
                        },
                        '& .MuiButton-contained': {
                            fontSize: { xs: '1rem', md: '1.1rem', lg: '1.2rem' },
                            py: { xs: 1, md: 1.5, lg: 2 }
                        }
                    }}
                >
                    <Box sx={{textAlign: 'center', mb: 4}}>
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                fontWeight: 700,
                                letterSpacing: 1
                            }}
                        >
                            Welcome Back
                        </Typography>
                        <Typography variant="body1">
                            Sign in to continue
                        </Typography>
                    </Box>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2
                        }}
                    >
                        <TextField
                            name="login"
                            label="Login"
                            variant="outlined"
                            fullWidth
                            required
                            autoComplete="off"
                            sx={{
                                borderRadius: 2,
                                form: { autocomplete: "off" }
                            }}
                            value={formData.login}
                            onChange={handleChange}
                        />

                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            required
                            autoComplete="off"
                            sx={{
                                borderRadius: 2,
                                form: { autocomplete: "off" }
                            }}
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            my: 1
                        }}>
                            <FormControlLabel
                                control={<Checkbox color="info"/>}
                                label="Remember me"
                            />
                            <Button
                                sx={{fontSize: 12}}
                                color={"error"}
                            >
                                Forgot password?
                            </Button>
                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={isLoading}
                            color="success"
                            sx={{
                                mt: 2,
                                py: 1.5,
                                borderRadius: 2,
                                fontSize: 16,
                                fontWeight: 800,
                            }}
                        >
                            {isLoading ? <CircularProgress size={24} color="primary"/> : 'Sign In'}
                        </Button>

                        <Divider sx={{my: 3}}>
                            <Typography variant="body2">
                                OR
                            </Typography>
                        </Divider>

                        <Typography
                            variant="body2"
                            align="center"
                            sx={{mt: 2}}
                        >
                            Don't have an account?{' '}
                            <Button
                                color={"success"}
                                sx={{fontWeight: 600}}
                                onClick={() => navigate("/register")}
                            >
                                Register
                            </Button>
                        </Typography>
                    </Box>
                </Paper>
            </Fade>
        </Box>
    );
};

export default SignIn;
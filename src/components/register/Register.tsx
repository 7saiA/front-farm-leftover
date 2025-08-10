import { useState } from 'react';
import { useRegisterMutation } from '../../service/authApi.ts';
import { useNavigate } from 'react-router-dom';
import {Box, Button, CircularProgress, Divider, Fade, Paper, TextField, Typography} from "@mui/material";
import IsLoading from "../is-loading-page/IsLoading.tsx";
import ErrorPage from "../error-page/ErrorPage.tsx";

const Register = () => {
    const [isFarmForm, setIsFarmForm] = useState(false);
    const [formData, setFormData] = useState({
        login: '',
        userName: '',
        password: '',
        email: '',
        phone: '',
        farmName: '',
        city: '',
        street: ''
    });

    const [registerUser, { isLoading, error }] = useRegisterMutation();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData = isFarmForm ? {
            login: formData.login,
            password: formData.password,
            email: formData.email,
            phone: formData.phone,
            farmName: formData.farmName,
            city: formData.city,
            street: formData.street
        } : {
            login: formData.login,
            userName: formData.userName,
            password: formData.password,
            email: formData.email,
            phone: formData.phone,
        };

        try {
            await registerUser(userData).unwrap();
            navigate('/');
        } catch (err) {
            console.error('Registration failed:', err);
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
                        maxWidth: 800,
                        p: 4,
                        borderRadius: 3,
                    }}
                >
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                fontWeight: 700,
                                letterSpacing: 1
                            }}
                        >
                            {isFarmForm ? 'Farm Registration' : 'User Registration'}
                        </Typography>
                        <Typography variant="body1">
                            Create your account to continue
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
                        <Button
                            variant={!isFarmForm ? 'contained' : 'outlined'}
                            onClick={() => setIsFarmForm(false)}
                            sx={{ px: 4, py: 1.5 }}
                            color="primary"
                        >
                            User
                        </Button>
                        <Button
                            variant={isFarmForm ? 'contained' : 'outlined'}
                            onClick={() => setIsFarmForm(true)}
                            sx={{ px: 4, py: 1.5 }}
                            color="success"
                        >
                            Farm
                        </Button>
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
                            sx={{ borderRadius: 2 }}
                            value={formData.login}
                            onChange={handleChange}
                        />

                        {!isFarmForm && (
                            <TextField
                                name="userName"
                                label="Nickname"
                                variant="outlined"
                                fullWidth
                                required
                                sx={{ borderRadius: 2 }}
                                value={formData.userName}
                                onChange={handleChange}
                            />
                        )}

                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            required
                            sx={{ borderRadius: 2 }}
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <TextField
                            name="email"
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            required
                            sx={{ borderRadius: 2 }}
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <TextField
                            name="phone"
                            label="Phone"
                            variant="outlined"
                            fullWidth
                            required
                            sx={{ borderRadius: 2 }}
                            value={formData.phone}
                            onChange={handleChange}
                        />

                        {isFarmForm && (
                            <>
                                <TextField
                                    name="farmName"
                                    label="Farm Name"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    sx={{ borderRadius: 2 }}
                                    value={formData.farmName}
                                    onChange={handleChange}
                                />

                                <TextField
                                    name="city"
                                    label="City"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    sx={{ borderRadius: 2 }}
                                    value={formData.city}
                                    onChange={handleChange}
                                />

                                <TextField
                                    name="street"
                                    label="Street"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    sx={{ borderRadius: 2 }}
                                    value={formData.street}
                                    onChange={handleChange}
                                />
                            </>
                        )}

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
                            {isLoading ? <CircularProgress size={24} color="primary" /> : 'Register'}
                        </Button>

                        <Divider sx={{ my: 3 }}>
                            <Typography variant="body2">
                                OR
                            </Typography>
                        </Divider>

                        <Typography
                            variant="body2"
                            align="center"
                            sx={{ mt: 2 }}
                        >
                            Already have an account?{' '}
                            <Button
                                color="success"
                                sx={{ fontWeight: 600 }}
                                onClick={() => navigate("/sign-in")}
                            >
                                Sign In
                            </Button>
                        </Typography>
                    </Box>
                </Paper>
            </Fade>
        </Box>
    );
};

export default Register;
import React, { useState } from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {
    AppBar,
    Box,
    Badge,
    IconButton,
    TextField,
    Typography,
    Menu,
    MenuItem,
    Drawer,
    useMediaQuery,
    useTheme,
    InputAdornment,
} from "@mui/material";

import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MenuIcon from "@mui/icons-material/Menu";
import AgricultureIcon from '@mui/icons-material/Agriculture';
import StoreIcon from '@mui/icons-material/Store';
import ClearIcon from '@mui/icons-material/Clear';

import { useSelector } from "react-redux";
import type { RootState } from "../../app/store.ts";
import { useLogoutMutation } from "../../service/authApi.ts";

const Header = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [logout] = useLogoutMutation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const toggleMobileDrawer = () => setMobileDrawerOpen((open) => !open);

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            handleMenuClose();
            setMobileDrawerOpen(false);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchQuery.trim()) {
            e.preventDefault();
            setMobileDrawerOpen(false);
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
        }
    };

    const drawerContent = (
        <Box sx={{ width: 280, p: 2 }}>
            <TextField
                placeholder="Search..."
                variant="outlined"
                size="small"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchSubmit}
                sx={{ mb: 3 }}
                slotProps={{
                    input: {
                        endAdornment: searchQuery && (
                            <InputAdornment position="end">
                                <IconButton
                                    size="small"
                                    onClick={() => setSearchQuery('')}
                                    edge="end"
                                >
                                    <ClearIcon fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
            />

            <Typography
                component={RouterLink}
                to="/products"
                sx={{ display: "block", mb: 2, textDecoration: "none", color: "black", fontWeight: "bold", borderBottom: "1px solid black", pb: 0.5  }}
                onClick={toggleMobileDrawer}
            >
                <StoreIcon sx={{ mr: 1 }} />
                Products
            </Typography>

            <Typography
                component={RouterLink}
                to="/farms"
                sx={{ display: "block", mb: 2, textDecoration: "none", color: "black", fontWeight: "bold", borderBottom: "1px solid black", pb: 0.5  }}
                onClick={toggleMobileDrawer}
            >
                <AgricultureIcon sx={{ mr: 1 }} />
                Farms
            </Typography>

            {isAuthenticated ? (
                <>
                    <Typography
                        component={RouterLink}
                        to="/profile"
                        sx={{ display: "block", mb: 2, color: "black", fontWeight: "bold", borderBottom: "1px solid black", pb: 0.5  }}
                        onClick={toggleMobileDrawer}
                    >
                        <PersonOutlineIcon sx={{ mr: 1 }} />
                        Profile
                    </Typography>
                    <Typography
                        component={RouterLink}
                        to="/orders"
                        sx={{ display: "block", mb: 2, color: "black", fontWeight: "bold", borderBottom: "1px solid black", pb: 0.5  }}
                        onClick={toggleMobileDrawer}
                    >
                        <InventoryIcon sx={{ mr: 1 }} />
                        My Orders
                    </Typography>
                    <Typography
                        sx={{ display: "block", mb: 2, color: "red", cursor: "pointer", fontWeight: "bold", borderBottom: "1px solid black", pb: 0.5  }}
                        onClick={handleLogout}
                    >
                        <LogoutIcon sx={{ mr: 1 }} />
                        Logout
                    </Typography>
                </>
            ) : (
                <>
                    <Typography
                        component={RouterLink}
                        to="/sign-in"
                        sx={{ display: "block", mb: 2, color: "green", fontWeight: "bold", borderBottom: "1px solid black", pb: 0.5  }}
                        onClick={toggleMobileDrawer}
                    >
                        <LoginIcon sx={{ mr: 1 }} />
                        Login
                    </Typography>
                    <Typography
                        component={RouterLink}
                        to="/register"
                        sx={{ display: "block", mb: 2, color: "green", fontWeight: "bold", borderBottom: "1px solid purple", pb: 0.5  }}
                        onClick={toggleMobileDrawer}
                    >
                        <PersonAddIcon sx={{ mr: 1 }} />
                        Register
                    </Typography>
                </>
            )}
        </Box>
    );

    const menuItems = isAuthenticated
        ? [
            <MenuItem
                component={RouterLink}
                to="/profile"
                key="profile"
                sx={{ color: "black", "&:hover": { color: "rebeccapurple" } }}
                onClick={handleMenuClose}
            >
                <PersonOutlineIcon sx={{ mr: 1 }} />
                Profile
            </MenuItem>,
            <MenuItem
                component={RouterLink}
                to="/orders"
                key="orders"
                sx={{ color: "black", "&:hover": { color: "rebeccapurple" } }}
                onClick={handleMenuClose}
            >
                <InventoryIcon sx={{ mr: 1 }} />
                My Orders
            </MenuItem>,
            <MenuItem
                key="logout"
                sx={{ color: "red", "&:hover": { color: "darkred" } }}
                onClick={handleLogout}
            >
                <LogoutIcon sx={{ mr: 1 }} />
                Logout
            </MenuItem>,
        ]
        : [
            <MenuItem
                key="login"
                component={RouterLink}
                to="/sign-in"
                sx={{ color: "black", "&:hover": { color: "rebeccapurple" } }}
                onClick={handleMenuClose}
            >
                <LoginIcon sx={{ mr: 1 }} />
                Login
            </MenuItem>,
            <MenuItem
                key="register"
                component={RouterLink}
                to="/register"
                sx={{ color: "black", "&:hover": { color: "rebeccapurple" } }}
                onClick={handleMenuClose}
            >
                <PersonAddIcon sx={{ mr: 1 }} />
                Register
            </MenuItem>,
        ];

    return (
        <>
            <AppBar
                position="static"
                sx={{
                    height: {
                        xs: "12vh",
                        sm: "12vh",
                        md: "12vh",
                        lg: "12vh",
                        xl: "12vh",
                    },
                    backgroundColor: "whitesmoke",
                    display: "flex",
                    justifyContent: "center",
                    px: 4,
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                        {isMobile && (
                            <IconButton onClick={toggleMobileDrawer} aria-label="Open menu">
                                <MenuIcon sx={{ fontSize: "2rem", color: "black" }} />
                            </IconButton>
                        )}

                        <Typography
                            variant="h4"
                            component={RouterLink}
                            to="/"
                            sx={{
                                textDecoration: "none",
                                color: "black",
                                fontWeight: "bold",
                                "&:hover": { color: "rebeccapurple" },
                                fontSize: "2rem",
                            }}
                        >
                            LeftOver
                        </Typography>

                        {!isMobile && (
                            <>
                                <Typography
                                    variant="h6"
                                    component={RouterLink}
                                    to="/products"
                                    sx={{
                                        textDecoration: "none",
                                        color: "black",
                                        fontWeight: "bold",
                                        "&:hover": { color: "rebeccapurple" },
                                        fontSize: "1.25rem",
                                    }}
                                >
                                    Products
                                </Typography>
                                <Typography
                                    variant="h6"
                                    component={RouterLink}
                                    to="/farms"
                                    sx={{
                                        textDecoration: "none",
                                        color: "black",
                                        fontWeight: "bold",
                                        "&:hover": { color: "rebeccapurple" },
                                        fontSize: "1.25rem",
                                    }}
                                >
                                    Farms
                                </Typography>
                            </>
                        )}
                    </Box>

                    {!isMobile && (
                        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                            <TextField
                                placeholder="Search..."
                                size="small"
                                sx={{
                                    width: "30%",
                                    backgroundColor: "white",
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    "& .MuiOutlinedInput-root": {
                                        fontSize: "1.2rem",
                                        "& fieldset": { borderColor: "black" },
                                        "&:hover fieldset": { borderColor: "purple" },
                                        "&.Mui-focused fieldset": { borderColor: "purple" },
                                    },
                                }}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearchSubmit}
                                slotProps={{
                                    input: {
                                        endAdornment: searchQuery && (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => setSearchQuery('')}
                                                    edge="end"
                                                >
                                                    <ClearIcon fontSize="small" />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        </Box>
                    )}

                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <IconButton component={RouterLink} to="/cart" aria-label="Go to cart">
                            <Badge badgeContent={0} color="primary">
                                <ShoppingCartSharpIcon
                                    sx={{
                                        color: "black",
                                        "&:hover": { color: "rebeccapurple" },
                                        fontSize: "2.5rem",
                                    }}
                                />
                            </Badge>
                        </IconButton>

                        {!isMobile && (
                            <>
                                <IconButton onClick={handleMenuOpen}>
                                    <AccountCircleSharpIcon
                                        sx={{
                                            color: "black",
                                            fontSize: "2.5rem",
                                            "&:hover": { color: "rebeccapurple" },
                                        }}
                                    />
                                </IconButton>
                                <Menu
                                    id="account-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    {menuItems}
                                </Menu>
                            </>
                        )}
                    </Box>
                </Box>
            </AppBar>

            <Drawer anchor="left" open={mobileDrawerOpen} onClose={toggleMobileDrawer}>
                {drawerContent}
            </Drawer>
        </>
    );
};

export default Header;

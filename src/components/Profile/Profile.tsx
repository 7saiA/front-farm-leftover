import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect, useState} from "react";
import {base_url} from "../../utils/constants.ts";
import type {UserForProductDto} from "../../types/Product.ts";
import "./Profile.css";
import {fetchWithAuth} from "../../utils/fetchWithAuth.ts";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {login, token} = useAppSelector(state => state.auth);
    const [userData, setUserData] = useState<UserForProductDto | null>(null);
    useEffect(() => {
        const loadProfile = async () => {
            if (!token || !login) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetchWithAuth(`${base_url}/users/profile`, {
                    credentials: "include",
                },dispatch);

                if (!response.ok) {
                    throw new Error(`Error getting user profile: ${response.status}`);
                }

                const data = await response.json();
                setUserData(data);
            } catch (err) {
                console.error("Ошибка загрузки профиля:", err);
            }
        };

        loadProfile();
    }, [login, token, dispatch]);

    console.log("User data:", userData);
    if (!userData) return <p>Loading...</p>;

    return (
        <div className="profile-container">
            <h2>My Profile</h2>
            <p><strong>Username:</strong> {userData.login}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>

            {userData.farmName && (
                <>
                    <p><strong>Farm Name:</strong> {userData.farmName}</p>
                    <p><strong>City:</strong> {userData.city}</p>
                    <p><strong>Street:</strong> {userData.street}</p>
                </>
            )}
        </div>
    )
}

export default Profile;
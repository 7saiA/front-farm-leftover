import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect, useState} from "react";
import {changePage} from "../../features/pageSlice.ts";
import {base_url, navItems} from "../../utils/constants.ts";
import type {UserForProductDto} from "../../types/Product.ts";

const Profile = () => {
    const dispatch = useAppDispatch();
    const {login, token} = useAppSelector(state => state.auth);
    const [userData, setUserData] = useState<UserForProductDto | null>(null);

    useEffect(() => {
        const loadProfile = async () => {
            if (!token || !login) {
                dispatch(changePage(navItems[4]));
                return;
            }

            try {
                const response = await fetch(`${base_url}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

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
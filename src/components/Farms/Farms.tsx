import {useEffect, useState} from "react";
import {base_url} from "../../utils/constants.ts";
import type {FarmDto} from "../../types/Farm.ts";
import "./Farms.css"
import {useNavigate} from "react-router-dom";

const Farms = () => {
    const navigate = useNavigate();
    const [farms, setFarms] = useState<FarmDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${base_url}/users/farms`);
                if (!response.ok) throw new Error("Failed to fetch farms");
                const data = await response.json();
                setFarms(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div style={{padding: "2rem"}}>
            <h2 className="custom-heading">All Farms</h2>
            {loading ? (
                <p>Loading farms...</p>
            ) : farms.length === 0 ? (
                <p style={{textAlign: "center"}}>No farms found.</p>
            ) : (
                <ul style={{listStyle: "none", padding: 0}}>
                    {farms.map(farm => (
                        <li
                            key={farm.login}
                            style={{
                                border: "1px solid #ccc",
                                padding: "1rem",
                                margin: "1rem 0",
                                borderRadius: "10px",
                                background: "#f9f9f9"
                            }}
                        >
                            <button
                                className="greenButton"
                                onClick={() => {navigate(`/farms/${farm.login}`);}}
                            >
                                {farm.farmName}
                            </button>
                            <p><strong>City:</strong> {farm.city ?? "N/A"}</p>
                            <p><strong>Street:</strong> {farm.street ?? "N/A"}</p>
                            <p><strong>Email:</strong> {farm.email}</p>
                            <p><strong>Phone:</strong> {farm.phone}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Farms;
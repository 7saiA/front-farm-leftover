import FarmDetailsProducts from "./FarmDetailsProducts.tsx";
import "./Farms.css"
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {FarmDto} from "../../types/Farm.ts";
import {base_url} from "../../utils/constants.ts";

const FarmDetails = () => {
    const {login} = useParams();
    const navigate = useNavigate();
    const [farm, setFarm] = useState<FarmDto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!login) return;

        (async () => {
            try {
                const response = await fetch(`${base_url}/users/farms/${login}`);
                if (!response.ok) throw new Error("Farm not found");
                const data = await response.json();
                setFarm(data);
            } catch (err) {
                console.error(err);
                setFarm(null);
            } finally {
                setLoading(false);
            }
        })();
    }, [login]);

    if (loading) {
        return <p>Loading farm details...</p>;
    }

    if (!farm) {
        return (
            <div className="no-farm-selected">
                <p>No farm selected</p>
            </div>
        );
    }

    return (
        <div className="farm-details-container">
            <button
                className="red-button-top-right"
                onClick={() => {navigate("/farms");}}
            >
                Back to Farms
            </button>

            <div className="farm-details-header">
                <h2>{farm.farmName}</h2>
                <p><strong>City:</strong> {farm.city ?? "N/A"}</p>
                <p><strong>Street:</strong> {farm.street ?? "N/A"}</p>
                <p><strong>Email:</strong> {farm.email}</p>
                <p><strong>Phone:</strong> {farm.phone}</p>
            </div>

            <div className="farm-products-list">
                {farm.products && farm.products.length > 0 ? (
                    farm.products.map((product) => (
                        <FarmDetailsProducts key={product.productId} product={product} />
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
    );
};

export default FarmDetails;
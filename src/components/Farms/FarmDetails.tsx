import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {changePage, clearSelectedFarm} from "../../features/page/pageSlice.ts";
import {navItems} from "../../utils/constants.ts";
import FarmDetailsProducts from "./FarmDetailsProducts.tsx";
import "./Farms.css"

const FarmDetails = () => {
    const dispatch = useAppDispatch();
    const farm = useAppSelector(state => state.page.selectedFarm);

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
                onClick={() => {
                    dispatch(clearSelectedFarm());
                    dispatch(changePage(navItems[2]));
                }}
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
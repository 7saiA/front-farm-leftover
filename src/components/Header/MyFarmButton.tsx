import "./Header.css";
import {useAppSelector} from "../../app/hooks.ts";
import {useNavigate} from "react-router-dom";

const MyFarmButton = () => {
    const navigate = useNavigate();
    const {token, role} = useAppSelector(state => state.auth);
    return (
        <>
            {token && role === "FARM" && (
                <button onClick={() => navigate("/my-farm")}>
                    My Farm
                </button>
            )}
        </>
    );
}

export default MyFarmButton;
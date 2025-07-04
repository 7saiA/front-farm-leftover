import "./Header.css";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {changePage} from "../../features/page/pageSlice.ts";
import {navItems} from "../../utils/constants.ts";

const MyFarmButton = () => {
    const dispatch = useAppDispatch();
    const {token, role} = useAppSelector(state => state.auth);
    return (
        <>
            {token && role === "FARM" && (
                <button onClick={() => dispatch(changePage(navItems[6]))}>
                    My Farm
                </button>
            )}
        </>
    );
}

export default MyFarmButton;
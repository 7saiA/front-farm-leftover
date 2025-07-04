import {useAppDispatch} from "../../../app/hooks.ts";
import {changePage} from "../../../features/page/pageSlice.ts";

interface Props {
    itemTitle: string
}
const NavItem = ({itemTitle}: Props) => {
    const dispatch = useAppDispatch();

    if ("Register".includes(itemTitle)) {
        return null;
    }
    if ("Sing In".includes(itemTitle)) {
        return null;
    }
    if ("Profile".includes(itemTitle)) {
        return null;
    }
    if ("My Farm".includes(itemTitle)) {
        return null;
    }

    if ("FarmDetails".includes(itemTitle)) {
        return null;
    }

    return (
        <li>
            <button onClick={() => dispatch(changePage(itemTitle))}>
                {itemTitle}
            </button>
        </li>
    );
};

export default NavItem;
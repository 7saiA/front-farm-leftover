import {useAppDispatch} from "../../app/hooks.ts";
import {changePage} from "../../features/pageSlice.ts";

interface Props {
    itemTitle: string
}
const NavItem = ({itemTitle}: Props) => {
    const dispatch = useAppDispatch();

    return (
        <li>
            <button onClick={() => dispatch(changePage(itemTitle))}>
                {itemTitle}
            </button>
        </li>
    );
};

export default NavItem;
import {useContext} from "react";
import {FLContext} from "../../utils/context.ts";

interface Props {
    itemTitle: string
}
const NavItem = ({itemTitle}: Props) => {
    const {changePage} = useContext(FLContext);

    return (
        <li>
            <button onClick={() => changePage(itemTitle)}>
                {itemTitle}
            </button>
        </li>
    );
};

export default NavItem;
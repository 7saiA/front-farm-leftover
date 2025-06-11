import {useContext} from "react";
import {FLContext} from "../../utils/context.ts";

interface Props {
    itemTitle: string
}
const NavItem = ({itemTitle}: Props) => {
    const {changePage} = useContext(FLContext);

    return (
        <li
            onClick={() => changePage(itemTitle)}
            className={`bg-red-color border-black border-2 rounded-[5px] px-3 py-2 cursor-pointer hover:text-white hover:bg-red-500`}
        >{itemTitle}</li>
    );
};

export default NavItem;
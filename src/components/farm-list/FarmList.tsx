import {Box} from "@mui/material";
import FarmCard from "../farm-card/FarmCard.tsx";
import type {AllFarmDto} from "../../service/userApi.ts";

interface Props {
    farms: AllFarmDto[];
}

const FarmList = ({farms}: Props) => {

    return (
        <Box sx={{
            pt: 4,
            display: 'grid',
            gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
                xl: 'repeat(5, 1fr)'
            },
            mx: 4,
            gap: 4,
        }}>
            {farms.map((farm) => (
                <FarmCard farm={farm}/>
            ))}
        </Box>
    )
}

export default FarmList;
import {Button, Card, CardActions, CardContent, CardMedia, Fade, Paper, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import type {AllFarmDto} from "../../models/UserModels.ts";

interface Props {
    farm: AllFarmDto;
    isFarmPage?: boolean;
}

const FarmCard = ({farm, isFarmPage}: Props) => {
    const navigate = useNavigate();

    const handleFarmClick = (farmName: string) => {
        navigate(`/farm/${farmName}`);
    };

    return (
        <Fade in={true} timeout={1000}>
            <Paper elevation={8}
                   sx={{borderRadius: 2}}>
                <Card variant="elevation"
                      sx={{
                          height: '100%',
                          border: 1,
                          borderColor: "green",
                          borderRadius: 2
                      }}>
                    <CardMedia
                        sx={{height: 160}}
                        image={"/images/farm.jpg"}
                        title={"farm"}/>
                    <CardContent>
                        <Typography gutterBottom
                                    variant="h5"
                                    component="div">
                            {farm.farmName}
                        </Typography>
                        <Typography variant={"body1"}>
                            Phone: {farm.phone}
                        </Typography>
                        <Typography variant={"body1"}>
                            Email: {farm.email}
                        </Typography>
                        <Typography variant={"caption"}>
                            Location: {farm.city}, {farm.street}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{justifyContent: "center"}}>
                        {!isFarmPage && (
                            <Button size={"small"}
                                    variant={"contained"}
                                    color={"secondary"}
                                    onClick={() => handleFarmClick(farm.farmName)}>
                                Check Account
                            </Button>
                        )}
                    </CardActions>
                </Card>
            </Paper>
        </Fade>
    )
}

export default FarmCard;
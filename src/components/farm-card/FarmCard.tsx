import {Button, Card, CardActions, CardContent, CardMedia, Fade, Paper, Typography} from "@mui/material";
import type {FarmDto} from "../../service/userApi.ts";
import {useNavigate} from "react-router-dom";

interface Props {
    farm: FarmDto;
    isFarmPage?: boolean;
}

const FarmCard = ({farm, isFarmPage}: Props) => {
    const navigate = useNavigate();

    const handleFarmClick = (farmId: string) => {
        navigate(`/farms/${farmId}`);
    };

    return (
        <Fade in={true} timeout={1000} key={farm.login}>
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
                                    onClick={() => handleFarmClick(farm.login)}>
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
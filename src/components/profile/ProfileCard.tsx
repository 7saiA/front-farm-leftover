import {Card, CardContent, CardMedia, Fade, Paper, Typography} from "@mui/material";
import type {UserDto} from "../../models/UserModels.ts";

interface Props {
    user: UserDto;
}

const ProfileCard = ({user}: Props) => {
    return (
        <Fade in={true} timeout={1000} key={user.email}>
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
                            {!user.farmName ? user.userName : user.farmName}
                        </Typography>
                        <Typography variant={"body1"}>
                            Phone: {user.phone}
                        </Typography>
                        <Typography variant={"body1"}>
                            Email: {user.email}
                        </Typography>
                        {user.farmName && (
                            <Typography variant={"caption"}>
                                Location: {user.city}, {user.street}
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            </Paper>
        </Fade>
    )
}

export default ProfileCard;
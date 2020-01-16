import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styled from "styled-components";
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Typography,
    LinearProgress
} from '@material-ui/core';
var moment = require('moment');

const StyledCard = styled(Card)`
width:400px;
background-color:#FFFFFF;
`;

const StyledCardMedia = styled(CardMedia)`
height: 160px;
width: 160px;
margin:auto;
border-radius:50%;
box-shadow: 0px 2px 21px 1px rgba(0,0,0,0.75);
`;

interface Props {
    name: string;
    surname: string;
    profileComplete: boolean;
    sex: any;
    isActive: boolean;
}

const ProfileCard = (props: Props) => {
    const { name, surname, profileComplete, sex, isActive } = props;

    var value = 70;
    if (profileComplete) {
        value = 90;
    }
    if (isActive) {
        value = 100;
    }
    return (
        <StyledCard>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                        {name.substr(0, 1)}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={`${name} ${surname}`}
                subheader={moment(Date.now()).format("YYYY-MM-DD")}
            />
            {sex === 0 && (<StyledCardMedia
                image={"./zdj.jpg"}
            />)}
            {sex === 1 && (<StyledCardMedia
                image={"./zdj2.jpg"}
            />)}
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Profil uzupełniony w {value}%
        </Typography>
                <LinearProgress
                    value={value}
                    variant="determinate"
                />
            </CardContent>
            {/* <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions> */}
        </StyledCard>
    );
}

export default ProfileCard;
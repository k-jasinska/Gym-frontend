import React, { useEffect, useState } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import styled from "styled-components";
import { useSnackbar } from 'notistack';
import api from '../../../api/clientApi';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider, Button } from '@material-ui/core';
var moment = require('moment');


const StyledCard = styled(Card)`
  margin-top: 16px;
  margin-bottom: 32px;
  width:100%;
`;

const StyledCardContent = styled(CardContent)`
max-height:400px;
overflow-y:scroll;
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
::-webkit-scrollbar-thumb {
  background: #888; 
}

::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
`;

interface Entrance {
    carnetId: any;
    dates: Date[];
    type: any;
    dateStart: Date;
    dateEnd: Date;
}

const CarnetDetails = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [item, setDetails] = useState<Entrance>();

    useEffect(() => {
        loadCarnets();
    }, []);

    const loadCarnets = async () => {
        try {
            const response = await api.loadClientEntrance();
            setDetails(response.data);
        } catch (error) {
            enqueueSnackbar(error.message, {
                variant: 'error'
            });
        }
    };


    return (
        <>
            {item && (
                <>
                    <StyledCard>
                        <div key={item.carnetId}>
                            <CardHeader
                                title={item.type.name}
                            />
                            <CardContent>
                                <Typography color="textSecondary" variant="subtitle1" >
                                    Cena: {item.type.price} zł
            </Typography>
                                <Typography color="textSecondary" variant="subtitle1" >
                                    Ważność od: {moment(item.dateStart).format("DD-MM-YYYY")}
                                </Typography>
                                <Typography color="textSecondary" variant="subtitle1"  >
                                    Wygasa: {moment(item.dateEnd).format("DD-MM-YYYY")}
                                </Typography>
                            </CardContent>
                        </div>
                    </StyledCard>


                    <StyledCard>
                        <div key={item.carnetId}>
                            <CardHeader
                                subheader="Daty wejść:"
                            />
                            <StyledCardContent>
                                {item.dates.map((item: Date) => (
                                    <List key={item.toString()}>
                                        <ListItem>
                                            <ListItemText primary={moment(item).format("DD.MM.YYYY HH:mm")} />
                                        </ListItem>
                                        <Divider />
                                    </List>
                                ))}
                            </StyledCardContent>
                        </div>
                    </StyledCard>
                </>)}

        </>);
}

export default CarnetDetails;
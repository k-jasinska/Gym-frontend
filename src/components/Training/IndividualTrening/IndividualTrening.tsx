import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styled from "styled-components";
import { useSnackbar } from 'notistack';
import api from '../../../api/trainerApi';
import moment from "moment";

const StyledGrid = styled(Grid)`
margin-top: 12px;
`;


interface ITrening {
    trainingID: string;
    title: string;
    start: Date;
    duration: any;
    quantity: number;
    count: number;
    name: string;
    surname: string;
}


interface Props {
    events: ITrening[];
}

export default function IndividualTrening(props: Props) {
    const { events } = props;

    return (
        <>
            {events.length ? (
                <StyledGrid container spacing={5} alignItems="flex-end">
                    {events.map(item => (
                        <Grid item key={item.trainingID} xs={12} sm={12} md={4}>
                            <Card>
                                <CardHeader
                                    title={item.title}
                                    titleTypographyProps={{ align: 'center' }}
                                    subheaderTypographyProps={{ align: 'center' }}
                                />
                                <CardContent>
                                    <div>
                                        <Typography variant="caption" display="block" gutterBottom>Data:</Typography>
                                        <Typography variant="button" component="div">
                                            <Box fontWeight="fontWeightBold">
                                                {moment(item.start).format("DD.MM.YYYY HH:mm")}
                                            </Box>
                                        </Typography>
                                        <Typography variant="caption" display="block" gutterBottom>Czas trwania:</Typography>
                                        <Typography variant="button" component="div">
                                            <Box fontWeight="fontWeightBold">
                                                {item.duration} h
                                            </Box>
                                        </Typography>
                                        {
                                            item.count === 1 ? (<>
                                                <Typography variant="caption" display="block" gutterBottom>Uczestnik:</Typography>
                                                <Typography variant="button" component="div">
                                                    <Box fontWeight="fontWeightBold">
                                                        {item.name}   {item.surname}
                                                    </Box>
                                                </Typography>
                                            </>) : null
                                        }
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>

                    ))}
                </StyledGrid>
            ) : (
                    <div>Obecnie brak treningów do wyświetlenia</div>
                )}
        </>
    );
}

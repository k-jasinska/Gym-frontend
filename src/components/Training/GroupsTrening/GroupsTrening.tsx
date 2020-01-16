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
import { useTranslation } from 'react-i18next';

const StyledGrid = styled(Grid)`
margin-top: 12px;
`;

const StyledCard = styled(Card)`
cursor:pointer;
`;

interface ITrening {
    trainingID: string;
    title: string;
    type: any;
    start: Date;
    duration: any;
    quantity: number;
    count: number;
}


interface Props {
    handleClick: (e: any, treningId: string) => void;
    events: ITrening[];
}

export default function GroupsTrening(props: Props) {
    // const [events, setGEvents] = useState<ITrening[]>([]);
    const { t } = useTranslation();
    const { handleClick, events } = props;

    return (
        <>
            {events.length ? (
                <StyledGrid container spacing={5} alignItems="flex-end">
                    {events.map(item => (
                        <Grid item key={item.trainingID} xs={12} sm={12} md={4}>
                            <StyledCard onClick={e => handleClick(e, item.trainingID)}>
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
                                        <Typography variant="caption" display="block" gutterBottom>Ilość osób:</Typography>
                                        <Typography variant="button" component="div">
                                            <Box fontWeight="fontWeightBold">
                                                {item.count} / {item.quantity}
                                            </Box>
                                        </Typography>
                                    </div>
                                </CardContent>
                            </StyledCard>
                        </Grid>

                    ))}
                </StyledGrid>
            ) : (
                    <div>Obecnie brak treningów do wyświetlenia</div>
                )}
        </>
    );
}

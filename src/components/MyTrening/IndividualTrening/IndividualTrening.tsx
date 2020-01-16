import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styled from "styled-components";
import moment from "moment";
import api from '../../../api/treningApi';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';


const StyledGrid = styled(Grid)`
margin-top: 12px;
`;

interface ITrening {
    trainingID: string;
    title: string;
    type: any;
    start: Date;
    duration: any;
    quantity: number;
    count: number;
    trainer: {
        name: string;
        surname: string;
    }
}

interface Props {
    events: ITrening[];
    loadIndividualTraining: () => void;
    changeFlag: () => void;
}

export default function IndividualTrening(props: Props) {
    const { events, changeFlag } = props;
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();


    const handleClick = async (event: React.MouseEvent<unknown>, treningId: string) => {
        try {
            await api.takePart(treningId);
            changeFlag();
            enqueueSnackbar(t('goodMessage.takePart'), {
                variant: 'success'
            });
        }
        catch (error) {
            enqueueSnackbar(error.message, {
                variant: 'error'
            });
        };
    };
    console.log(events)
    return (
        <>
            {events.length ? (
                <>
                    <StyledGrid container spacing={3} alignItems="flex-end">
                        {events.map(item => (<>
                            {item.count < item.quantity ? (
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
                                                <Typography variant="caption" display="block" gutterBottom>Trener:</Typography>
                                                <Typography variant="button" component="div">
                                                    <Box fontWeight="fontWeightBold">
                                                        {item.trainer.name}   {item.trainer.surname}
                                                    </Box>
                                                </Typography>
                                            </div>
                                        </CardContent>

                                        <CardActions>
                                            <Button onClick={e => handleClick(e, item.trainingID)} fullWidth variant='contained' color="primary">
                                                Dołącz
</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ) : null}
                        </>
                        ))}
                    </StyledGrid>
                    {(events.length == 1 && events[0].count >= events[0].quantity) && (<div>Obecnie brak treningów do wyświetlenia</div>)}
                </>
            ) : (
                    <div>Obecnie brak treningów do wyświetlenia</div>
                )}
        </>
    );
}

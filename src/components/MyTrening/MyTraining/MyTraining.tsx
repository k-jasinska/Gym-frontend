import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styled from "styled-components";
import { useSnackbar } from 'notistack';
import api from '../../../api/treningApi';
import moment from "moment";
import { useTranslation } from 'react-i18next';

import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Grid,
    Button,
} from '@material-ui/core';

const StyledGrid = styled(Grid)`
margin-top: 12px;
`;

const StyledCardHeader = styled(CardHeader)`
margin-top: 12px;
margin-bottom:0px;
padding-bottom:0px;
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
    eventsDone: ITrening[];
    mEvents: ITrening[];
    changeFlag: () => void;
}


export default function MyTraining(props: Props) {
    const { eventsDone, mEvents, changeFlag } = props;
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();

    const handleClick = async (event: React.MouseEvent<unknown>, treningId: string) => {
        try {
            var test = [treningId];
            await api.unsubscribe(test);
            changeFlag();
            enqueueSnackbar(t('goodMessage.deleteTrening'), {
                variant: 'success'
            });
        }
        catch (error) {
            enqueueSnackbar(error.message, {
                variant: 'error'
            });
        };
    };

    return (
        <>
            {mEvents.length ? (
                <>
                    <StyledCardHeader subheader="Nadchodzące treningi" />
                    <StyledGrid container spacing={3} alignItems="flex-end">
                        {mEvents.map(item => (
                            <Grid item key={item.trainingID} xs={12} sm={12} md={4}>
                                <Card>
                                    <CardHeader
                                        title={item.title}
                                        titleTypographyProps={{ align: 'center' }}
                                        subheaderTypographyProps={{ align: 'center' }}
                                    />
                                    <CardContent>
                                        <div>
                                            <Typography variant="caption" display="block" gutterBottom>Trener:</Typography>
                                            <Typography variant="button" component="div">
                                                <Box fontWeight="fontWeightBold">
                                                    {item.trainer.name}   {item.trainer.surname}
                                                </Box>
                                            </Typography>
                                            <Typography variant="caption" display="block" gutterBottom>Data:</Typography>
                                            <Typography variant="button" component="div">
                                                <Box fontWeight="fontWeightBold">
                                                    {moment(item.start).format("DD.MM.YYYY HH:mm")}
                                                </Box>
                                            </Typography>
                                            <Typography variant="caption" display="block" gutterBottom>Liczba uczestników:</Typography>
                                            <Typography variant="button" component="div">
                                                <Box fontWeight="fontWeightBold">
                                                    {item.count}/{item.quantity}
                                                </Box>
                                            </Typography>
                                        </div>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={e => handleClick(e, item.trainingID)} fullWidth variant='contained' color="primary">
                                            Zrezygnuj
</Button>
                                    </CardActions>
                                </Card>
                            </Grid>

                        ))}
                    </StyledGrid>
                </>
            ) : null}



            {eventsDone.length ? (
                <>
                    <StyledCardHeader subheader="Historia" />
                    <StyledGrid container spacing={3} alignItems="flex-end">
                        {eventsDone.map(item => (

                            <Grid item key={item.trainingID} xs={12} sm={12} md={4}>
                                <Card>
                                    <CardHeader
                                        title={item.title}
                                        titleTypographyProps={{ align: 'center' }}
                                        subheaderTypographyProps={{ align: 'center' }}
                                    />
                                    <CardContent>
                                        <div>
                                            <Typography variant="caption" display="block" gutterBottom>Trener:</Typography>
                                            <Typography variant="button" component="div">
                                                <Box fontWeight="fontWeightBold">
                                                    {item.trainer.name}   {item.trainer.surname}
                                                </Box>
                                            </Typography>
                                            <Typography variant="caption" display="block" gutterBottom>Data:</Typography>
                                            <Typography variant="button" component="div">
                                                <Box fontWeight="fontWeightBold">
                                                    {moment(item.start).format("DD.MM.YYYY HH:mm")}
                                                </Box>
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>

                        ))}
                    </StyledGrid>
                </>
            ) : null}

            {(mEvents.length || eventsDone.length) ? (
                null
            ) : (
                    <div>Obecnie brak treningów do wyświetlenia</div>
                )}
        </>
    );
}

import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import styled from "styled-components";
import { useSnackbar } from 'notistack';
import api from '../../api/carnetApi';
import { useTranslation } from 'react-i18next';

const StyledContainer = styled(Container)`
padding-top: 32px;
padding-bottom: 32px;
`;

const StyledGrid = styled(Grid)`
margin-top: 12px;
`;

const useStyles = makeStyles(theme => ({
    cardHeader: {
        backgroundColor: theme.palette.grey[200],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    }
}));

interface CarnetTypes {
    carnetTypeID: string;
    price: number;
    name: string;
    duration: number;
}
interface Props {
    checkIsComplete: () => void;
}
export default function CarnetList(props: Props) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { checkIsComplete } = props;
    const { t } = useTranslation();
    const [items, setTypes] = useState<CarnetTypes[]>([]);

    useEffect(() => {
        loadTypes();
    }, []);

    const loadTypes = async () => {
        try {
            const response = await api.getTypes();
            setTypes(response.data);
        } catch (error) {
            enqueueSnackbar(error.message, {
                variant: 'error'
            });
        }
    };

    const selectCarnet = async (id: string) => {
        try {
            await api.selectCarnet(id);
            checkIsComplete();
            enqueueSnackbar(t('goodMessage.selectCarnet'), {
                variant: 'success'
            });
        } catch (error) {
            if (error.name === 'ValidError') {
                // setBackendValidationErrors(error.message);
            } else {
                enqueueSnackbar(error.message, {
                    variant: 'error'
                });
            }
        }

    }

    return (
        <>
            <StyledGrid container spacing={5} alignItems="flex-end">
                {items.map(item => (
                    <Grid item key={item.carnetTypeID} xs={12} sm={12} md={4}>
                        <Card>
                            <CardHeader
                                title={item.name}
                                titleTypographyProps={{ align: 'center' }}
                                subheaderTypographyProps={{ align: 'center' }}
                                className={classes.cardHeader}
                            />
                            <CardContent>
                                <div className={classes.cardPricing}>
                                    <Typography component="h2" variant="h3" color="textPrimary">
                                        {item.price} zł
                    </Typography>
                                </div>
                                <div className={classes.cardPricing}>
                                    <Typography component="h6" variant="h6" color="textPrimary">
                                        {item.duration} dni
                    </Typography>
                                </div>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => selectCarnet(item.carnetTypeID)} fullWidth variant='contained' color="primary">
                                    Wybierz
                  </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </StyledGrid>
        </>
    );
}

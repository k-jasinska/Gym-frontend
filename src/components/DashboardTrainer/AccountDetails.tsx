import React, { useState, useEffect } from 'react';
import api from '../../api/trainerApi';
import { makeStyles } from '@material-ui/styles';
import { useSnackbar } from 'notistack';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField
} from '@material-ui/core';

interface Details {
    name: string;
    surname: string;
    email: string;
    contactData: any;
    address: string;
    profileComplete: boolean;
    training: [{
        trainingID: string;
        title: string;
        type: any;
        start: Date;
        duration: any;
        quantity: any;
    }]
}

interface Props {
    items: Details;
}

const AccountDetails = (props: Props) => {
    const { items } = props;
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (event: any) => {
        // setValues({
        //     ...values,
        //     [event.target.name]: event.target.value
        // });
    };

    const sex = [
        {
            value: 'male',
            label: 'Kobieta'
        },
        {
            value: 'female',
            label: 'Mężczyzna'
        }
    ];

    return (
        <Card>
            <form
                autoComplete="off"
                noValidate
            >
                <CardHeader
                    subheader="Uzupełnij brakujące informacje"
                    title="Profil"
                />
                <Divider />
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                disabled
                                label="Imię"
                                margin="dense"
                                name="name"
                                onChange={handleChange}
                                required
                                value={items.name}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                disabled
                                label="Nazwisko"
                                margin="dense"
                                name="surname"
                                onChange={handleChange}
                                required
                                value={items.surname}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                disabled
                                label="Adres E-mail"
                                margin="dense"
                                name="email"
                                onChange={handleChange}
                                required
                                value={items.email}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Podaj numer telefonu"
                                margin="dense"
                                name="contactData"
                                onChange={handleChange}
                                type="number"
                                value={items.contactData}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Adres"
                                helperText="Wprowadź adres"
                                margin="dense"
                                name="address"
                                onChange={handleChange}
                                required
                                value={items.address}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                    <Button
                        color="primary"
                        variant="contained"
                    >
                        Zapisz zmiany
          </Button>
                </CardActions>
            </form>
        </Card>
    );
};

export default AccountDetails;

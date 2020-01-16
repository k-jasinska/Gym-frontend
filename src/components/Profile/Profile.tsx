import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import api from '../../api/clientApi';
import PasswordForm from './PasswordForm';
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
import { Formik, Form } from 'formik';

const StyledContainer = styled(Container)`
  padding-top: 64px;
  padding-bottom: 32px;
`;

const sex = [
    {
        value: 0,
        label: 'Mężczyzna'
    },
    {
        value: 1,
        label: 'Kobieta'
    }
];

export default function Profile() {
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();
    const [name, setName] = useState("");
    const [surname, setSurame] = useState("");
    const [email, setEmail] = useState("");
    const [contactData, seData] = useState();
    const [sexx, setSex] = useState("");
    const [address, setAddress] = useState("");
    const [complete, setComplete] = useState(false);


    useEffect(() => {
        loadCarnets();
    }, []);

    const loadCarnets = async () => {
        try {
            const response = await api.getDetails();
            setName(response.data.name);
            setSurame(response.data.surname);
            setEmail(response.data.email);
            seData(response.data.contactData);
            setSex(response.data.sex);
            setAddress(response.data.address);
            setComplete(response.data.profileComplete);
        } catch (error) {
            enqueueSnackbar(error.message, {
                variant: 'error'
            });
        }
    };

    const updateProfile = async (values: any, setSubmitting: (value: boolean) => void) => {
        try {
            await api.updateProfile(values);
            setSubmitting(true);
            loadCarnets();
            enqueueSnackbar(t('goodMessage.updatePofile'), {
                variant: 'success'
            });
        } catch (error) {
            setSubmitting(false);
            if (error.name === 'ValidError') {
                // setBackendValidationErrors(error.message);
            } else {
                enqueueSnackbar(error.message, {
                    variant: 'error'
                });
            }
        }
    };


    const initialValues: any = {
        name: name,
        surname: surname,
        email: email,
        contactData: contactData,
        sex: sexx,
        address: address,
    }

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                // validationSchema={AddPersonnelValidation}
                onSubmit={async (values: any, { setSubmitting }) => {
                    await updateProfile(values, setSubmitting);
                }}>

                {({ isSubmitting, handleChange, values, setFieldValue, errors }) => (
                    <Form>
                        <StyledContainer>
                            <Card>
                                <CardHeader
                                    subheader={complete ? ("Profil kompletny") : ("Uzupełnij brakujące informacje")}
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
                                                onChange={e => {
                                                    setFieldValue("name", e.target.value);
                                                }}
                                                required
                                                value={values.name}
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
                                                onChange={e => {
                                                    setFieldValue("surname", e.target.value);
                                                }}
                                                required
                                                value={values.surname}
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
                                                label="Adres E-mail"
                                                margin="dense"
                                                name="email"
                                                onChange={e => {
                                                    setFieldValue("email", e.target.value);
                                                }}
                                                required
                                                value={values.email}
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
                                                onChange={e => {
                                                    setFieldValue("contactData", e.target.value);
                                                }}
                                                required
                                                value={values.contactData}
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
                                                helperText="Wybierz płeć"
                                                label="Płeć"
                                                margin="dense"
                                                name="sex"
                                                onChange={e => {
                                                    setFieldValue("sex", e.target.value);
                                                }}
                                                required
                                                select
                                                SelectProps={{ native: true }}
                                                value={values.sex}
                                                variant="outlined"
                                            >
                                                {sex.map(option => (
                                                    <option
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </TextField>
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
                                                onChange={e => {
                                                    setFieldValue("address", e.target.value);
                                                }}
                                                required
                                                value={values.address}
                                                variant="outlined"
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <Divider />
                                <CardActions>
                                    <Button
                                        type="submit" disabled={isSubmitting}
                                        color="primary"
                                        variant="contained"
                                    >
                                        Zapisz zmiany
                                </Button>
                                </CardActions>
                            </Card>
                        </StyledContainer >
                    </Form>
                )}
            </Formik>
            <PasswordForm />
        </>
    );
}
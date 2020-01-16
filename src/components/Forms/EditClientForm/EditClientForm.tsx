import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import api from '../../../api/clientApi';
import { Typography } from '@material-ui/core';
import ErrorMessageBackend from '../ErrorMessageBackend';
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
interface FormProps {
    handleClose: () => void;
    loadPersonnel: (rowsPerPage: number, page: number) => Promise<void>;
    selected: string;
}

export default function EditClientForm(props: FormProps) {
    const { handleClose, loadPersonnel, selected } = props;
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();
    const [name, setName] = useState("");
    const [surname, setSurame] = useState("");
    const [email, setEmail] = useState("");
    const [contactData, seData] = useState();
    const [sexx, setSex] = useState("");
    const [address, setAddress] = useState("");
    const [complete, setComplete] = useState(false);
    const [BackendValidationErrors, setBackendValidationErrors] = useState({});


    useEffect(() => {
        loadCarnets();
    }, []);

    const loadCarnets = async () => {
        try {
            const response = await api.getDetailsById(selected);
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
            await api.updateProfileById(values, selected);
            setSubmitting(false);
            handleClose();
            loadPersonnel(10, 1);
            enqueueSnackbar(t('goodMessage.updatePofile'), {
                variant: 'success'
            });
        } catch (error) {
            setSubmitting(false);
            if (error.name === 'ValidError') {
                setBackendValidationErrors(error.message);
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
                onSubmit={async (values: any, { setSubmitting }) => {
                    await updateProfile(values, setSubmitting);
                }}>

                {({ isSubmitting, handleChange, values, setFieldValue, errors }) => (
                    <Form>
                        <Typography variant="h6" gutterBottom>
                            {t('clients.edit')}
                        </Typography>
                        <Grid container spacing={3}>
                            {Object.entries(BackendValidationErrors).length !== 0 && (
                                <ErrorMessageBackend errors={BackendValidationErrors} />
                            )}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Imię"
                                    margin="dense"
                                    name="name"
                                    onChange={e => {
                                        setFieldValue("name", e.target.value);
                                    }}
                                    required
                                    value={values.name}
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Nazwisko"
                                    margin="dense"
                                    name="surname"
                                    onChange={e => {
                                        setFieldValue("surname", e.target.value);
                                    }}
                                    required
                                    value={values.surname}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="E-mail"
                                    margin="dense"
                                    name="email"
                                    onChange={e => {
                                        setFieldValue("email", e.target.value);
                                    }}
                                    required
                                    value={values.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                            <Grid item xs={12}>
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
                                />
                            </Grid>
                            <CardActions>
                                <Button
                                    type="submit" disabled={isSubmitting}
                                    color="primary"
                                    variant="contained"
                                >
                                    Zapisz zmiany
                                </Button>
                            </CardActions>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </>
    );
}
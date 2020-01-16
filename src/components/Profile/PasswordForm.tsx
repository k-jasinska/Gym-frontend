import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import api from '../../api/clientApi';
import ErrorMessageBackend from './ErrorMessageBackend';
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
  padding-bottom: 32px;
`;

export default function PasswordForm() {
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();
    const [BackendValidationErrors, setBackendValidationErrors] = useState({});


    const changePassword = async (values: any, setSubmitting: (value: boolean) => void) => {
        try {
            await api.changePassword(values);
            setSubmitting(false);
            enqueueSnackbar(t('goodMessage.changePassword'), {
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
        oldPassword: '',
        newPassword: '',
    }

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={async (values: any, { setSubmitting }) => {
                console.log(values);
                await changePassword(values, setSubmitting);
            }}>

            {({ isSubmitting, values, handleChange }) => (
                <Form>
                    <StyledContainer>
                        <Card>
                            <CardHeader
                                subheader={Object.entries(BackendValidationErrors).length !== 0 && (
                                    <ErrorMessageBackend errors={BackendValidationErrors} />
                                )}
                                title="Zmiana hasła"
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
                                            label="Stare hasło"
                                            type="password"
                                            margin="dense"
                                            name="oldPassword"
                                            onChange={handleChange}
                                            required
                                            value={values.oldPassword}
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
                                            label="Nowe hasło"
                                            margin="dense"
                                            name="newPassword"
                                            type="password"
                                            onChange={handleChange}
                                            required
                                            value={values.newPassword}
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
                                    Zapisz nowe hasło
                                </Button>
                            </CardActions>
                        </Card>
                    </StyledContainer >
                </Form>
            )}
        </Formik>
    );
}
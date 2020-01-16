import React, { useState } from 'react';
import { Grid, Typography, Button, } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import api from '../../../api/adminApi';
import * as Yup from 'yup';
import TextLabel from './TextLabel';
import ErrorMessageBackend from '../ErrorMessageBackend';
import { useSnackbar } from 'notistack';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const StyledTextField = styled(TextField)`
  width: 100%;
`;

interface Event {
    price: number;
    name: string;
    duration: number;
}

interface FormProps {
    getCarnet: () => Promise<void>;
}
export default function AddTrainingForm(props: FormProps) {
    const { getCarnet } = props;
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();
    const [BackendValidationErrors, setBackendValidationErrors] = useState({});


    const initialValues: Event = {
        price: 0,
        name: "",
        duration: 0
    }

    const AddPersonnelValidation = Yup.object().shape({
        price: Yup.number().min(1, "min 1").integer().required(t('errors.price')),
        name: Yup.string().required(t('errors.nameCarnet')),
        duration: Yup.number().min(1, "min 1").integer().required(t('errors.durationCarnet')),

    });

    const createCarnet = async (values: Event, setSubmitting: (value: boolean) => void, resetForm: (value: any) => void) => {
        try {
            await api.createCarnet(values);
            resetForm({})
            setSubmitting(true);
            getCarnet();
            enqueueSnackbar(t('goodMessage.createCarnet'), {
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

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={AddPersonnelValidation}
                onSubmit={async (values: Event, { setSubmitting, resetForm }) => {
                    await createCarnet(values, setSubmitting, resetForm);
                }}>
                {({ isSubmitting, handleChange, values, setFieldValue, errors }) => (
                    <Form>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                {t('carnetForm.add')}
                            </Typography>
                        </Grid>

                        <Grid container spacing={3}>
                            {Object.entries(BackendValidationErrors).length !== 0 && (
                                <ErrorMessageBackend errors={BackendValidationErrors} />
                            )}

                            <Grid item xs={12}>
                                <StyledTextField required label={t('carnets.price')} type="number" name="price" onChange={handleChange} />
                            </Grid>

                            <TextLabel name="name" />

                            <Grid item xs={12}>
                                <StyledTextField required label={t('carnets.duration')} type="number" name="duration" onChange={handleChange} />
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit" disabled={isSubmitting} fullWidth variant="contained" color="primary">
                                    {t('trainingForm.addButton')}
                                </Button>
                            </Grid>
                            {/* <pre>{JSON.stringify(errors, null, 2)}</pre>
                            <pre>{JSON.stringify(values, null, 2)}</pre> */}

                        </Grid>
                    </Form>
                )}
            </Formik>
        </>
    );
}

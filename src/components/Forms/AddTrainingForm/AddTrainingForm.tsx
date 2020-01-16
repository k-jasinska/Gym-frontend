import React, { useState } from 'react';
import { Grid, Typography, Button, } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import api from '../../../api/trainerApi';
import * as Yup from 'yup';
import TextLabel from './TextLabel';
import ErrorMessageBackend from '../ErrorMessageBackend';
import { useSnackbar } from 'notistack';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import TypeTrening from './TypeTrening';
import DateFnsUtils from "@date-io/date-fns";
import plLocale from "date-fns/locale/pl";

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const StyledHideTextField = styled(TextField) <{ open: boolean }>`
  width: 100%;
  visibility: ${props => (props.open ? 'visible' : 'hidden')};
`;


const StyledDateTimePicker = styled(DateTimePicker)`
  width: 100%;
`;

interface Event {
    type: string;
    title: string;
    start: Date;
    duration: any;
    quantity: number;
}


interface FormProps {
    handleClose: () => void;
    getTrenings: () => Promise<void>;
}
export default function AddTrainingForm(props: FormProps) {
    const { handleClose, getTrenings } = props;
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();
    const [BackendValidationErrors, setBackendValidationErrors] = useState({});
    const [dateTime, setdateTime] = useState(new Date());
    const [isGroup, setIsGroup] = useState(false);


    const initialValues: Event = {
        type: "",
        title: "",
        start: dateTime,
        duration: "",
        quantity: 1
    }

    const AddPersonnelValidation = Yup.object().shape({
        type: Yup.string().required(t('errors.type')),
        title: Yup.string().required(t('errors.title')),
        start: Yup.date().required(t('errors.start')),
        duration: Yup.string().required(t('errors.duration')),
        quantity: Yup.number().min(1, "min 1").max(100, "max 100").integer().required(t('errors.quantity')),
    });

    const createClient = async (values: Event, setSubmitting: (value: boolean) => void) => {
        try {
            await api.createEvent(values);
            setSubmitting(true);
            getTrenings();
            handleClose();
            enqueueSnackbar(t('goodMessage.createTraining'), {
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

    const handleChangeFlag = () => {
        setIsGroup(true);
    }

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={AddPersonnelValidation}
                onSubmit={async (values: Event, { setSubmitting }) => {
                    await createClient(values, setSubmitting);
                }}>
                {({ isSubmitting, handleChange, values, setFieldValue, errors }) => (
                    <Form>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                {t('trainingForm.add')}
                            </Typography>
                        </Grid>

                        {values.type === "Group" ? setIsGroup(true) : setIsGroup(false)}

                        <Grid container spacing={3}>
                            {Object.entries(BackendValidationErrors).length !== 0 && (
                                <ErrorMessageBackend errors={BackendValidationErrors} />
                            )}

                            <TypeTrening />

                            <TextLabel name="title" />

                            <Grid item xs={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
                                    <StyledDateTimePicker name="start" onChange={value => {
                                        if (values.type == "Individual") {
                                            setFieldValue("quantity", 1)
                                        }
                                        setFieldValue("start", value);
                                    }}
                                        value={values.start} />
                                </MuiPickersUtilsProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <StyledTextField
                                    id="time"
                                    label={t('trainingForm.duration')}
                                    type="time"
                                    name="duration"
                                    defaultValue={values.duration}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300,
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <StyledHideTextField label={t('trainingForm.quantity')} type="number" name="quantity" onChange={handleChange} open={isGroup} />
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

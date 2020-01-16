import React, { useState } from 'react';
import { Grid, Typography, Button, } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import api from '../../../api/adminApi';
import * as Yup from 'yup';
import TextLabel from './TextLabel';
import LoginField from './LoginField';
import ErrorMessageBackend from '../ErrorMessageBackend';
import { useSnackbar } from 'notistack';

interface Personnel {
  name: string;
  surname: string;
  email: string;
  login: string;
  role: string;
}

const initialValues: Personnel = {
  name: '',
  surname: '',
  email: '',
  login: '',
  role: "Trainer"
};

interface FormProps {
  handleClose: () => void;
  loadPersonnel: (rowsPerPage: number, page: number) => Promise<void>;
}
export default function AddTrainerForm(props: FormProps) {
  const { handleClose, loadPersonnel } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [BackendValidationErrors, setBackendValidationErrors] = useState({});

  const AddPersonnelValidation = Yup.object().shape({
    name: Yup.string().required(t('errors.givenNameRequired')),
    surname: Yup.string().required(t('errors.familyNameRequired')),
    email: Yup.string().required(t('errors.emailRequired')),
    login: Yup.string().required(t('errors.loginRequired'))
  });

  const createClient = async (values: Personnel, setSubmitting: (value: boolean) => void) => {
    try {
      await api.createItem(values);
      setSubmitting(true);
      handleClose();
      loadPersonnel(10, 1);
      enqueueSnackbar(t('goodMessage.createPersonnel'), {
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
        initialValues={initialValues}
        validationSchema={AddPersonnelValidation}
        onSubmit={async (values: Personnel, { setSubmitting }) => {
          await createClient(values, setSubmitting);
        }}>
        {({ isSubmitting }) => (
          <Form>
            <Typography variant="h6" gutterBottom>
              {t('trainers.add')}
            </Typography>

            <Grid container spacing={3}>
              {Object.entries(BackendValidationErrors).length !== 0 && (
                <ErrorMessageBackend errors={BackendValidationErrors} />
              )}
              <TextLabel name="name" />
              <TextLabel name="surname" />
              <TextLabel name="email" />
              <LoginField name="login" />
              <Button type="submit" disabled={isSubmitting} fullWidth variant="contained" color="primary">
                {t('trainers.addButton')}
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}

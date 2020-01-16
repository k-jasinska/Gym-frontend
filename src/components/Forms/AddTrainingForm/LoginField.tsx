import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import styled from 'styled-components';
import api from '../../../api/adminApi';
import ErrorMessageBackend from '../ErrorMessageBackend';
import { useSnackbar } from 'notistack';

const StyledTextField = styled(TextField)`
  width: 100%;
  & .MuiFormLabel-root.Mui-focused {
    color: ${props => props.theme.palette.secondary.main};
  }
  & .MuiInput-underline:after {
    border-bottom-color: ${props => props.theme.palette.secondary.main};
  }
  & .MuiInput-underline.Mui-error:after {
    border-bottom-color: red;
  }
`;

interface Props {
  name: string;
}

const LoginField = (props: Props) => {
  const { name } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [login, setLogin] = useState<string>('');
  const [BackendValidationErrors, setBackendValidationErrors] = useState({});
  const { t } = useTranslation();

  const checkLoginValid = async () => {
    try {
      await api.checkLogin(login);
    } catch (error) {
      if (error.name === 'ValidError') {
        setBackendValidationErrors(error.message);
      } else {
        enqueueSnackbar(error.message, {
          variant: 'error'
        });
      }
    }
  };

  useEffect(() => {
    if (login) {
      const timeout = setTimeout(async () => {
        await checkLoginValid();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [login]);

  const handleLoginChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLogin(e.target.value);
  };

  return (
    <Grid item xs={12}>
      <Field
        required
        type={name}
        label={t(`trainers.${name}`)}
        name={name}
        onKeyUp={handleLoginChange}
        component={StyledTextField}
      />
      {Object.entries(BackendValidationErrors).length !== 0 && (
        <ErrorMessageBackend errors={BackendValidationErrors} />
      )}
    </Grid>
  );
};

export default LoginField;

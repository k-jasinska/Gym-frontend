import React from 'react';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import styled from 'styled-components';

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

const TextLabel = (props: Props) => {
  const { name } = props;

  const { t } = useTranslation();
  return (
    <Grid item xs={12}>
      <Field required type={name} label={t(`trainingForm.${name}`)} name={name} component={StyledTextField} />
    </Grid>
  );
};

export default TextLabel;

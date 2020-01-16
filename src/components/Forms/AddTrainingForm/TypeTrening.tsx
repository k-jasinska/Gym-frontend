import React, { useEffect, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { lighten } from '@material-ui/core/styles';
import { TextField } from 'formik-material-ui';
import { Field } from 'formik';

const StyledFormControl = styled(FormControl)`
  width: 100%;
`;

const StyledMenuItem = styled(MenuItem)`
  max-height: 224px;

  &.Mui-selected {
    background-color: ${props => lighten(props.theme.palette.secondary.light, 0.5)};
  }
  &:hover,
  &.Mui-selected:hover {
    background-color: ${props => lighten(props.theme.palette.secondary.main, 0.4)};
  }
`;

const StyledTextField = styled(TextField)`
  margin: 0;
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

// interface Props {
//     changeFlag: () => void;
// }

export default function TypeTrening() {
    // const { changeFlag } = props;
    const { t } = useTranslation();
    const typeTraning = ["Group", "Individual"];

    return (
        <Grid item xs={12}>
            <StyledFormControl>
                <Field
                    required
                    type="text"
                    name="type"
                    label={t('trainingForm.type')}
                    select
                    margin="normal"
                    component={StyledTextField}>
                    {typeTraning.map(option => (
                        <StyledMenuItem key={option} value={option}>
                            {t(`trainingForm.${option}`)}
                        </StyledMenuItem>
                    ))}
                </Field>
            </StyledFormControl>
        </Grid>
    );
}

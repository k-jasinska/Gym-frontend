import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

const StyledErrorMessage = styled.div`
  color: red;
  font-size: 0.75rem;
`;

interface Props {
    errors: any;
}
export const ErrorMessageBackend = (props: Props) => {
    const errors = Object.keys(props.errors).map(key => (
        <StyledErrorMessage key={key}>{props.errors[key]}</StyledErrorMessage>
    ));

    return (
        <Grid item xs={12}>
            {errors}
        </Grid>
    );
};

export default ErrorMessageBackend;

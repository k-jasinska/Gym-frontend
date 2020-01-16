import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Container, CardMedia } from '@material-ui/core';
import styled from "styled-components";
import { useSnackbar } from 'notistack';
import api from '../../api/clientApi';
import CarnetList from './CarnetList';
import CarnetDetails from './CarnetDetails/CarnetDetails';
import { RiseLoader } from 'react-spinners';
import { CardHeader } from '@material-ui/core';

const StyledContainer = styled(Container)`
padding-top: 32px;
padding-bottom: 32px;
`;
const StyledCardMedia = styled(CardMedia)`
height: 180px;
width: 180px;
margin:auto;
border-radius:50%;
`;

const StyledCardHeader = styled(CardHeader)`
padding-top: 60px;
`;

const StyledGrid = styled(Grid)`
margin-top: 12px;
`;

const StyledSpinner = styled.div`
height:calc(100% - 64px);
display: flex;
align-items: center;
justify-content: center;
`;

interface State {
  complete: any;
  active: any;
  exist: any;
}

export default function MyCarnet() {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<State>();

  useEffect(() => {
    checkIsComplete();
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const checkIsComplete = async () => {
    try {
      const response = await api.isComplete();
      setState(response.data);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    }
  };

  return (
    <>
      {loading ? (
        <StyledSpinner>
          <RiseLoader
            sizeUnit={"px"}
            size={20}
            color={'rgb(14,115,100)'}
            loading={loading}
          />
        </StyledSpinner>
      ) : (
          <>
            {state && (
              <StyledContainer maxWidth="lg">
                <StyledGrid container spacing={5} alignItems="flex-end">
                  {(!state.exist && !state.active && state.complete) && (<CarnetList checkIsComplete={checkIsComplete} />)}
                  {(state.exist && state.active && state.complete) && <CarnetDetails />}
                </StyledGrid>
                {(!state.complete && !state.exist && !state.active) && (
                  <>
                    <StyledCardHeader
                      subheader="Musisz uzupełnić dane w profilu"
                      subheaderTypographyProps={{ align: 'center' }}
                    />
                    <StyledCardMedia
                      image={"./exclamation.png"}
                    />
                  </>)}
                {(state.exist && !state.active && state.complete) &&
                  (<>
                    <StyledCardHeader
                      subheader="Wybrano karnet. Musisz poczekać na aktywację przez administratora"
                      subheaderTypographyProps={{ align: 'center' }}
                    />
                    <StyledCardMedia
                      image={"./ok.png"}
                    />
                  </>)
                }
              </StyledContainer>
            )}
          </>
        )}
    </>
  );
}

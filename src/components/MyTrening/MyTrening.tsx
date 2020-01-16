import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import api from '../../api/treningApi';
import apiClient from '../../api/clientApi';
import { useTranslation } from 'react-i18next';
import Menu from './Menu';
import { CardHeader, CardMedia } from '@material-ui/core';
import styled from "styled-components";
import Container from "@material-ui/core/Container";

const StyledContainer = styled(Container)`
  padding-top: 64px;
  padding-bottom: 32px;
`;
const StyledCardMedia = styled(CardMedia)`
height: 180px;
width: 180px;
margin:auto;
border-radius:50%;
`;

interface ITrening {
  trainingID: string;
  title: string;
  type: any;
  start: Date;
  duration: any;
  quantity: number;
  count: number;
  trainer: {
    name: string;
    surname: string;
  }
}

export default function MyTrening() {
  const [value, setValue] = React.useState(0);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [gEvents, setGEvents] = useState<ITrening[]>([]);
  const [iEvents, setIEvents] = useState<ITrening[]>([]);
  const [mEvents, setMEvents] = useState<ITrening[]>([]);
  const [eventsDone, setEventsDone] = useState<ITrening[]>([]);
  const [flag, setFlag] = useState(true);
  const [hasCarnet, setCarnet] = useState();

  const changeFlag = () => {
    setFlag(!flag);
    update();
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  useEffect(() => {
    loadStatus();
    update();
  }, []);

  const update = () => {
    loadGroupTraining();
    loadIndividualTraining();
    loadMyTraining();
  }

  const loadStatus = async () => {
    const response = await apiClient.isComplete();
    if (response.data.active) {
      setCarnet(true);
    }
  }

  const loadGroupTraining = async () => {
    try {
      const response = await api.loadGroupTraining();
      setGEvents(response.data);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    }
  };

  const loadIndividualTraining = async () => {
    try {
      const response = await api.loadIndividualTraining();
      setIEvents(response.data);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    }
  };

  const loadMyTraining = async () => {
    try {
      const response = await api.loadMyTraining();
      setEventsDone([]);
      setMEvents([])
      split(response.data);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    }
  };

  const split = (data: ITrening[]) => {
    data.forEach(oneTraining => {
      if (new Date(oneTraining.start) < new Date()) {
        setEventsDone(oldArray => [...oldArray, {
          trainingID: oneTraining.trainingID,
          title: oneTraining.title,
          type: oneTraining.type,
          start: oneTraining.start,
          duration: oneTraining.duration,
          quantity: oneTraining.quantity,
          count: oneTraining.count,
          trainer: {
            name: oneTraining.trainer.name,
            surname: oneTraining.trainer.surname
          }
        }]);
      } else {
        setMEvents(oldArray => [...oldArray, {
          trainingID: oneTraining.trainingID,
          title: oneTraining.title,
          type: oneTraining.type,
          start: oneTraining.start,
          duration: oneTraining.duration,
          quantity: oneTraining.quantity,
          count: oneTraining.count,
          trainer: {
            name: oneTraining.trainer.name,
            surname: oneTraining.trainer.surname
          }
        }]);
      }
    });
  }

  return (
    <StyledContainer maxWidth="lg">
      {hasCarnet && (
        <Menu value={value} mEvents={mEvents} gEvents={gEvents} iEvents={iEvents} eventsDone={eventsDone} handleChange={handleChange} handleChangeIndex={handleChangeIndex} loadGroupTraining={loadGroupTraining} changeFlag={changeFlag} loadIndividualTraining={loadIndividualTraining} />

      )}
      {hasCarnet == false && (<>
        <CardHeader
          subheader="Musisz posiadać aktywny karnet"
          subheaderTypographyProps={{ align: 'center' }}
        />
        <StyledCardMedia
          image={"./exclamation.png"}
        />
      </>)
      }
    </StyledContainer>
  );
}


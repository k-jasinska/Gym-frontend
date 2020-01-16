import React, { useState, useEffect } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import './MyCalendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import { useSnackbar } from 'notistack';
import api from '../../api/trainerApi';
import AddTrainingModal from '../Modals/AddTrainingModal';

BigCalendar.momentLocalizer(moment);

const StyledContainer = styled(Container)`
  margin-top: 62px;
  padding-bottom: 32px;
`;

const StyledBigCalendar = styled(BigCalendar)`
cursor:pointer;
`;


const MyCalendar = () => {
  const [openSlot, setSlot] = useState(false);
  const [openEvent, setEvent] = useState(false);
  const [clickedEvent, setclickedEvent] = useState({});
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [desc, setDesc] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [training, setTraining] = useState([]);
  const [events, setEvents] = useState([]);


  useEffect(() => {
    getTrenings();
  }, []);

  const getTrenings = async () => {
    try {
      const response = await api.getTraining();
      setTraining(response.data);
      setEvents([]);
      response.data.forEach(oneTraining => {
        var hours = Number(oneTraining.duration.substring(0, 2));
        var minutes = Number(oneTraining.duration.substring(3, 5));
        var end = new Date(oneTraining.start);
        end.setMinutes(end.getMinutes() + minutes);
        end.setHours(end.getHours() + hours);

        setEvents(oldArray => [...oldArray, { title: oneTraining.title, start: new Date(oneTraining.start), end: end, resource: oneTraining.trainingID }]);
      });

    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    }
  };

  const handleSlotSelected = (slotInfo) => {
    setTitle("");
    setDesc("");
    setStart(slotInfo.start);
    setEnd(slotInfo.end);
    setSlot(true);
  }

  const handleClose = () => {
    setEvent(false);
    setSlot(false);
  }

  const handleEventSelected = (event) => {
    setEvent(true);
    setclickedEvent(event);
    setStart(event.start);
    setEnd(event.end);
    setTitle(event.title);
    setDesc(event.desc);
  }

  return (
    <StyledContainer maxWidth="lg">
      <div style={{ height: '500pt' }}>
        <StyledBigCalendar
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable={true}
          defaultDate={moment().toDate()}
          onSelectEvent={e => handleEventSelected(e)}
          onSelectSlot={slotInfo => handleSlotSelected(slotInfo)}
        />
      </div>
      <AddTrainingModal handleClose={handleClose} open={openSlot} getTrenings={getTrenings} />
    </StyledContainer>
  );
}

export default MyCalendar;

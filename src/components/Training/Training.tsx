import React, { useEffect, useState } from 'react';
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonIcon from '@material-ui/icons/Person';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import GroupsTrening from './GroupsTrening/GroupsTrening';
import IndividualTrening from './IndividualTrening/IndividualTrening';
import Drawer from '@material-ui/core/Drawer';
import Details from './Details';
import { RiseLoader } from 'react-spinners';
import api from '../../api/trainerApi';
import { useSnackbar } from 'notistack';


const StyledSpinner = styled.div`
height:70vh;
display: flex;
align-items: center;
justify-content: center;
`;

const StyledContainer = styled(Container)`
  padding-top: 64px;
  padding-bottom: 32px;
`;

const StyledDrawer = styled(Drawer)`
& .MuiDrawer-paper {
  position: fixed;
  top:64px;
  height:calc(100vh - 60px);
}
`;

const StyledSwipeableViews = styled(SwipeableViews)`
height:70vh;
overflow-y:scroll;
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
::-webkit-scrollbar-thumb {
  background: #888; 
}

::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
`;

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

interface ITrening {
  trainingID: string;
  title: string;
  type: any;
  start: Date;
  duration: any;
  quantity: number;
  count: number;
}

interface IndividualTrening {
  trainingID: string;
  title: string;
  start: Date;
  duration: any;
  quantity: number;
  count: number;
  name: string;
  surname: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

export default function Training() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const [details, setDetails] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [events, setGEvents] = useState<ITrening[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [eventsI, setIEvents] = useState<IndividualTrening[]>([]);


  useEffect(() => {
    loadGroupTraining();
    loadIndividualTraining();
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);


  const loadGroupTraining = async () => {
    try {
      const response = await api.loadGroupTraining(false);
      setGEvents(response.data);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    }
  };

  const loadIndividualTraining = async () => {
    try {
      const response = await api.loadIndividualTraining(false);
      setIEvents(response.data);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };


  const handleClick = async (event: React.MouseEvent<unknown>, treningId: string) => {
    setDetails(treningId);
    setOpen(true);
  };

  const handleClose = () => {
    setDetails("");
    setOpen(false);
  };

  return (
    <StyledContainer maxWidth="lg">
      <Paper square>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
        >
          <Tab icon={<PeopleAltIcon />} label="Treningi grupowe" />
          <Tab icon={<PersonIcon />} label="Trening indywidualny" />
        </Tabs>
      </Paper>
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
          <StyledSwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <GroupsTrening events={events} handleClick={handleClick} />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <IndividualTrening events={eventsI} />
            </TabPanel>
          </StyledSwipeableViews>
        )}
      <StyledDrawer
        variant="persistent"
        open={open}
        anchor="right"
        onClose={handleClose}
      >
        {open ? (
          <Details
            id={details}
            onCancel={handleClose}
          />
        ) : null}
      </StyledDrawer>
    </StyledContainer>);
}


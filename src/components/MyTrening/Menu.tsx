import React, { useEffect, useState } from 'react';
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import PersonIcon from '@material-ui/icons/Person';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import GroupsTrening from './GroupsTrening/GroupsTrening';
import IndividualTrening from './IndividualTrening/IndividualTrening';
import MyTaining from './MyTraining/MyTraining';
import { useTranslation } from 'react-i18next';
import { RiseLoader } from 'react-spinners';

const StyledSpinner = styled.div`
height:70vh;
display: flex;
align-items: center;
justify-content: center;
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

interface Props {
    value: any;
    gEvents: any;
    iEvents: any;
    eventsDone: any;
    mEvents: any;
    handleChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
    handleChangeIndex: (index: number) => void;
    loadGroupTraining: () => void;
    changeFlag: () => void;
    loadIndividualTraining: () => void;
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

export default function Menu(props: Props) {
    const theme = useTheme();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const { value, mEvents, gEvents, iEvents, eventsDone, handleChange, handleChangeIndex, loadGroupTraining, changeFlag, loadIndividualTraining } = props;


    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);


    return (
        <>
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
                    <Tab icon={<FeaturedPlayListIcon />} label="Twoje treningi" />
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
                            <GroupsTrening loadGroupTraining={loadGroupTraining} changeFlag={changeFlag} events={gEvents} />
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <IndividualTrening loadIndividualTraining={loadIndividualTraining} changeFlag={changeFlag} events={iEvents} />
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}>
                            <MyTaining mEvents={mEvents} eventsDone={eventsDone} changeFlag={changeFlag} />
                        </TabPanel>
                    </StyledSwipeableViews>
                )}
        </>);
}


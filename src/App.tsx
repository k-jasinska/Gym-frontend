import React, { Suspense, useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Trainers from "./components/Trainers/Trainers";
import Carnets from "./components/Carnets/Carnets";
import Statistics from "./components/Statistics/Statistics";
import Settings from "./components/Settings/Settings";
import Clients from "./components/Clients/Clients";

import MyCalendar from "./components/MyCalendar/MyCalendar";
import Training from "./components/Training/Training";
import MyCarnet from "./components/MyCarnet/MyCarnet";
import MyTrening from "./components/MyTrening/MyTrening";
import Profile from "./components/Profile/Profile";

import styled from "styled-components";
import { Menu } from "./components/Menu/Menu"
import { TopBar } from './components/TopBar/TopBar';
import api from './api/adminApi';
import { useSnackbar } from 'notistack';
import DashboardAdmin from "./components/DashboardAdmin/DashboardAdmin";
import DashboardTrainer from "./components/DashboardTrainer/DashboardTrainer";


const StyledRoot = styled.div`
  display: flex;
`;

const Main = styled.main`
  flex-grow: 1;
  height: 100vh;
  `;

const App: React.FC = () => {
  const [role, setRole] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function checkRole() {
      try {
        const response = await api.checkRole();
        setRole(response.data);
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: 'error'
        });
      }
    }
    checkRole();
  }, []);

  return (
    <Suspense fallback="loading">
      <BrowserRouter>
        <StyledRoot>
          <CssBaseline />
          <Menu role={role} />
          <Main>
            <TopBar />


            {role === "Admin" &&
              <>
                <Grid container spacing={3} />
                <Route exact path="/" component={Statistics} />
                <Route path="/Clients" component={Clients} />
                <Route path="/Trainers" component={Trainers} />
                <Route path="/Carnets" component={Carnets} />
                {/* <Route path="/Statistics" component={Statistics} /> */}
                <Route path="/Settings" component={Settings} />
              </>
            }
            {role === "Trainer" &&
              <>
                <Route exact path="/" component={DashboardTrainer} />
                <Grid container spacing={3} />
                <Route path="/MyCalendar" component={MyCalendar} />
                <Route path="/Training" component={Training} />
              </>
            }
            {role === "Client" &&
              <>
                <Route exact path="/" component={Dashboard} />
                <Grid container spacing={3} />
                <Route path="/MyCarnet" component={MyCarnet} />
                <Route path="/MyTrening" component={MyTrening} />
                <Route path="/Profile" component={Profile} />
              </>
            }
          </Main>
        </StyledRoot>
      </BrowserRouter>
    </Suspense>
  );
};
export default App;

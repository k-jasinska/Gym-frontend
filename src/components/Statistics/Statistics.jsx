import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Container from "@material-ui/core/Container";
import api from '../../api/adminApi';
import { useSnackbar } from 'notistack';
import {
  LastEntrances,
  AllClient,
  AllTrainer,
  AllCarnets,
  LatestSales,
  UsersByCarnets,
  LatestProducts,
  LatestOrders
} from './components/index';
import styled from "styled-components";
import { RiseLoader } from 'react-spinners';

const StyledSpinner = styled.div`
height:70vh;
display: flex;
align-items: center;
justify-content: center;
`;

const StyledContainer = styled(Container)`
padding-top:64px;
padding-bottom:32px;
  height:calc(100% - 40px);
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

const Statistics = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [statistics, setCountStatistics] = useState();
  const [flag, setFlag] = useState(false);
  const [carnets, setUsersByCarnets] = useState([{}]);
  const [chartData, setChartData] = useState([{}]);
  const [chartWeekData, setChartWeekData] = useState([{}]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const loadStatistics = () => {
    countStatistics();
    loadUsersByCarnets();
    loadChart();
    loadChartWeek();
  }
  const changeFlag = () => {
    setFlag(!flag);
  }

  const countStatistics = async () => {
    try {
      const response = await api.CountStatistics();
      setCountStatistics(response.data);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    }
  };

  const loadUsersByCarnets = async () => {
    try {
      const response = await api.UsersByCarnets();
      setUsersByCarnets(response.data);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    }
  };

  const loadChart = async () => {
    try {
      const response = await api.Chart();
      setChartData(response.data);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    }
  };

  const loadChartWeek = async () => {
    try {
      const response = await api.ChartWeek();
      setChartWeekData(response.data);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    }
  }

  return (
    <StyledContainer maxWidth="lg">
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
            {statistics && (
              <Grid
                container
                spacing={4}
              >
                <Grid
                  item
                  lg={3}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <LastEntrances value={statistics.lastEntrances} />
                </Grid>
                <Grid
                  item
                  lg={3}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <AllClient value={statistics.allClient} />
                </Grid>
                <Grid
                  item
                  lg={3}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <AllTrainer value={statistics.allTrainer} />
                </Grid>
                <Grid
                  item
                  lg={3}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <AllCarnets value={statistics.allCarnets} />
                </Grid>
                <Grid
                  item
                  lg={8}
                  md={12}
                  xl={9}
                  xs={12}
                >
                  <LatestSales changeFlag={changeFlag} chartData={flag ? chartData : chartWeekData} flag={flag} />
                </Grid>
                <Grid
                  item
                  lg={4}
                  md={6}
                  xl={3}
                  xs={12}
                >
                  <UsersByCarnets carnets={carnets} />
                </Grid>
                {/* <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders /> */}
                {/* </Grid> */}
              </Grid>
            )
            }
          </>)}
    </StyledContainer>
  );
};

export default Statistics;

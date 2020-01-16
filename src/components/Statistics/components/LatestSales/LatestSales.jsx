import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import theme from '../../../../theme';
import moment from "moment";

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestSales = props => {
  const { className, chartData, changeFlag, flag, ...rest } = props;
  const classes = useStyles();
  var time;
  var Month = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzzesień", "Październik", "Listopad", "Grudzień"];

  if (flag) {
    const timeAdd = chartData.reduce((a, o) => a.concat(o.month), [])
    time = timeAdd.map(t => Month[t - 1]);
  }
  else {
    const timeArr = chartData.reduce((a, o) => a.concat(o.day), [])
    time = timeArr.map(t => moment(t).format("DD-MM-YYYY"));
  };

  const data = {
    labels: time,
    datasets: [
      {
        label: "Liczba wejść",
        backgroundColor: theme.palette.primary.main,
        data: chartData.reduce((a, o) => a.concat(o.entranceCount), []),
      },
      {
        label: "Liczba treningnów indywidualnych",
        backgroundColor: theme.palette.secondary.main,
        data: chartData.reduce((a, o) => a.concat(o.individualCount), []),
      },
      {
        label: "Liczba trenibgnów grupowych",
        backgroundColor: theme.palette.neutral,
        data: chartData.reduce((a, o) => a.concat(o.groupCount), []),
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    legend: { display: false },
    cornerRadius: 20,
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      titleFontColor: theme.palette.text.secondary,
    },
    layout: { padding: 0 },
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
          }
        }
      ]
    }
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <Button
            color="primary"
            size="small"
            variant="text"
            onClick={changeFlag}
          >
            {flag ? "Rozkład tygodniowy" : "Rozkład miesięczny"}
            <ArrowRightIcon />
          </Button>
        }
        title="Dane porównawcze"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar
            data={data}
            options={options}
          />
        </div>
      </CardContent>
      <Divider />
    </Card>
  );
};

LatestSales.propTypes = {
  className: PropTypes.string
};

export default LatestSales;

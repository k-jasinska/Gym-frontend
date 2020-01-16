import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '250px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));

const UsersByCarnets = props => {
  const { className, carnets, ...rest } = props;
  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: carnets.reduce((a, o) => a.concat(o.countUsers), []),
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.error.main
        ],
        borderWidth: 8,
        hoverBorderColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.error.main
        ]
      }
    ],
    labels: carnets.reduce((a, o) => a.concat(o.carnetName), [])
  };

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
    }
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Rozkład karnetów"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut
            data={data}
            options={options}
          />
        </div>
        <div className={classes.stats}>
          {carnets.map(carnet => (
            <div
              key={carnet.carnetName}
              className={classes.device}
            >
              <Typography variant="body1">{carnet.carnetName}</Typography>
              <Typography
                variant="h4"
              >
                {carnet.percent}%
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

UsersByCarnets.propTypes = {
  className: PropTypes.string
};

export default UsersByCarnets;

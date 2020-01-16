import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ShowChart from '@material-ui/icons/ShowChart';
import BarChart from '@material-ui/icons/BarChart';
import CreditCard from '@material-ui/icons/CreditCard';
import Minimize from '@material-ui/icons/Minimize';
import Share from '@material-ui/icons/Share';
import AccessibilityNew from '@material-ui/icons/AccessibilityNew';
import CardMembership from '@material-ui/icons/CardMembership';
import Fingerprint from '@material-ui/icons/Fingerprint';
import Event from '@material-ui/icons/Event';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color:rgba(8,206,185,0.5);
  text-transform:uppercase;
  &.active {
    color: rgb(0,176,175);
  }
`;

const StyledListItemTextPrimary = styled(ListItemText)`
& >.MuiTypography-colorTextPrimary {
  color:rgba(8,206,185,0.5);
}
& >.MuiTypography-body1{
  font-size:0.85rem;
}
`;

const StyledListItemIcon = styled(ListItemIcon)`
  color:rgba(8,206,185,0.5);
`;

const StyledListItem = styled(ListItem)`
  color:rgba(8,206,185,0.5);
`;

const StyledListItemText = styled(ListItemText)`
& >.MuiTypography-colorTextSecondary {
  color:rgba(8,206,185,0.3);
}
& >.MuiTypography-body2{
  font-size:0.7rem;
}
`;

const StyledNestedListItem = styled(ListItem)`
  padding-left: 32px;
`;

interface Props {
  role: string;
}

export default function MenuItems(props: Props) {
  const { role } = props;
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(true);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <>
      {role === "Admin" &&
        <>
          <StyledNavLink exact to="/">
            <ListItem button>
              <StyledListItemIcon>
                <DashboardIcon />
              </StyledListItemIcon>
              <StyledListItemTextPrimary primary={t('menuItems.dashboard')} />
            </ListItem>
          </StyledNavLink>
          <StyledNavLink to="/Clients">
            <ListItem button>
              <StyledListItemIcon>
                <PeopleIcon />
              </StyledListItemIcon>
              <StyledListItemTextPrimary primary={t('menuItems.clients')} />
            </ListItem>
          </StyledNavLink>
          <StyledNavLink to="/Trainers">
            <ListItem button>
              <StyledListItemIcon>
                <PeopleIcon />
              </StyledListItemIcon>
              <StyledListItemTextPrimary primary={t('menuItems.trainers')} />
            </ListItem>
          </StyledNavLink>
          <StyledNavLink to="/Carnets">
            <ListItem button>
              <StyledListItemIcon>
                <CreditCard />
              </StyledListItemIcon>
              <StyledListItemTextPrimary primary={t('menuItems.carnets')} />
            </ListItem>
          </StyledNavLink>
          <Divider />
          <StyledListItem button onClick={handleClick}>
            <StyledListItemIcon>
              <Minimize />
            </StyledListItemIcon>
            <StyledListItemTextPrimary primary={t('menuItems.other')} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </StyledListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* <StyledNavLink to="/Statistics">
                <StyledNestedListItem button>
                  <StyledListItemIcon>
                    <ShowChart />
                  </StyledListItemIcon>
                  <StyledListItemText secondary={t('menuItems.statistics')} />
                </StyledNestedListItem>
              </StyledNavLink> */}

              <StyledNavLink to="/Settings">
                <StyledNestedListItem button>
                  <StyledListItemIcon>
                    <BarChart />
                  </StyledListItemIcon>
                  <StyledListItemText secondary={t('menuItems.settings')} />
                </StyledNestedListItem>
              </StyledNavLink>
            </List>
          </Collapse>
        </>
      }
      {role === "Trainer" &&
        <>
          <StyledNavLink exact to="/">
            <ListItem button>
              <StyledListItemIcon>
                <DashboardIcon />
              </StyledListItemIcon>
              <StyledListItemTextPrimary primary={t('menuItems.dashboard')} />
            </ListItem>
          </StyledNavLink>
          <StyledNavLink to="/MyCalendar">
            <ListItem button>
              <StyledListItemIcon>
                <Event />
              </StyledListItemIcon>
              <StyledListItemTextPrimary primary={t('menuItems.myCalendar')} />
            </ListItem>
          </StyledNavLink>
          <StyledNavLink to="/Training">
            <ListItem button>
              <StyledListItemIcon>
                <AccessibilityNew />
              </StyledListItemIcon>
              <StyledListItemTextPrimary primary={t('menuItems.training')} />
            </ListItem>
          </StyledNavLink>
        </>
      }

      {role === "Client" &&
        <>
          <StyledNavLink exact to="/">
            <ListItem button>
              <StyledListItemIcon>
                <DashboardIcon />
              </StyledListItemIcon>
              <StyledListItemTextPrimary primary={t('menuItems.dashboard')} />
            </ListItem>
          </StyledNavLink>
          <StyledNavLink to="/MyCarnet">
            <ListItem button>
              <StyledListItemIcon>
                <CardMembership />
              </StyledListItemIcon>
              <StyledListItemTextPrimary primary={t('menuItems.myCarnet')} />
            </ListItem>
          </StyledNavLink>
          <StyledNavLink to="/MyTrening">
            <ListItem button>
              <StyledListItemIcon>
                <AccessibilityNew />
              </StyledListItemIcon>
              <StyledListItemTextPrimary primary={t('menuItems.myTrening')} />
            </ListItem>
          </StyledNavLink>
          <StyledNavLink to="/Profile">
            <ListItem button>
              <StyledListItemIcon>
                <Fingerprint />
              </StyledListItemIcon>
              <StyledListItemTextPrimary primary={t('menuItems.profile')} />
            </ListItem>
          </StyledNavLink>
        </>
      }
    </>
  );
}

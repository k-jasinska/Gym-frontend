import React from 'react';
import styled from 'styled-components';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { logout } from '../../auth';
import { useTranslation } from 'react-i18next';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const StyledTitle = styled(Typography)`
  flex-grow: 1;
`;
const StyledAppBar = styled(AppBar)`
  position: relative;
  transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1), margin 225ms cubic-bezier(0.4, 0, 0.6, 1);
`;
const StyledToolbar = styled(Toolbar)`
  padding-right: 24px;
`;
const StyledButton = styled(Button)`
  color: inherit;
  text-decoration: none;
  text-transform: none;
`;
const StyledLogoutNavlink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
  padding-right: 5px;
  font-size: 1rem;
`;

export const TopBar = () => {
  const { t } = useTranslation();
  return (
    <StyledAppBar>
      <StyledToolbar>
        <Divider />
        <StyledTitle component="h1" variant="h6" color="inherit" noWrap>
          {t('dashboard.title')}
        </StyledTitle>
        <StyledButton onClick={logout}>
          <StyledLogoutNavlink to="/">{t('dashboard.logout')}</StyledLogoutNavlink>
          <ExitToApp />
        </StyledButton>
      </StyledToolbar>
    </StyledAppBar>
  );
};

import React from 'react';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuItems from '../MenuItems/MenuItems';
import Drawer from '@material-ui/core/Drawer';

const StyledDrawer = styled(Drawer) <{ open: boolean }>`
  & .MuiDrawer-paper {
    position: relative;
    z-index:100;
    white-space: nowrap;
    height: 100vh;
    background-color:#262C3D;
    width: ${props => (props.open ? '240px' : '72px')};
    overflow-x: ${props => (props.open ? 'visible' : 'hidden')};
    transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1);
  }
`;

const StyledToolbarIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 8px;
  background-color:#1E2435;
  min-height: 56px;
  @media (min-width: 0px) and (orientation: landscape) {
    min-height: 48;
  }
  @media (min-width: 600px) {
    min-height: 64px;
  }
`;

const StyledIconButton = styled(IconButton)`
color:rgba(8,206,185,0.5);
`;

interface Props {
  role: string;
}

export const Menu = (props: Props) => {
  const { role } = props;
  const [open, setOpen] = React.useState(true);

  return (
    <div>
      <StyledDrawer variant="permanent" open={open}>
        <StyledToolbarIcon>
          <StyledIconButton onClick={() => setOpen(!open)}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </StyledIconButton>
        </StyledToolbarIcon>
        <Divider />
        <List>
          <MenuItems role={role} />
        </List>
        <Divider />
      </StyledDrawer>
    </div>
  );
};

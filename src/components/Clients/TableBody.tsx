import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import CheckIcon from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import api from '../../api/adminApi';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";

const StyledTableRow = styled(TableRow)`
cursor:pointer;
`;

interface Personnel {
  personID: string;
  name: string;
  surname: string;
  address: string;
  contactData: string;
  email: string;
  login: string;
  profileComplete: boolean;
  exist: boolean;
  isActive: boolean;
}

interface TableProps {
  items: Personnel[];
  handleSelect: (event: React.MouseEvent<unknown>, name: string) => void;
  handleClick: (event: React.MouseEvent<unknown>, name: string) => void;
  loadClient: (row: number, page: number) => void;
  isSelected: (name: string) => boolean;
  isClicked: string;
}

export const TableRows = (props: TableProps) => {
  const { items, handleSelect, handleClick, isSelected, isClicked, loadClient } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();


  const renderRow = (row: Personnel, index: number) => {
    const isItemSelected = isSelected(row.personID);
    let isItemClicked = false;
    if (isClicked === row.personID) {
      isItemClicked = true;

    }
    const handleActiveClick = async (e: any, id: string) => {
      e.stopPropagation();
      try {
        await api.activeAccount(id);
        loadClient(10, 1);
        enqueueSnackbar(t('goodMessage.activateCarnet'), {
          variant: 'success'
        });
      }
      catch (error) {
        enqueueSnackbar(error.message, {
          variant: 'error'
        });
      };

    }

    const labelId = `enhanced-table-checkbox-${index}`;

    return (
      <StyledTableRow
        hover={true}
        onClick={event => handleClick(event, row.personID)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.personID}
        selected={isItemSelected || isItemClicked}>
        <TableCell padding="checkbox">
          <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} onClick={event => handleSelect(event, row.personID)} />
        </TableCell>
        <TableCell component="th" id={labelId} scope="row" padding="none">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.surname}</TableCell>
        <TableCell align="left">{row.address}</TableCell>
        <TableCell align="left">{row.contactData}</TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell align="left">{row.login}</TableCell>
        {row.profileComplete && row.exist && row.isActive && (
          <TableCell align="left"><CheckIcon /></TableCell>
        )}
        {row.profileComplete && row.exist && !row.isActive && (
          <TableCell align="left"><Button onClick={e => handleActiveClick(e, row.personID)} variant="outlined" color="secondary">
            Aktywuj
      </Button></TableCell>
        )}
        {(!row.profileComplete || (row.profileComplete && !row.exist)) && (
          <TableCell align="left"></TableCell>
        )}
      </StyledTableRow>
    );
  };

  return <TableBody>{items.map(renderRow)}</TableBody>;
};

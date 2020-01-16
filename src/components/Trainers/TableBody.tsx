import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

interface Personnel {
  personID: string;
  name: string;
  surname: string;
  address: string;
  contactData: string;
  email: string;
  login: string;
}

interface TableProps {
  items: Personnel[];
  handleClick: (event: React.MouseEvent<unknown>, name: string) => void;
  isSelected: (name: string) => boolean;
}

export const TableRows = (props: TableProps) => {
  const { items, handleClick, isSelected } = props;

  const renderRow = (row: Personnel, index: number) => {
    const isItemSelected = isSelected(row.personID);
    const labelId = `enhanced-table-checkbox-${index}`;

    return (
      <TableRow
        hover={true}
        onClick={event => handleClick(event, row.personID)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.personID}
        selected={isItemSelected}>
        <TableCell padding="checkbox">
          <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
        </TableCell>
        <TableCell component="th" id={labelId} scope="row" padding="none">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.surname}</TableCell>
        <TableCell align="left">{row.address}</TableCell>
        <TableCell align="left">{row.contactData}</TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell align="left">{row.login}</TableCell>
      </TableRow>
    );
  };

  return <TableBody>{items.map(renderRow)}</TableBody>;
};

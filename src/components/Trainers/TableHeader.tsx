import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import { useTranslation } from 'react-i18next';

const personnel = ['name', 'surname', 'address', 'contactData', 'email', 'login'];

export const TableHeader = () => {
  const { t } = useTranslation();

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {personnel.map(row => (
          <TableCell key={row} align="left" padding="default">
            {t(`trainers.${row}`)}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

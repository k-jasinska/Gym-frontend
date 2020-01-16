import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import { useTranslation } from 'react-i18next';

const personnel = ['price', 'name', 'duration', 'sale']

const TableHeader = () => {
    const { t } = useTranslation();

    return (
        <TableHead>
            <TableRow>
                {personnel.map(row => (
                    <TableCell key={row} align="left" padding="default">
                        {t(`carnets.${row}`)}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};
export default TableHeader;
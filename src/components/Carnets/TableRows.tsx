import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

interface Carnet {
    carnetTypeID: string;
    price: number;
    name: string;
    duration: number;
    count: number;
}

interface TableProps {
    items: Carnet[];
}

const TableRows = (props: TableProps) => {
    const { items } = props;

    const renderRow = (row: Carnet, index: number) => {
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
            <TableRow
                hover={true}
                key={row.carnetTypeID}>
                <TableCell align="left">{row.price} zł</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.duration}</TableCell>
                <TableCell align="left">{row.count}</TableCell>

            </TableRow>
        );
    };

    return <TableBody>{items.map(renderRow)}</TableBody>;
};
export default TableRows;
import React, { useEffect, useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { useTranslation } from 'react-i18next';
import { TableToolbar } from './TableToolbar';
import { TableHeader } from './TableHeader';
import api from '../../api/adminApi';
import { TableRows } from './TableBody';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { useSnackbar } from 'notistack';
import Container from "@material-ui/core/Container";

const StyledContainer = styled(Container)`
  padding-top: 32px;
  padding-bottom: 32px;
`;

const StyledTable = styled(Table)`
  min-width: 750px;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const StyledRoot = styled.div`
  width: 100%;
  margin-top: 24px;
`;

const StyledPaper = styled(Paper)`
  width: 100%;
  margin-bottom: 16px;
`;

interface Personnel {
  personID: string;
  name: string;
  surname: string;
  address: string;
  contactData: string;
  email: string;
  login: string;
}

function EnhancedTable() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [items, setTrainer] = useState<Personnel[]>([]);
  const isSelected = (name: string) => selected.includes(name);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    loadTrainer(5, 1);
  }, []);

  const loadTrainer = async (rowsPerPage: number, page: number) => {
    try {
      const response = await api.getItems(rowsPerPage, page, "Trainers");
      setTrainer(response.data.items);
      setTotalCount(response.data.totalCount);
      setPage(response.data.page);
      setRowsPerPage(response.data.rowsPerPage);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    }
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    let newSelected: string[] = [];
    const selectedIndex = selected.indexOf(name);
    if (!selected.includes(name)) {
      newSelected = newSelected.concat(selected, name);
    } else {
      newSelected = selected.filter((x, i) => i !== selectedIndex);
    }
    setSelected(newSelected);
  };

  const handleChangePage = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage + 1);
    await loadTrainer(rowsPerPage, newPage + 1);
  };

  const handleChangeRowsPerPage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await loadTrainer(+event.target.value, 1);
  };

  return (
    <StyledContainer maxWidth="lg">
      <StyledRoot>
        <StyledPaper>
          <TableToolbar numSelected={selected.length} loadPersonnel={loadTrainer} />
          <TableWrapper>
            <StyledTable aria-labelledby="tableTitle" size="medium">
              <TableHeader />
              <TableRows items={items} handleClick={handleClick} isSelected={isSelected} />
            </StyledTable>
          </TableWrapper>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            backIconButtonProps={{ 'aria-label': t('table.nextPage') }}
            nextIconButtonProps={{ 'aria-label': t('table.nextPage') }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelRowsPerPage={t('table.rowsPerPage')}
          />
        </StyledPaper>
      </StyledRoot>
    </StyledContainer>
  );
}

export default EnhancedTable;

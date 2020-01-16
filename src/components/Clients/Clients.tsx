import React, { useEffect, useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { useTranslation } from 'react-i18next';
import { TableToolbar } from './TableToolbar';
import { TableHeader } from './TableHeader';
import api from '../../api/adminApi';
import { TableRows } from './TableBody';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import { useSnackbar } from 'notistack';
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import Drawer from '@material-ui/core/Drawer';
import Details from "./Details";

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
  display:flex;
  margin-top: 24px;
`;

const StyledPaper = styled(Paper)`
  flex-grow:1;
  margin-bottom: 16px;
`;

const StyledDrawer = styled(Drawer)`
& .MuiDrawer-paper {
  position: fixed;
  top:64px;
  height:calc(100vh - 60px);
}
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


function EnhancedTable() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [items, setClients] = useState<Personnel[]>([]);
  const isSelected = (name: string) => selected.includes(name);
  const { enqueueSnackbar } = useSnackbar();
  const [details, setDetails] = useState<string>("");
  const [open, setOpen] = useState(false);


  useEffect(() => {
    loadClient(10, 1);
  }, []);

  const loadClient = async (rowsPerPage: number, page: number) => {
    try {
      const response = await api.getItems(rowsPerPage, page, "Clients");
      console.log(response.data.items)
      setClients(response.data.items);
      setTotalCount(response.data.totalCount);
      setPage(response.data.page);
      setRowsPerPage(response.data.rowsPerPage);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    }
  };


  const handleSearchChange = async (e: any) => {
    try {
      if (e.target.value == "") {
        var response = await api.getItems(rowsPerPage, page, "Clients");
      }
      else {
        var response = await api.search(rowsPerPage, page, e.target.value, "Clients");
      }
      setClients(response.data.items);
      setTotalCount(response.data.totalCount);
      setPage(response.data.page);
      setRowsPerPage(response.data.rowsPerPage);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    }
  };

  const handleDelete = async () => {
    try {
      await api.deleteItems(selected);
      loadClient(10, 1);
      setSelected([]);
      enqueueSnackbar(t('goodMessage.deleteItems'), {
        variant: 'success'
    });
    }
    catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    };
  }

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    if (details == name) {
      setDetails("");
      handleClose();
    }
    else {
      setDetails(name);
      setOpen(true);
    }
  };

  const handleSelect = (event: React.MouseEvent<unknown>, name: string) => {
    event.stopPropagation();
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
    await loadClient(rowsPerPage, newPage + 1);
  };

  const handleChangeRowsPerPage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await loadClient(+event.target.value, 1);
  };

  const handleClose = () => {
    setDetails("");
    setOpen(false);
  };

  return (
    <StyledContainer maxWidth="lg">
      <StyledRoot>
        <StyledPaper>
          <TableToolbar numSelected={selected.length} selected={selected} loadPersonnel={loadClient} handleSearchChange={handleSearchChange} handleDelete={handleDelete} />
          <TableWrapper>
            <StyledTable aria-labelledby="tableTitle" size="medium">
              <TableHeader />
              <TableRows loadClient={loadClient} items={items} handleClick={handleClick} isSelected={isSelected} handleSelect={handleSelect} isClicked={details} />
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

        <StyledDrawer
          variant="persistent"
          open={open}
          anchor="right"
          onClose={handleClose}
        >
          {open ? (
            <Details
              id={details}
              onCancel={handleClose}
            />
          ) : null}
        </StyledDrawer>

      </StyledRoot>
    </StyledContainer>
  );
}

export default EnhancedTable;

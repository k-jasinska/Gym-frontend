import React, { useEffect, useState } from 'react';
import { Container, CardContent, Card, Table, Paper } from "@material-ui/core";
import styled from "styled-components";
import AddCarnetForm from '../Forms/AddCarnetForm/AddCarnetForm'
import api from '../../api/carnetApi';
import { useSnackbar } from 'notistack';
import { useTranslation } from "react-i18next";
import TableHeader from './TableHeader'
import TableRows from './TableRows'

const StyledContainer = styled(Container)`
  padding-top: 32px;
  padding-bottom: 32px;
  display:flex;
`;

const StyledCard = styled(Card)`
  margin-top: 32px;
  margin-bottom: 32px;
  width:500px;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;


const StyledRoot = styled.div`
flex-grow:1;
  display:flex;
  margin: 32px;
`;

const StyledPaper = styled(Paper)`
  flex-grow:1;
`;

interface Carnet {
  carnetTypeID: string;
  price: number;
  name: string;
  duration: number;
  count: number;
}


function EnhancedTable() {
  const [items, setCarnets] = useState<Carnet[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  useEffect(() => {
    loadCarnets();
  }, []);

  const loadCarnets = async () => {
    try {
      const response = await api.getTypes();
      setCarnets(response.data);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    }
  };

  return (
    <StyledContainer maxWidth="lg">
      <StyledCard>
        <CardContent>
          <AddCarnetForm getCarnet={loadCarnets} />
        </CardContent>
      </StyledCard>

      <StyledRoot>
        <StyledPaper>
          <TableWrapper>
            <Table aria-labelledby="tableTitle" size="medium">
              <TableHeader />
              <TableRows items={items} />
            </Table>
          </TableWrapper>
        </StyledPaper>
      </StyledRoot>
    </StyledContainer>
  );
}

export default EnhancedTable;
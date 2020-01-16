import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { useTranslation } from 'react-i18next';
import { SearchBar } from './SearchBar';
import styled from 'styled-components';
import AddClientModal from '../Modals/AddClientModal';
import EditClientModal from '../Modals/EditClientModal';


const StyledActions = styled.div`
  color: ${props => props.theme.palette.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface TableProps {
  numSelected: number;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => Promise<void>;
  loadPersonnel: (rowsPerPage: number, page: number) => Promise<void>;
  handleDelete: () => Promise<void>;
  selected: any;
}

export const ActionBar = (props: TableProps) => {
  const { t } = useTranslation();
  const { numSelected, loadPersonnel, handleSearchChange, handleDelete, selected } = props;

  return (
    <StyledActions>
      {numSelected > 0 ? (
        <>
          {numSelected === 1 && (
            <>
              <EditClientModal loadPersonnel={loadPersonnel} selected={selected[0]} />
            </>
          )}

          <Tooltip title={t('table.delete')}>
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
          <>
            <SearchBar handleSearchChange={handleSearchChange} />
            <AddClientModal loadPersonnel={loadPersonnel} />
          </>
        )}
    </StyledActions>
  );
};

import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { useTranslation } from 'react-i18next';
import Edit from '@material-ui/icons/Edit';
import Block from '@material-ui/icons/Block';
import { SearchBar } from './SearchBar';
import styled from 'styled-components';
import AddTrainerModal from '../Modals/AddTrainerModal';

const StyledActions = styled.div`
  color: ${props => props.theme.palette.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface TableProps {
  numSelected: number;
  loadPersonnel: (rowsPerPage: number, page: number) => Promise<void>;
}

export const ActionBar = (props: TableProps) => {
  const { t } = useTranslation();
  const { numSelected, loadPersonnel } = props;

  return (
    <StyledActions>
      {numSelected > 0 ? (
        <>
          {numSelected === 1 && (
            <>
              <Tooltip title={t('table.edit')}>
                <IconButton aria-label="edit">
                  <Edit />
                </IconButton>
              </Tooltip>
            </>
          )}

          <Tooltip title={t('table.delete')}>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
          <>
            <SearchBar />
            <AddTrainerModal loadPersonnel={loadPersonnel} />
          </>
        )}
    </StyledActions>
  );
};

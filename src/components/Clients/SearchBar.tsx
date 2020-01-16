import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { useTranslation } from 'react-i18next';
import InputBase from '@material-ui/core/InputBase';
import styled from 'styled-components';

const StyledSearch = styled.div`
  position: relative;
  border-radius: 5px;
  background-color: #f5f5f5;
  display: flex;
  height: 40px;
  min-width: 200px;
  transition: min-width 200ms ease-in-out;
  &:hover {
    min-width: 240px;
  }
`;

const StyledIconSearch = styled.div`
  width: 56px;
  height: 100%;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledInputBase = styled(InputBase)`
  color: inherit;
  padding: 4px 4px 4px 0px;
  width: 144px;
  transition: width 200ms ease-in-out;
  height: 100%;
  &:hover {
    width: 184px;
  }
  &.Mui-focused {
    width: 184px;
  }
`;

interface Props {
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => Promise<void>;
}

export const SearchBar = (props: Props) => {
  const { t } = useTranslation();
  const { handleSearchChange } = props;

  return (
    <StyledSearch>
      <StyledIconSearch>
        <SearchIcon />
      </StyledIconSearch>
      <StyledInputBase placeholder={t('table.search')} inputProps={{ 'aria-label': 'search' }} onChange={handleSearchChange} />
    </StyledSearch>
  );
};

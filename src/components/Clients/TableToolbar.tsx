import React from "react";
import { ActionBar } from "./ActionBar";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import Toolbar from "@material-ui/core/Toolbar";
import styled, { css } from "styled-components";
import { lighten } from "@material-ui/core/styles";

const StyledSpacer = styled.div`
  flex: 1 1 100%;
`;

const StyledTitle = styled.div`
  flex: 0 0 auto;
`;

const StyledToolbar = styled(Toolbar) <{ selected: number }>`
  padding-left: 16px;
  padding-right: 8px;
  ${props =>
    props.selected &&
    css`
      color: ${props => props.theme.palette.text.primary};
      background-color: ${props =>
        lighten(props.theme.palette.secondary.light, 0.5)};
    `}
`;

interface TableToolbarProps {
  numSelected: number;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => Promise<void>;
  loadPersonnel: (rowsPerPage: number, page: number) => Promise<void>;
  handleDelete: () => Promise<void>;
  selected: string[];
}

export const TableToolbar = (props: TableToolbarProps) => {
  const { numSelected, loadPersonnel, selected, handleSearchChange, handleDelete } = props;
  const { t } = useTranslation();
  return (
    <StyledToolbar selected={numSelected}>
      <StyledTitle>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected}
            {t("table.selected")}
          </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
              {t("menuItems.clients")}
            </Typography>
          )}
      </StyledTitle>
      <StyledSpacer />
      <ActionBar numSelected={numSelected} selected={selected} loadPersonnel={loadPersonnel} handleSearchChange={handleSearchChange} handleDelete={handleDelete} />
    </StyledToolbar>
  );
};
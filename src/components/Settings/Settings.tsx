import React from "react";
import Container from "@material-ui/core/Container";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  padding-top: 32px;
  padding-bottom: 32px;
`;
export default function Settings() {
    return (<StyledContainer maxWidth="lg"><div>ustawienia</div></StyledContainer>);
}
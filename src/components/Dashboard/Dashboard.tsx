import React, { useEffect, useState } from "react";
import ProfileCard from "../ProfileCard/ProfileCard"
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import AccountDetails from './AccountDetails/AccountDetails';
import CarnetDetails from "./CarnetDetails/CarnetDetails";
import { useSnackbar } from 'notistack';
import api from '../../api/clientApi';

const StyledRoot = styled.div`
  display: flex;
`;

const Main = styled.main`
  flex-grow: 1;
  height: calc(100vh - 64px);
  `;

const StyledContainer = styled(Container)`
  padding-top: 32px;
  padding-bottom: 32px;
`;

interface Details {
  name: string;
  surname: string;
  email: string;
  contactData: any;
  sex: any;
  address: string;
  profileComplete: boolean;
  carnets: [{
    type: Type;
    isActive: boolean;
    dateEnd: any;
    dateStart: any;
  }]
}
interface Type {
  duration: number;
  name: string;
  price: number;
}

export default function Dashboard() {
  const { enqueueSnackbar } = useSnackbar();

  const [items, setDetails] = useState<Details>({
    name: "",
    surname: "",
    email: "",
    contactData: null,
    sex: "",
    address: "",
    profileComplete: false,
    carnets: [{
      type: {
        duration: 0,
        name: "",
        price: 0
      },
      isActive: false,
      dateStart: "",
      dateEnd: ""
    }]
  });

  useEffect(() => {
    loadCarnets();
  }, []);

  const loadCarnets = async () => {
    try {
      const response = await api.getDetails();
      setDetails(response.data);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    }
  };

  return (
    <StyledRoot>
      <ProfileCard name={items.name} surname={items.surname} profileComplete={items.profileComplete} sex={items.sex} isActive={items.carnets.length ? items.carnets[0].isActive : false} />
      <Main>
        <StyledContainer maxWidth="lg">
          <AccountDetails items={items} />
          <CarnetDetails items={items.carnets} />
        </StyledContainer>
      </Main>
    </StyledRoot >
  );
}
import React, { useEffect, useState } from "react";
import ProfileCard from "../ProfileCard/ProfileCard"
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import AccountDetails from './AccountDetails';
import TrainingDetails from './TrainingDetails';
import { useSnackbar } from 'notistack';
import api from '../../api/trainerApi';

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

interface TDetails {
    name: string;
    surname: string;
    email: string;
    contactData: any;
    address: any;
    profileComplete: boolean;
    training: [{
        trainingID: string;
        title: string;
        type: any;
        start: Date;
        duration: any;
        quantity: any;
        count: number;
    }]
}

export default function DashboardTrainer() {
    const { enqueueSnackbar } = useSnackbar();

    const [items, setDetails] = useState<TDetails>({
        name: "",
        surname: "",
        email: "",
        contactData: null,
        address: "",
        profileComplete: false,
        training: [{
            trainingID: "",
            title: "",
            type: null,
            start: new Date,
            duration: null,
            quantity: null,
            count: 0
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
            {/* <ProfileCard name={items.name} surname={items.surname} profileComplete={items.profileComplete} sex={items.sex} /> */}
            <Main>
                <StyledContainer maxWidth="lg">
                    <AccountDetails items={items} />


                    {items.training.length ? <TrainingDetails items={items.training} /> : "Brak utworzonych treningów"}

                </StyledContainer>
            </Main>
        </StyledRoot >
    );
}
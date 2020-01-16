import React, { useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, Theme } from "@material-ui/core/styles";
import styled from "styled-components";
import { useSnackbar } from 'notistack';
import api from '../../api/trainerApi';
import { Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';

const StyledRoot = styled.div`
background: rgb(150,190,181);
background: linear-gradient(331deg, rgba(150,190,181,1) 0%, rgba(216,230,227,1) 37%, rgba(236,246,243,1) 100%);
height:100%;
`;


const StyledScroll = styled.div`
max-height:80vh;
overflow-y:scroll;
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
::-webkit-scrollbar-thumb {
  background: #888; 
}

::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
`;

const styles = makeStyles((theme: Theme) => ({
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '1em',
    },
    form: {
        [theme.breakpoints.up('xs')]: {
            width: 400,
        },
        [theme.breakpoints.down('xs')]: {
            width: '100vw',
            marginTop: -30,
        },
    },
}));

interface Props {
    id: string;
    onCancel: () => void;
}
interface People {
    name: string;
    surname: string;
}

const Details = (props: Props) => {
    const [people, setPeople] = useState<People[]>([]);
    const { id, onCancel } = props;
    const classes = styles();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        loadPersonList();
    }, []);


    const loadPersonList = async () => {
        try {
            const response = await api.loadPersonList(id);
            setPeople(response.data);
        } catch (error) {
            enqueueSnackbar(error.message, {
                variant: 'error'
            });
        }
    };

    return (
        <StyledRoot>
            <div className={classes.title}>
                <Typography variant="h5" gutterBottom>
                    Lista uczestników
                </Typography>
                <IconButton onClick={onCancel}>
                    <CloseIcon />
                </IconButton>
            </div>
            <StyledScroll className={classes.form}>
                {people.map(item => (

                    <>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.name + " " + item.surname} />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </List>

                    </>
                ))}
            </StyledScroll>
        </StyledRoot >
    );
}

export default Details;

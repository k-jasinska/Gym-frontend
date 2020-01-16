import React, { useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, Theme } from "@material-ui/core/styles";
import styled from "styled-components";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider, Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import api from '../../api/clientApi';
import moment from "moment";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const StyledDiv = styled.div`
margin-top: 12px;
padding:20px;
`;

const StyledDates = styled.div`
max-height:300px;
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

const StyledRoot = styled.div`
background: rgb(150,190,181);
background: linear-gradient(331deg, rgba(150,190,181,1) 0%, rgba(216,230,227,1) 37%, rgba(236,246,243,1) 100%);
height:100%;
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

interface Entrance {
    carnetId: any;
    dates: Date[];
    type: any;
    dateStart: Date;
    dateEnd: Date;
}

interface Props {
    id: string;
    onCancel: () => void;
}
const Details = (props: Props) => {
    const { id, onCancel } = props;
    const classes = styles();
    const { enqueueSnackbar } = useSnackbar();
    const [entrance, setEntrance] = useState<Entrance>();
    const [exist, setExist] = useState<boolean>(false);


    useEffect(() => {
        loadStatus();
    }, []);


    const loadStatus = async () => {
        const response = await api.isCompleteById(id);
        if (response.data.active || response.data.exist) {
            loadPersonList();
        }
        else {
            setExist(true);
        }
    }

    const loadPersonList = async () => {
        try {
            const response = await api.loadEntrance(id);
            setEntrance(response.data);
        } catch (error) {
            enqueueSnackbar(error.message, {
                variant: 'error'
            });
        }
    };

    const handleClick = async () => {
        try {
            if (entrance) {
                let id = entrance.carnetId;
                await api.createEntrance({ id });
                loadPersonList();
            }
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
                    Daty wejść:
                </Typography>
                <IconButton onClick={onCancel}>
                    <CloseIcon />
                </IconButton>
            </div>
            <div className={classes.form}>
                <StyledDates>
                    {entrance && entrance.dates.map((item: Date) => (
                        <>
                            <List >
                                <ListItem>
                                    <ListItemText primary={moment(item).format("DD.MM.YYYY HH:mm")} />
                                </ListItem>
                                <Divider />
                            </List>
                        </>
                    ))}
                </StyledDates>
                {entrance && (
                    <>
                        <StyledDiv>
                            <Typography variant="h6">
                                Informacje o karnecie:
                </Typography>
                            <Box my={2}>
                                <Typography variant="caption" display="block" gutterBottom> Typ karnetu:  </Typography>
                                <Typography variant="button" component="div">
                                    <Box mt={1} fontWeight="fontWeightBold">
                                        {entrance.type.name}
                                    </Box>
                                </Typography>
                            </Box>

                            {new Date() < new Date(entrance.dateEnd) ? (
                                <>
                                    <Box my={2}>
                                        <Typography variant="caption" display="block" gutterBottom> Data rozpoczęcia:  </Typography>
                                        <Typography variant="button" component="div">
                                            <Box mt={1} fontWeight="fontWeightBold">
                                                {moment(entrance.dateStart).format("YYYY-MM-DD")}
                                            </Box>
                                        </Typography>
                                    </Box>
                                    <Box my={2}>
                                        <Typography variant="caption" display="block" gutterBottom> Data wygaśnięcia:  </Typography>
                                        <Typography variant="button" component="div">
                                            <Box mt={1} fontWeight="fontWeightBold">
                                                {moment(entrance.dateEnd).format("YYYY-MM-DD")}
                                            </Box>
                                        </Typography>
                                    </Box>
                                    <Divider />
                                    <Box my={2}>
                                        <Button variant="outlined" color="primary" onClick={handleClick}>
                                            Dodaj wejście
                        </Button>
                                    </Box>
                                </>) :
                                <Typography variant="caption" display="block" gutterBottom>Nie aktywowano karnetu  </Typography>
                            }
                        </StyledDiv>
                    </>
                )
                }

                {exist && (<StyledDiv><Typography variant="caption" display="block" gutterBottom>Nie wybrano żadnego karnetu  </Typography></StyledDiv>)}
            </div>
        </StyledRoot>
    );
}

export default Details;

import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    Typography,
    TextField,
    Box
} from '@material-ui/core';

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
    }]
}

interface Type {
    duration: number;
    name: string;
    price: number;
}

interface Props {
    items: Details;
}

const AccountDetails = (props: Props) => {
    const { items } = props;
    const [redirect, setRedirect] = useState<boolean>(false);
    console.log(items)
    function handleClick() {
        setRedirect(true);
    }

    return (
        <Card>
            <CardHeader
                title="Twoje dane"
            />
            <Divider />
            <CardContent>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        md={6}
                        xs={12} >
                        <Typography variant="caption" display="block" gutterBottom>Imię:</Typography>
                        <Typography variant="button" component="div">
                            <Box fontWeight="fontWeightBold">
                                {items.name}
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <Typography variant="caption" display="block" gutterBottom>Nazwisko:</Typography>
                        <Typography variant="button" component="div">
                            <Box fontWeight="fontWeightBold">
                                {items.surname}
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <Typography variant="caption" display="block" gutterBottom>E-mail:</Typography>
                        <Typography variant="button" component="div">
                            <Box fontWeight="fontWeightBold">
                                {items.email}
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <Typography variant="caption" display="block" gutterBottom>Nr Tel:</Typography>
                        <Typography variant="button" component="div">
                            <Box fontWeight="fontWeightBold">
                                {items.contactData ? <>{items.contactData}</> : <>-</>}
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <Typography variant="caption" display="block" gutterBottom>Płeć:</Typography>
                        <Typography variant="button" component="div">
                            <Box fontWeight="fontWeightBold">
                                {items.sex === 0 && <>Mężczyzna</>}
                                {items.sex === 1 && <>Kobieta</>}
                                {(items.sex !== 0 && items.sex !== 1) && <>-</>}
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <Typography variant="caption" display="block" gutterBottom>Adres:</Typography>
                        <Typography variant="button" component="div">
                            <Box fontWeight="fontWeightBold">
                                {items.address ? <>{items.address}</> : <>-</>}
                            </Box>
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <Divider />
            <CardActions>
                <Button
                    color="primary"
                    variant="outlined"
                    onClick={handleClick}
                >
                    Uzupełnij dane w profilu
          </Button>
            </CardActions>
            {redirect && <Redirect to="/Profile" />}
        </Card >
    );
};

export default AccountDetails;

import React from "react";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import styled from "styled-components";
import moment from "moment";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';


const StyledCard = styled(Card)`
  margin-top: 32px;
  margin-bottom: 32px;
`;

interface Details {
    trainingID: string;
    title: string;
    type: any;
    start: Date;
    duration: any;
    quantity: any;
    count: number;
}

interface Props {
    items: Details[];
}

const TrainingDetails = (props: Props) => {
    const { items } = props;

    const renderRow = (item: Details, index: number) => {

        return (

            <Grid item key={item.title} xs={4} sm={4} md={4}>
                <Card>
                    <CardHeader
                        title={item.title}
                        titleTypographyProps={{ align: 'center' }}
                        subheaderTypographyProps={{ align: 'center' }}
                    />
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={6} >
                                <Typography variant="caption" display="block" gutterBottom>Typ:</Typography>
                                <Typography variant="button" component="div">
                                    <Box fontWeight="fontWeightBold">
                                        {item.type}
                                    </Box>
                                </Typography>
                                <Typography variant="caption" display="block" gutterBottom> Data:</Typography>
                                <Typography variant="button" component="div">
                                    <Box fontWeight="fontWeightBold">
                                        {moment(item.start).format("YYYY-MM-DD")}
                                    </Box>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <Typography variant="caption" display="block" gutterBottom>Czas trwania: </Typography>
                                <Typography variant="button" component="div">
                                    <Box fontWeight="fontWeightBold">
                                        {item.duration}
                                    </Box>
                                </Typography>
                                <Typography variant="caption" display="block" gutterBottom> Ilość miejsc:  </Typography>
                                <Typography variant="button" component="div">
                                    <Box fontWeight="fontWeightBold">
                                        {item.quantity}
                                    </Box>
                                </Typography>
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>
            </Grid>

        );
    };

    return (<>
        <CardHeader title="Najbliższe treningi" />
        <Grid container spacing={3}>
            {items.map(renderRow)}
        </Grid>
    </>)
}

export default TrainingDetails;
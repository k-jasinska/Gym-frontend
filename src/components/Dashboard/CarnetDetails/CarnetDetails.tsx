import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import styled from "styled-components";
var moment = require('moment');

const StyledCard = styled(Card)`
  margin-top: 32px;
  margin-bottom: 32px;
`;

interface Details {
    type: Type;
    isActive: boolean;
    dateEnd: any;
    dateStart: any;

}

interface Type {
    duration: number;
    name: string;
    price: number;
}

interface Props {
    items: Details[];
}


const CarnetDetails = (props: Props) => {
    const { items } = props;

    let carnet = items.map((item: any) => (
        <div key={item.dateStart}><Typography variant="subtitle1" color="textPrimary" align="center">
            {item.type.name}
        </Typography>
            {item.isActive ?
                (<>
                    <Typography color="textSecondary" variant="subtitle1" align="center" >
                        Ważność od: {moment(item.dateStart).format("DD-MM-YYYY")}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle1" align="center" >
                        Wygasa: {moment(item.dateEnd).format("DD-MM-YYYY")}
                    </Typography>
                </>) :
                <Typography color="textSecondary" variant="subtitle1" align="center" >
                    Karnet nie został jeszcze aktywowany
                              </Typography>
            }
        </div>)
    )

    return (
        <StyledCard>
            <CardHeader
                title="Typ karnetu"
            />
            <CardContent>
                {items.length ? carnet : (
                    <Typography variant="subtitle1" color="textPrimary" align="center">
                        Nie posiadasz aktywnego karnetu
</Typography>
                )}

            </CardContent>
        </StyledCard>
    );
}

export default CarnetDetails;
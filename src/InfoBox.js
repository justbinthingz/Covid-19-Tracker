import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './InfoBox.css'
import CountUp from 'react-countup';

const InfoBox = ({ title, cases, active, infoType, total, ...props }) => {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && "infoBox-selected-" + infoType}`}>
            <CardContent>
                <Typography className="infoBox_title" color="textSecondary">{title} </Typography>
                <h2 className={`${"infoBox-font-" + infoType}`}>
                    {cases}  Today</h2>
                <Typography className="infoBox_total" color="textSecondary">{total} Total {infoType}</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox

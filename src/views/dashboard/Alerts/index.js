import React, { useState } from 'react'
import { useNavigate } from "react-router";
import { Card, CardContent, IconButton, Grid, Collapse, Typography, Box } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import ReactApexChart from 'react-apexcharts';

const MOCKED_ALERTS = [
    {
        title: "Kitchen",
        description: "This is the kitchen",
        downtime: 1000,
        series: [{
            name: 'Consumption',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        }]
    },
    {
        title: "Living Room",
        description: "This is the living room", 
        downtime: 300,
        series: [{
            name: 'Consumption',
            data: [0, 2, 4, 6, 8, 10, 12, 14, 16],
        }]

    },
    {
        title: "Bedroom",
        description: "This is the bedroom",
        downtime: 200,
        series: [{
            name: 'Consumption',
            data: [1, 3, 5, 7, 9, 11, 13, 15, 17], 
        }]
    },
]


const CollapsibleRow = ({ title, description, downtime, series }) => {
    const [open, setOpen] = useState(false);

    const options = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
            enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Consumption by sensor',
            align: 'left'
        },
        grid: {
            row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
            },
        },
    }

    return (
        <Grid item container xs={12} justifyContent="space-between" pb={4}>
            <Grid item container alignItems="left" xs={11}>
                <Grid xs={6}>
                    <Box sx={{ display: 'flex', flexGrow: 1 }}>
                        <Typography variant="h4" mr={2}>
                            {title}
                        </Typography>
                        <Typography>
                            {downtime} seconds
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Grid item xs={1} textAlign="right">
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                <Typography sx={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                    {description}
                </Typography>
            </Grid>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Grid mt={6} ml={4}>
                    <ReactApexChart options={options} series={series} type="line" height={350} />
                </Grid>           
            </Collapse>
        </Grid>
    );
}

const Alerts = () => {
    const navigate = useNavigate();

    return (
        MOCKED_ALERTS.map((alert, index) => (
            <Card style={{ marginBottom: "2em" }}>
                <CardContent sx={{ position: "relative" }}>  
                    <Grid container>  
                        <CollapsibleRow key={index} {...alert} />
                    </Grid>
                </CardContent>
            </Card>
        ))
    );
}

export default Alerts;
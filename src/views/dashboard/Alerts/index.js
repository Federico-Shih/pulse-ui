import React, { useState } from 'react'
import { useNavigate } from "react-router";
import { Card, CardContent, IconButton, Grid, Collapse, Typography, Box } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import ReactApexChart from 'react-apexcharts';

const MOCKED_ALERTS = [
    {
        title: "Sensor1",
        description: "Description of sensor1",
        downtime: 1000,
        series: [{
            name: 'Consumption',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        }]
    },
    {
        title: "Sensor2",
        description: "Description of sensor2", 
        downtime: 300,
        series: [{
            name: 'Consumption',
            data: [95, 39, 14, 27, 57, 67, 23, 63, 73],
        }]

    },
    {
        title: "Sensor3",
        description: "Description of sensor3",
        downtime: 200,
        series: [{
            name: 'Consumption',
            data: [81, 63, 51, 72, 10, 47, 80, 16, 91], 
        }]
    },
]


const CollapsibleRow = ({ title, description, downtime, series }) => {
    const [open, setOpen] = useState(false);

    const options = {
        chart: {
            height: 350,
            width: 1700,
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
            text: `Sensor Consumption`,
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
                <Grid mt={6} ml={4} style={{ width: "600px" }}>
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
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography, Divider } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import chartData from './chart-data/bajaj-area-chart';

const MOCK_ALERTS = [
    {
        title: 'Sensor1',
        downtime: '10'  ,
    },
    {
        title: 'Sensor2',
        downtime: '21'  ,
    },
    {
        title: 'Sensor3',
        downtime: '43'  ,
    },
    {
        title: 'Sensor4',
        downtime: '6'  ,
    },
    {
        title: 'Sensor5',
        downtime: '33'  ,
    },
]

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const AlertCard = () => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const { navType } = customization;

    const orangeDark = theme.palette.secondary[800];

    useEffect(() => {
        const newSupportChart = {
            ...chartData.options,
            colors: [orangeDark],
            tooltip: {
                theme: 'light'
            }
        };
        ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
    }, [navType, orangeDark]);

    return (
        <Card>
            <Grid container sx={{ p: 2, color: '#fff' }}>
                <Grid item xs={12}>
                    <Grid container alignItems="center">
                        <Grid item>
                            <Typography variant="h4">
                                Alerts
                            </Typography>
                            <Grid item container spacing={2} mt={1}>
                                {MOCK_ALERTS.map((alert) => (
                                    <>
                                        <Divider sx={{ my: 1 }} />
                                        <Grid item container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="h6">
                                                    {alert.title}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="h6">
                                                    {alert.downtime}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

export default AlertCard;
